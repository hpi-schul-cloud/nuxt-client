import { GroupUserRole } from "@/components/data-group/types/GroupUserRole";

export type GroupUser = {
	id: string;
	firstName: string;
	lastName: string;
	role: GroupUserRole;
};
