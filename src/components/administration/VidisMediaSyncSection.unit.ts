import { axiosErrorFactory, expectNotification } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useSchoolLicenseApi } from "@data-license";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { mount } from "@vue/test-utils";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import VidisMediaSyncSection from "./VidisMediaSyncSection.vue";
import { beforeEach, expect } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

vi.mock("@data-license");

describe("VidisMediaSyncSection", () => {
	let useSchoolLicenseApiMock: DeepMocked<
		ReturnType<typeof useSchoolLicenseApi>
	>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		useSchoolLicenseApiMock =
			createMock<ReturnType<typeof useSchoolLicenseApi>>();
		vi.mocked(useSchoolLicenseApi).mockReturnValue(useSchoolLicenseApiMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const getWrapper = () => {
		const wrapper = mount(VidisMediaSyncSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

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

				expectNotification("success");
			});
		});

		describe("when the request fails with a timeout", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				useSchoolLicenseApiMock.updateSchoolLicenses.mockRejectedValueOnce(
					axiosErrorFactory
						.withStatusCode(HttpStatusCode.RequestTimeout)
						.build()
				);

				return {
					wrapper,
				};
			};

			it("should show a failure notification", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="sync-vidis-media-button"]');
				await button.trigger("click");

				expectNotification("info");
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

				expectNotification("error");
			});
		});
	});
});
