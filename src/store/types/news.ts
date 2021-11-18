export type UserInfo = {
	/**
	 * The id of the User entity
	 * @type {string}
	 */
	id: string;
	/**
	 * First name of the user
	 * @type {string}
	 */
	firstName?: string;
	/**
	 * Last name of the user
	 * @type {string}
	 */
	lastName?: string;
};

export type SchoolInfo = {
	/**
	 * The id of the School entity
	 * @type {string}
	 */
	id: string;
	/**
	 * Name of the school
	 * @type {string}
	 */
	name?: string;
};

export type News = {
	id: string;
	content: string;
	createdAt: string;
	creator: UserInfo;
	displayAt: string;
	school: SchoolInfo;
	// source: string;
	title: string;
	updater?: UserInfo;
};

export type CreateNewsPayload = {
	title: string;
	content: string;
	displayAt?: string | undefined;
	schoolId: string;
	targetId: any;
	targetModel: any;
};

export type PatchNewsPayload = CreateNewsPayload & { id: string };

export type Pagination = {
	limit: number;
	skip: number;
	total: number;
};
