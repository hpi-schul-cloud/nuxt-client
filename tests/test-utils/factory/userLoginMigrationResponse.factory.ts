import { Factory } from "fishery";
import { UserLoginMigrationResponse } from "@/serverApi/v3";

export const userLoginMigrationResponseFactory =
	Factory.define<UserLoginMigrationResponse>(() => ({
		id: "id",
		sourceSystemId: `sourceSystemId`,
		targetSystemId: `targetSystemId`,
		startedAt: new Date(2000, 1, 1, 0, 0).toString(),
		closedAt: undefined,
		finishedAt: undefined,
		mandatorySince: undefined,
	}));
