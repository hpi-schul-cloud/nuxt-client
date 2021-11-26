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
import { BusinessError, Pagination, Status } from "./types/commons";
import { CreateNewsPayload, News, PatchNewsPayload } from "./types/news";

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
			this.setBusinessError(error as BusinessError);
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
			this.setBusinessError(error as BusinessError);
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
			this.setBusinessError(error as BusinessError);
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
			this.setBusinessError(error as BusinessError);
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
			this.setBusinessError(error as BusinessError);
		}
	}
}

export default getModule(NewsModule);
