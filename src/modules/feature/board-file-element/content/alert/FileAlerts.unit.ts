import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ErrorAlert, InfoAlert, WarningAlert } from "@ui-alert";
import { shallowMount } from "@vue/test-utils";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import FileAlerts from "./FileAlerts.vue";

describe("FileAlerts", () => {
	const setup = (alerts: FileAlert[]) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getCollaboraMaxFileSizeInBytes: 10,
		});

		const wrapper = shallowMount(FileAlerts, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n({
						messages: {
							en: {
								"common.file.exceedsCollaboraEditableFileSize": "{sizeInMb}",
							},
						},
					}),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
			},
			propsData: { alerts },
		});

		return { wrapper, alerts };
	};

	describe("when alerts contains FileAlert.EXCEEDS_COLLABORA_EDITABLE_FILE_SIZE", () => {
		it("should render FileAlert.EXCEEDS_COLLABORA_EDITABLE_FILE_SIZE", () => {
			const { wrapper } = setup([
				FileAlert.EXCEEDS_COLLABORA_EDITABLE_FILE_SIZE,
			]);

			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe("10 B");
		});
	});

	describe("when alerts contains FileAlert.VIDEO_FORMAT_ERROR", () => {
		it("should render FileAlert.VIDEO_FORMAT_ERROR", () => {
			const { wrapper } = setup([FileAlert.VIDEO_FORMAT_ERROR]);

			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe(
				"components.cardElement.fileElement.videoFormatError"
			);
		});
	});

	describe("when alerts contains FileAlert.AUDIO_FORMAT_ERROR", () => {
		it("should render FileAlert.AUDIO_FORMAT_ERROR", () => {
			const { wrapper } = setup([FileAlert.AUDIO_FORMAT_ERROR]);

			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe(
				"components.cardElement.fileElement.audioFormatError"
			);
		});
	});

	describe("when alerts contains FileAlert.AWAITING_SCAN_STATUS", () => {
		it("should render FileAlert.AWAITING_SCAN_STATUS", () => {
			const { wrapper } = setup([FileAlert.AWAITING_SCAN_STATUS]);

			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toContain("common.file.awaitingScan");
			expect(infoAlert.text()).toContain(
				"components.cardElement.fileElement.reloadStatus"
			);
		});
	});

	describe("when alerts contains FileAlert.SCAN_STATUS_WONT_CHECK", () => {
		it("should render FileAlert.SCAN_STATUS_WONT_CHECK", () => {
			const { wrapper } = setup([FileAlert.SCAN_STATUS_WONT_CHECK]);

			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe("common.file.scanWontCheck");
		});
	});

	describe("when alerts contains FileAlert.SCAN_STATUS_ERROR", () => {
		it("should render FileAlert.SCAN_STATUS_ERROR", () => {
			const { wrapper } = setup([FileAlert.SCAN_STATUS_ERROR]);

			const warningAlert = wrapper.findComponent(WarningAlert);

			expect(warningAlert.text()).toBe("common.file.scanError");
		});
	});

	describe("when alerts contains FileAlert.SCAN_STATUS_BLOCKED", () => {
		it("should render FileAlert.SCAN_STATUS_BLOCKED", () => {
			const { wrapper } = setup([FileAlert.SCAN_STATUS_BLOCKED]);

			const errorAlert = wrapper.findComponent(ErrorAlert);

			expect(errorAlert.text()).toBe("common.file.virusDetected");
		});
	});

	describe("when alerts contains SCAN_STATUS_BLOCKED and VIDEO_FORMAT_ERROR", () => {
		it("should render FileAlert.SCAN_STATUS_BLOCKED", () => {
			const { wrapper } = setup([
				FileAlert.SCAN_STATUS_BLOCKED,
				FileAlert.VIDEO_FORMAT_ERROR,
			]);

			const errorAlert = wrapper.findComponent(ErrorAlert);
			expect(errorAlert.text()).toContain("common.file.virusDetected");

			const infoAlert = wrapper.findComponent(InfoAlert);
			expect(infoAlert.text()).toBe(
				"components.cardElement.fileElement.videoFormatError"
			);
		});
	});
});
