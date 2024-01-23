import { UserLoginMigrationResponse } from "@/serverApi/v3";
import { UserLoginMigration } from "./user-login-migration";

export class UserLoginMigrationMapper {
	static mapToDate(apiDateString: string | undefined): Date | undefined {
		if (!apiDateString) {
			return undefined;
		}
		const date = new Date(apiDateString);

		return date;
	}

	static mapToUserLoginMigration(
		userLoginMigration: UserLoginMigrationResponse
	): UserLoginMigration {
		return {
			sourceSystemId: userLoginMigration.sourceSystemId,
			targetSystemId: userLoginMigration.targetSystemId,
			startedAt: new Date(userLoginMigration.startedAt),
			closedAt: this.mapToDate(userLoginMigration.closedAt),
			finishedAt: this.mapToDate(userLoginMigration.finishedAt),
			mandatorySince: this.mapToDate(userLoginMigration.mandatorySince),
		};
	}
}
