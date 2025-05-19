import { MaintenanceStatus } from "@data-school";
import { Factory } from "fishery";

export const maintenanceStatusFactory = Factory.define<MaintenanceStatus>(
	() => {
		return {
			schoolUsesLdap: true,
			maintenance: { active: false, startDate: undefined },
			currentYear: {
				id: "123",
				name: "current school year",
				startDate: new Date(2000, 0, 1).toString(),
				endDate: new Date(2000, 11, 31).toString(),
			},
			nextYear: {
				id: "456",
				name: "next school year",
				startDate: new Date(2001, 0, 1).toString(),
				endDate: new Date(2001, 11, 31).toString(),
			},
		};
	}
);
