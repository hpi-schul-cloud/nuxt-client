import AuthModule from "@/store/auth";
import { EditorMode } from "@/types/file/File";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import {
	authorizedCollaboraDocumentUrlResponseFactory,
	meResponseFactory,
	ObjectIdMock,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { flushPromises } from "@vue/test-utils";
import CollaboraPage from "./Collabora.page.vue";

describe("Collabora.page", () => {
	const setup = () => {
		const fileRecordId = ObjectIdMock();
		const editorMode = EditorMode.EDIT;
		const meUserResponse = meResponseFactory.build().user;
		const authorizedCollaboraDocumentUrlResponse =
			authorizedCollaboraDocumentUrlResponseFactory.build();

		const authModule = createModuleMocks(AuthModule, {
			getUser: meUserResponse,
		});

		const fileStorageApiMock =
			createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
		vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
			fileStorageApiMock
		);
		fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
		);

		const wrapper = mount(CollaboraPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			propsData: {
				fileRecordId,
				editorMode,
			},
		});

		return {
			wrapper,
			authorizedCollaboraDocumentUrlResponse,
			editorMode,
			fileStorageApiMock,
			fileRecordId,
			meUserResponse,
		};
	};

	it("should call getAuthorizedCollaboraDocumentUrl with correct parameters", () => {
		const { fileStorageApiMock, fileRecordId, editorMode, meUserResponse } =
			setup();

		expect(
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl
		).toHaveBeenCalledWith(
			fileRecordId,
			editorMode,
			`${meUserResponse.firstName} ${meUserResponse.lastName}`
		);
	});

	it("should render Collabora editor iframe", async () => {
		const { wrapper, authorizedCollaboraDocumentUrlResponse } = setup();

		await flushPromises();

		expect(wrapper.find("iframe").exists()).toBe(true);
		expect(wrapper.find("iframe").attributes("src")).toEqual(
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
		);
	});
});
