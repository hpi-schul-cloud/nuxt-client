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

export type PatchNewsPayload = UpdateNewsParams & { id: string };

export type FormNews = {
	title: string;
	content: string;
	displayAt?: string;
};
