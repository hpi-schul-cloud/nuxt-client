export type MigrationLinks = {
	proceedLink: string;
	cancelLink: string;
};

export enum MigrationPageOrigin {
	START_FROM_TARGET_SYSTEM = "start_from_target_system",
	START_FROM_SOURCE_SYSTEM = "start_from_source_system",
	START_FROM_SOURCE_SYSTEM_MANDATORY = "start_from_source_system_mandatory",
}

export type MigrationLinkRequest = {
	pageType: MigrationPageOrigin;
	sourceSystem: string;
	targetSystem: string;
};
