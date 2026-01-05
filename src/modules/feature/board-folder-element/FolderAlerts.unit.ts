import { FolderAlert } from "./FolderAlert.enum";
import FolderAlerts from "./FolderAlerts.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { WarningAlert } from "@ui-alert";

describe("FolderAlerts", () => {
	const setup = (alerts: FolderAlert[]) => {
		const wrapper = mount(FolderAlerts, {
			props: { alerts: alerts },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return { wrapper, alerts };
	};

	describe("when alerts contain FolderAlert.FILE_STORAGE_ERROR", () => {
		it("should render FolderAlert.FILE_STORAGE_ERROR", () => {
			const { wrapper } = setup([FolderAlert.FILE_STORAGE_ERROR]);

			const warningAlert = wrapper.findComponent(WarningAlert);

			expect(warningAlert.text()).toBe("components.cardElement.folderElement.storage.error");
		});
	});
});
