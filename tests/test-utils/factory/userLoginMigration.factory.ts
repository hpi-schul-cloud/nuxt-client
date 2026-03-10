import { UserLoginMigration } from "@/store/user-login-migration";
import { Factory } from "fishery";

export const userLoginMigrationFactory = Factory.define<UserLoginMigration>(() => ({
	sourceSystemId: `sourceSystemId`,
	targetSystemId: `targetSystemId`,
	startedAt: new Date(2000, 1, 1, 0, 0),
	closedAt: undefined,
	finishedAt: undefined,
	mandatorySince: undefined,
}));
