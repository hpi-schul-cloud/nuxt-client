import type { DashboardGridElementResponse, DashboardGridSubElementResponse } from "@api-server";

/**
 * UI-extended version of DashboardGridSubElementResponse.
 */
export type ItemType = DashboardGridSubElementResponse & {
	to?: string;
};

/**
 * UI-extended version of DashboardGridElementResponse.
 */
export type GroupDataType = Omit<DashboardGridElementResponse, "groupElements"> & {
	groupElements: ItemType[];
	to?: string;
};
