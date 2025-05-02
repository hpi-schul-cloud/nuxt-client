export interface MaintenanceStatus {
	currentYear: { name: string; startDate: Date; endDate: Date };
	nextYear: { yearId: string; startDate: Date; endDate: Date };
	schoolUsesLdap: boolean;
	maintenance: {
		active: boolean;
		startDate: Date | null;
	};
}
