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

export type FormNews = {
	title: string;
	content: string;
	displayAt?: string;
};
