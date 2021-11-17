import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import { NewsApiFactory, NewsApiInterface } from "../serverApi/v3/api";
import { BusinessError, Status } from "./types/commons";

type UserInfo = {
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

type SchoolInfo = {
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

type News = {
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

type CreateNewsPayload = {
	title: string;
	content: string;
	displayAt?: string | undefined;
	schoolId: string;
	targetId: any;
	targetModel: any;
};

type PatchNewsPayload = CreateNewsPayload & { id: string };

type Pagination = {
	limit: number;
	skip: number;
	total: number;
};

// const newsUri = "/v3/news";

@Module({
	name: "news",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class NewsModule extends VuexModule {
	news: News[] = [];
	createdNews: News = {
		id: "",
		content: "",
		createdAt: "",
		creator: { id: "" },
		displayAt: "",
		school: { id: "" },
		// source: "",
		title: "",
		updater: { id: "" },
	};
	current: News | null = null;
	pagination: Pagination = {
		limit: 0,
		skip: 0,
		total: 0,
	};
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};
	status: Status = "";
	_newsApi?: NewsApiInterface;

	get getNews(): News[] {
		return this.news;
	}

	get getCreatedNews(): News {
		return this.createdNews;
	}
	get getCurrentNews(): News | null {
		return this.current;
	}

	get getStatus(): string {
		return this.status;
	}

	get getBusinessError() {
		return this.businessError;
	}

	private get newsApi() {
		if (!this._newsApi) {
			this._newsApi = NewsApiFactory(
				undefined,
				"/v3", //`${EnvConfigModule.getApiUrl}/v3`,
				$axios
			);
		}
		return this._newsApi;
	}

	@Mutation
	setNews(news: News[]): void {
		this.news = news;
	}

	@Mutation
	setCreatedNews(createdNews: News): void {
		this.createdNews = createdNews;
	}

	@Mutation
	setCurrent(current: News | null): void {
		this.current = current;
	}

	@Mutation
	setPagination(pagination: Pagination): void {
		this.pagination = pagination;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
		};
	}

	@Mutation
	setStatus(status: Status): void {
		this.status = status;
	}

	@Action
	async findNews(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const response = await this.newsApi.newsControllerFindAll(
				{
					data: [],
					skip: this.pagination.skip,
					limit: this.pagination.limit,
					total: this.pagination.total,
				},
				undefined,
				undefined,
				false,
				this.pagination.skip,
				this.pagination.limit
			);
			this.setNews(response.data.data);
			this.setPagination(response.data);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async fetchNews(newsID: string): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const response = await this.newsApi.newsControllerFindOne(newsID);
			this.setCurrent(response.data);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async createNews(payload: CreateNewsPayload): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const res = await this.newsApi.newsControllerCreate(payload);
			this.setCreatedNews(res.data);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async patchNews(payload: PatchNewsPayload): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const res = await this.newsApi.newsControllerUpdate(payload.id, payload);
			this.setCurrent(res.data);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async removeNews(id: string): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const res = await this.newsApi.newsControllerDelete(id);
			this.setCurrent(null);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}
}

export default getModule(NewsModule);
