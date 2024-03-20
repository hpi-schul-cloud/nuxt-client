import { UpdateNewsParams } from "@/serverApi/v3";

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
	title: string;
	updater?: UserInfo;
	targetId: string;
	targetModel: string;
};

export type PatchNewsPayload = UpdateNewsParams & { id: string };
