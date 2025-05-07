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
				startDate: new Date("2000-01-01"),
				endDate: new Date("2000-31-12"),
			},
			nextYear: {
				id: "456",
				name: "next school year",
				startDate: new Date("2001-01-01"),
				endDate: new Date("2001-31-12"),
			},
		};
	}
);
