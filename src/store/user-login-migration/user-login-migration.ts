export interface UserLoginMigration {
	sourceSystemId?: string;
	targetSystemId: string;
	mandatorySince?: string;
	startedAt: string;
	closedAt?: string;
	finishedAt?: string;
}
