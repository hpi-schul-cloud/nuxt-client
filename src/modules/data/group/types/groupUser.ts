import { GroupUserRole } from "./groupUserRole";

export type GroupUser = {
	id: string;

	firstName: string;

	lastName: string;

	role: GroupUserRole;
};
