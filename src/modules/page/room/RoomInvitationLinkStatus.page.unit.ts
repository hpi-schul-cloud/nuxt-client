import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import {
	RoomInvitationLinkValidationError,
	UseLinkResult,
	useRoomInvitationLinkStore,
} from "@data-room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useRouter } from "vue-router";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import RoomInvitationLinkStatusPage from "./RoomInvitationLinkStatus.page.vue";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import NotifierModule from "@/store/notifier";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useBoardNotifier } from "@util-board";
import { setActivePinia } from "pinia";
import { flushPromises } from "@vue/test-utils";
import { beforeAll } from "vitest";

vi.mock("vue-router", () => {
	return {
		useRouter: vi.fn().mockReturnValue({
			push: vi.fn(),
		}),
	};
});

vi.mock("@util-board/BoardNotifier.composable");
const boardNotifier = vi.mocked(useBoardNotifier);

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});

describe("RoomInvitationLinkStatusPage", () => {
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = async (useLinkResult: UseLinkResult) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const invitationLink = roomInvitationLinkFactory.build();

		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);

		const pinia = createTestingPinia({
			initialState: {
				roomInvitationLinkStore: {
					roomInvitationLinks: [invitationLink],
					isLoading: false,
				},
			},
		});

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		roomInvitationLinkStore.useLink.mockResolvedValueOnce(useLinkResult);

		const wrapper = mount(RoomInvitationLinkStatusPage, {
			attachTo: document.body,
			global: {
				plugins: [pinia, createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},

			props: {
				invitationLinkId: invitationLink.id,
			},
		});

		await flushPromises();

		return {
			wrapper,
			roomInvitationLinkStore,
			invitationLink,
			router: useRouter(),
		};
	};

	it("should be found in the dom", async () => {
		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});

		expect(wrapper.exists()).toBe(true);
	});

	it("should render DefaultWireframe", async () => {
		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});
		const wireframe = wrapper.findComponent(DefaultWireframe);

		expect(wireframe.exists()).toBe(true);
	});

	it("should set correct breadcrumbs ", async () => {
		const roomInvitationLinkBreadcrumb = [
			{
				title: "pages.rooms.title",
				to: "/rooms",
			},
			{
				title: "pages.rooms.invitationLinkStatus.title",
				disabled: true,
			},
		];

		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});
		const wireframe = wrapper.findComponent(DefaultWireframe);

		expect(wireframe.props("breadcrumbs")).toEqual(
			roomInvitationLinkBreadcrumb
		);
	});

	it("should set the page title", async () => {
		const { wrapper } = await setup({
			roomId: "room-id",
			validationMessage: "",
			schoolName: "",
		});
		const pageTitle = wrapper.find("[data-testid=page-title]");
		expect(pageTitle.text()).toContain(
			"pages.rooms.invitationLinkStatus.title"
		);
	});

	describe("when link store returns a roomId", () => {
		it("should call the router to navigate to the room", async () => {
			const { router } = await setup({
				roomId: "room-id",
				validationMessage: "",
				schoolName: "",
			});

			expect(router.push).toHaveBeenCalledWith({
				path: "/rooms/room-id",
			});
		});
	});

	describe("when link store returns a message", () => {
		const testCases = [
			{
				message:
					RoomInvitationLinkValidationError.CantInviteStudentsFromOtherSchool,
				expectedMessage:
					"pages.rooms.invitationLinkStatus.cantInviteStudentsFromOtherSchool",
			},
			{
				message: RoomInvitationLinkValidationError.Expired,
				expectedMessage: "pages.rooms.invitationLinkStatus.expired",
			},
			{
				message: RoomInvitationLinkValidationError.OnlyForTeachers,
				expectedMessage: "pages.rooms.invitationLinkStatus.onlyForTeachers",
			},
			{
				message: RoomInvitationLinkValidationError.RestrictedToCreatorSchool,
				expectedMessage:
					"pages.rooms.invitationLinkStatus.restrictedToCreatorSchool",
			},
			{
				message: RoomInvitationLinkValidationError.InvalidLink,
				expectedMessage: "pages.rooms.invitationLinkStatus.invalidLink",
			},
		];

		testCases.forEach(({ message, expectedMessage }) => {
			it(`should show the correct message for ${message}`, async () => {
				const { wrapper } = await setup({
					roomId: "",
					validationMessage: message,
					schoolName: "Beispielschule",
				});

				const statusMessage = wrapper.find("[data-testid=status-message]");
				expect(statusMessage.text()).toContain(expectedMessage);
			});
		});

		it("should show bird image", async () => {
			const { wrapper } = await setup({
				roomId: "",
				validationMessage: RoomInvitationLinkValidationError.Expired,
				schoolName: "Beispielschule",
			});

			const statusImage = wrapper.find("[data-testid=img-crossed-hands]");
			expect(statusImage.exists()).toBe(true);
		});
	});

	describe("when the link store return neither roomId nor message", () => {
		it("should show the default message", async () => {
			const { wrapper } = await setup({
				roomId: "",
				validationMessage: "",
				schoolName: "",
			});

			const statusMessage = wrapper.find("[data-testid=status-message]");
			expect(statusMessage.text()).toContain("error.generic");
		});
	});
});
