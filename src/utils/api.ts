import { NuxtAxiosInstance } from "@nuxtjs/axios";

/*
let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
	$axios = axiosInstance;
}

export { $axios }; */

enum APINames {
	server,
}

class API {
	private axios?: NuxtAxiosInstance;
	public name: APINames;
	// public store;
	// public errorHandler;
	private err = {
		notInitilized:
			"It exist no axios instance, please pass it over constructor or setup().",
	};

	constructor(name: APINames, axios?: NuxtAxiosInstance) {
		this.name = name;
		if (axios !== undefined) {
			this.setup(axios);
		}
	}

	public setup(axios: NuxtAxiosInstance) {
		this.axios = axios;
		// this.axios.onError(this.onError);
		// this.aios.onRequest(this.onRequest);
	}

	public get(): NuxtAxiosInstance {
		if (this.axios === undefined) {
			throw new Error(this.err.notInitilized);
		}
		return this.axios;
	}

	// public onError(err) {}
	// public onRequest(config) {}
}

class APIHandler {
	private apis: API[];
	private err = {
		nameConflict: "A instance with this name already exist. It can not added.",
		noMatch: "A instance with this name do not exist",
	};

	constructor() {
		this.apis = [];
	}

	private getAPI(name: APINames): API {
		const api = this.apis.find((api) => api.name === name);
		if (api === undefined) {
			throw new Error(this.err.noMatch);
		}
		return api;
	}

	public getAxios(name: APINames): NuxtAxiosInstance {
		const api = this.getAPI(name);
		const axios = api.get();
		return axios;
	}

	private validateIfNameExist(name: APINames): void {
		if (this.apis.some((api) => api.name === name)) {
			throw new Error(this.err.nameConflict);
		}
	}

	private add(api: API): void {
		this.validateIfNameExist(api.name);
		this.apis.push(api);
	}

	public create(name: APINames, axios?: NuxtAxiosInstance): API {
		const api = new API(name, axios);
		this.add(api);
		return api;
	}
}

const apiHandler = new APIHandler();

const serverAPI = apiHandler.create(APINames.server);

export { serverAPI };
