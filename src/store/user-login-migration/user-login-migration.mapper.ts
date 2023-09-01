import { UserLoginMigrationResponse } from "@/serverApi/v3";
import { UserLoginMigration } from "./user-login-migration";

export class UserLoginMigrationMapper {
	static mapToUserLoginMigration(
		userLoginMigration: UserLoginMigrationResponse
	): UserLoginMigration {
		return {
			sourceSystemId: userLoginMigration.sourceSystemId,
			targetSystemId: userLoginMigration.targetSystemId,
			startedAt: userLoginMigration.startedAt,
			closedAt: userLoginMigration.closedAt,
			finishedAt: userLoginMigration.finishedAt,
			mandatorySince: userLoginMigration.mandatorySince,
		};
	}
}
