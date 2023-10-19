import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { ErrorAlert, InfoAlert, WarningAlert } from "@ui-alert";
import { shallowMount } from "@vue/test-utils";
import { FileAlert } from "../../shared/types/FileAlert.enum";
import FileAlerts from "./FileAlerts.vue";

describe("FileAlerts", () => {
	const setup = (alerts: FileAlert[]) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileAlerts, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
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
