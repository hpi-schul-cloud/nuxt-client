import { CreateNewsParams, NewsApiFactory } from "../serverApi/v3/api";
import { $axios } from "../utils/api";
import { BusinessError, Pagination, Status } from "./types/commons";
import { News, PatchNewsPayload } from "./types/news";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "newsModule",
	namespaced: true,
	stateFactory: true,
})
export default class NewsModule extends VuexModule {
	news: News[] = [];
	createdNews: News = {
		id: "",
		content: "",
		createdAt: "",
		creator: { id: "" },
		displayAt: "",
		school: { id: "" },
		title: "",
		updater: { id: "" },
		targetId: "",
		targetModel: "",
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
		return NewsApiFactory(undefined, "/v3", $axios);
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
	async createNews(payload: CreateNewsParams): Promise<void> {
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
			await this.newsApi.newsControllerDelete(id);
			this.setCurrent(null);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
		}
	}
}
