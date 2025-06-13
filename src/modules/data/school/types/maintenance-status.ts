export interface MaintenanceStatus {
	currentYear: {
		id: string;
		name: string;
		startDate: string;
		endDate: string;
		courseCreationInNextYear: boolean;
	};
	nextYear: {
		id: string;
		name: string;
		startDate: string;
		endDate: string;
		courseCreationInNextYear: boolean;
	};
	schoolUsesLdap: boolean;
	maintenance: {
		active: boolean;
		startDate?: string;
	};
}
