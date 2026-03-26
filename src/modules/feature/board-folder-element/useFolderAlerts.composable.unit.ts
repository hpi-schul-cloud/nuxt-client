import { FolderAlert } from "./FolderAlert.enum";
import { useFolderAlerts } from "./useFolderAlerts.composable";
import { mountComposable } from "@@/tests/test-utils";

describe("useFolderAlerts", () => {
	const setup = () => {
		const { alerts, addAlert } = mountComposable(() => useFolderAlerts());

		return {
			alerts,
			addAlert,
		};
	};

	it("should initially return empty alerts", () => {
		const { alerts } = setup();
		expect(alerts.value).toEqual([]);
	});

	it("should add an alert", () => {
		const { addAlert, alerts } = setup();
		addAlert(FolderAlert.FILE_STORAGE_ERROR);

		expect(alerts.value).toEqual([FolderAlert.FILE_STORAGE_ERROR]);
	});
});
