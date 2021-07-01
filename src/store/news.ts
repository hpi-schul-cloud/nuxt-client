import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";

type News = {
	__v: number;
	_id: string;
	content: string;
	createdAt: string;
	creatorId: string;
	displayAt: string;
	schoolId: string;
	source: string;
	title: string;
	updaterId: string | null;
};

type CreateNewsPayload = {
	title: string;
	content: string;
	displayAt: string | undefined;
	schoolId: string;
	target: any;
	targetModel: any;
};

type PatchNewsPayload = [
	string,
	{
		title: string;
		content: string;
		displayAt: string | undefined;
	}
];

type Pagination = {
	limit: number;
	skip: number;
	total: number;
};

type BusinessError = {
	statusCode: string;
	message: string;
};

@Module({ name: "news", namespaced: true, dynamic: true, store: rootStore })
class NewsModule extends VuexModule {
	news: News[] = [];
	createdNews: News = {
		__v: 0,
		_id: "",
		content: "",
		createdAt: "",
		creatorId: "",
		displayAt: "",
		schoolId: "",
		source: "",
		title: "",
		updaterId: null,
	};
	current: News = {
		__v: 0,
		_id: "",
		content: "",
		createdAt: "",
		creatorId: "",
		displayAt: "",
		schoolId: "",
		source: "",
		title: "",
		updaterId: null,
	};
	pagination: Pagination = {
		limit: 0,
		skip: 0,
		total: 0,
	};
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};
	status: string = "";

	get getNews(): News[] {
		return this.news;
	}

	get getCreatedNews(): News {
		return this.createdNews;
	}

	get getStatus(): string {
		return this.status;
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
	setCurrent(current: News): void {
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
	setStatus(status: string): void {
		this.status = status;
	}

	@Action
	async findNews(): Promise<void> {
		try {
			this.setStatus("pending");
			const { data, limit, skip, total } = await $axios.$get("/news");
			this.setNews(data);
			this.setPagination({ limit, skip, total });
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async createNews(payload: CreateNewsPayload): Promise<void> {
		try {
			this.setStatus("pending");
			const res = await $axios.$post("/news", payload);
			this.setCreatedNews(res);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async patchNews(payload: PatchNewsPayload): Promise<void> {
		try {
			this.setStatus("pending");
			const res = await $axios.$patch("/news", payload);
			this.setCurrent(res);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async removeNews(id: string) {
		try {
			this.setStatus("pending");
			const res = await $axios.$delete(`/news/${id}`);
			this.setCurrent(res);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}
}

export default getModule(NewsModule);
