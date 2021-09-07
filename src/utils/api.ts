import { NuxtAxiosInstance } from "@nuxtjs/axios";

enum APINames {
	server,
}

class API {
	private axios?: NuxtAxiosInstance;
	public name: APINames;
	private err = {
		notInitilized:
			"It exist no axios instance, please pass it over constructor or setup().",
	};

	constructor(name: APINames) {
		this.name = name;
	}

	public setup(axios: NuxtAxiosInstance) {
		this.axios = axios;
	}

	/**
	 * TODO: set private, add get, post, delete
	 * pass execution and implement try catches
	 * add error and response formater to get needed informations
	 * use errorUtil to set errors in store this is NOT a part of API
	 * Add error types for application-, apiResponse-, timeout-, validation-, and unhandled-Errors
	 * use this
	 */
	public get(): NuxtAxiosInstance {
		console.log("axios", this.name, this.axios);
		if (this.axios === undefined) {
			throw new Error(this.err.notInitilized);
		}
		return this.axios;
	}
}

class APIHandler {
	private apis: API[];
	private err = {
		nameConflict:
			"An instance with this name already exist. It cannot be added.",
	};

	constructor() {
		this.apis = [];
	}

	private validateIfNameIsFree(name: APINames): void {
		if (this.apis.some((api) => api.name === name)) {
			throw new Error(this.err.nameConflict);
		}
	}

	private add(api: API): void {
		this.validateIfNameIsFree(api.name);
		this.apis.push(api);
	}

	public create(name: APINames): API {
		const api = new API(name);
		this.add(api);
		return api;
	}
}

const apiHandler = new APIHandler();

const serverAPI = apiHandler.create(APINames.server);

export { serverAPI };
