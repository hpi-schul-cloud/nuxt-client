export interface UserLoginMigration {
	sourceSystemId?: string;
	targetSystemId: string;
	mandatorySince?: Date;
	startedAt: Date;
	closedAt?: Date;
	finishedAt?: Date;
}
