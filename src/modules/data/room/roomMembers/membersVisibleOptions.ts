import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
type Options = {
	show: boolean;
	disabled: boolean;
};

type ViewOptions = {
	"selection-column": Options;
	"actions-column": Options;
	"checkbox-in-row"?: Options;
	"actions-in-row"?: Options;
};

type RoomRoles = Pick<
	Record<RoleName, ViewOptions>,
	| RoleName.Roomowner
	| RoleName.Roomadmin
	| RoleName.Roomeditor
	| RoleName.Roomviewer
>;

interface User extends RoomMemberResponse {
	roleName: Extract<
		RoleName,
		| RoleName.Roomowner
		| RoleName.Roomadmin
		| RoleName.Roomeditor
		| RoleName.Roomviewer
	>;
	id: string;
}

export const useRoomMemberVisibilityOptions = (currentUserId: string) => {
	const hasVisibleOption = (
		user: User,
		source: keyof ViewOptions,
		action:
			| keyof ViewOptions["selection-column"]
			| keyof ViewOptions["actions-column"]
			| keyof ViewOptions["checkbox-in-row"]
			| keyof ViewOptions["actions-in-row"]
	) => {
		const ROLES: RoomRoles = {
			[RoleName.Roomowner]: {
				"selection-column": {
					show: true,
					disabled: false,
				},
				"actions-column": {
					show: true,
					disabled: false,
				},
				"checkbox-in-row": {
					show: true,
					disabled: user.id === currentUserId,
				},
				"actions-in-row": {
					show: true,
					disabled: false,
				},
			},
			[RoleName.Roomadmin]: {
				"selection-column": {
					show: true,
					disabled: false,
				},
				"actions-column": {
					show: true,
					disabled: false,
				},
				"checkbox-in-row": {
					show: true,
					disabled: user.id === currentUserId,
				},
				"actions-in-row": {
					show: true,
					disabled: false,
				},
			},
			[RoleName.Roomeditor]: {
				"selection-column": {
					show: true,
					disabled: false,
				},
				"actions-column": {
					show: false,
					disabled: false,
				},
			},
			[RoleName.Roomviewer]: {
				"selection-column": {
					show: false,
					disabled: false,
				},
				"actions-column": {
					show: false,
					disabled: false,
				},
			},
		};

		const sourceOption = ROLES[user.roleName]?.[source];
		if (!action || typeof sourceOption === "boolean") {
			return sourceOption;
		}
		return sourceOption?.[action];
	};

	return {
		hasVisibleOption,
	};
};
