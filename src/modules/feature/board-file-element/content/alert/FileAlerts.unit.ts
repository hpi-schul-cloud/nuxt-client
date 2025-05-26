import { FileAlert } from "@/types/file/FileAlert.enum";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ErrorAlert, InfoAlert, WarningAlert } from "@ui-alert";
import { shallowMount } from "@vue/test-utils";
import FileAlerts from "./FileAlerts.vue";

describe("FileAlerts", () => {
	const setup = (alerts: FileAlert[]) => {
		const wrapper = shallowMount(FileAlerts, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			propsData: { alerts },
		});
		return { wrapper, alerts };
	};

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

			expect(infoAlert.text()).toContain(
				"components.cardElement.fileElement.awaitingScan"
			);
			expect(infoAlert.text()).toContain(
				"components.cardElement.fileElement.reloadStatus"
			);
		});
	});

	describe("when alerts contains FileAlert.SCAN_STATUS_WONT_CHECK", () => {
		it("should render FileAlert.SCAN_STATUS_WONT_CHECK", () => {
			const { wrapper } = setup([FileAlert.SCAN_STATUS_WONT_CHECK]);

			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe(
				"components.cardElement.fileElement.scanWontCheck"
			);
		});
	});

	describe("when alerts contains FileAlert.SCAN_STATUS_ERROR", () => {
		it("should render FileAlert.SCAN_STATUS_ERROR", () => {
			const { wrapper } = setup([FileAlert.SCAN_STATUS_ERROR]);

			const warningAlert = wrapper.findComponent(WarningAlert);

			expect(warningAlert.text()).toBe(
				"components.cardElement.fileElement.scanError"
			);
		});
	});

	describe("when alerts contains FileAlert.SCAN_STATUS_BLOCKED", () => {
		it("should render FileAlert.SCAN_STATUS_BLOCKED", () => {
			const { wrapper } = setup([FileAlert.SCAN_STATUS_BLOCKED]);

			const errorAlert = wrapper.findComponent(ErrorAlert);

			expect(errorAlert.text()).toBe(
				"components.cardElement.fileElement.virusDetected"
			);
		});
	});

	describe("when alerts contains SCAN_STATUS_BLOCKED and VIDEO_FORMAT_ERROR", () => {
		it("should render FileAlert.SCAN_STATUS_BLOCKED", () => {
			const { wrapper } = setup([
				FileAlert.SCAN_STATUS_BLOCKED,
				FileAlert.VIDEO_FORMAT_ERROR,
			]);

			const errorAlert = wrapper.findComponent(ErrorAlert);
			expect(errorAlert.text()).toContain(
				"components.cardElement.fileElement.virusDetected"
			);

			const infoAlert = wrapper.findComponent(InfoAlert);
			expect(infoAlert.text()).toBe(
				"components.cardElement.fileElement.videoFormatError"
			);
		});
	});
});
