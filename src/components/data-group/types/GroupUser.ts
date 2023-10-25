import { GroupUserRole } from "./GroupUserRole";

export type GroupUser = {
	id: string;

	firstName: string;

	lastName: string;

	role: GroupUserRole;
};
