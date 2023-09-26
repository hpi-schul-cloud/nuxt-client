export interface UserLoginMigrationFlags {
	startedAt: boolean;
	mandatorySince: boolean;
	closedAt?: Date;
	finishedAt?: Date;
}
