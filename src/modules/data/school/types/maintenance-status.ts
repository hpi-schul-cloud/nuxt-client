export interface MaintenanceStatus {
	currentYear: { id: string; name: string; startDate: string; endDate: string };
	nextYear: { id: string; name: string; startDate: string; endDate: string };
	schoolUsesLdap: boolean;
	maintenance: {
		active: boolean;
		startDate?: string;
	};
}
