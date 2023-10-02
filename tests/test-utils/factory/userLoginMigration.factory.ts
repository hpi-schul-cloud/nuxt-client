import { Factory } from "fishery";
import { UserLoginMigration } from "@/store/user-login-migration";

export const userLoginMigrationFactory = Factory.define<UserLoginMigration>(
	() => ({
		sourceSystemId: `sourceSystemId`,
		targetSystemId: `targetSystemId`,
		startedAt: `startedAt`,
		closedAt: undefined,
		finishedAt: undefined,
		mandatorySince: undefined,
	})
);
