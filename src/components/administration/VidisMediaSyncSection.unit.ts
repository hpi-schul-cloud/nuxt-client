import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useSchoolLicenseApi } from "@data-license";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import VidisMediaSyncSection from "./VidisMediaSyncSection.vue";

jest.mock("@data-license");

describe("VidisMediaSyncSection", () => {
	let useSchoolLicenseApiMock: DeepMocked<
		ReturnType<typeof useSchoolLicenseApi>
	>;

	const notifierModule: jest.Mocked<NotifierModule> =
		createModuleMocks(NotifierModule);

	const getWrapper = () => {
		const wrapper = mount(VidisMediaSyncSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSchoolLicenseApiMock =
			createMock<ReturnType<typeof useSchoolLicenseApi>>();

		jest.mocked(useSchoolLicenseApi).mockReturnValue(useSchoolLicenseApiMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("Sync button", () => {
		describe("when the request is successful", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should call the api", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="sync-vidis-media-button"]');
				await button.trigger("click");

				expect(useSchoolLicenseApiMock.updateSchoolLicenses).toHaveBeenCalled();
			});

			it("should show a success notification", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="sync-vidis-media-button"]');
				await button.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "success",
					text: "components.administration.externalToolsSection.vidis.notification.success",
				});
			});
		});

		describe("when the request fails", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				useSchoolLicenseApiMock.updateSchoolLicenses.mockRejectedValueOnce(
					new Error()
				);

				return {
					wrapper,
				};
			};

			it("should show a failure notification", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="sync-vidis-media-button"]');
				await button.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "error",
					text: "common.notification.error",
				});
			});
		});
	});
});
