export interface MaintenanceStatus {
	currentYear: { id: string; name: string; startDate: Date; endDate: Date };
	nextYear: { id: string; name: string; startDate: Date; endDate: Date };
	schoolUsesLdap: boolean;
	maintenance: {
		active: boolean;
		startDate?: Date;
	};
}
