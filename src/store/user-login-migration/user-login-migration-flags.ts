export interface UserLoginMigrationFlags {
	startedAt: boolean;
	mandatorySince: boolean;
	closedAt?: string;
	finishedAt?: string;
}
