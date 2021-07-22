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
	displayAt: string | undefined | null;
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

type BusinessError = {
	statusCode: string;
	message: string;
};

type Status = "pending" | "completed" | "error" | "";

const newsUri = "/v3/news";

@Module({ name: "news", namespaced: true, dynamic: true, store: rootStore })
export class NewsModule extends VuexModule {
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
	status: Status = "";

	get getNews(): News[] {
		return this.news;
	}

	get getCreatedNews(): News {
		return this.createdNews;
	}
	get getCurrentNews(): News {
		return this.current;
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
	setStatus(status: Status): void {
		this.status = status;
	}

	@Action
	async findNews(): Promise<void> {
		try {
			this.setStatus("pending");
			const { data, limit, skip, total } = await $axios.$get(newsUri);
			this.setNews(data);
			this.setPagination({ limit, skip, total });
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async fetchNews(newsID: string): Promise<void> {
		try {
			this.setStatus("pending");
			const news = await $axios.$get(`${newsUri}/${newsID}`);
			this.setCurrent(news);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}

	@Action
	async createNews(payload: CreateNewsPayload): Promise<void> {
		try {
			this.setStatus("pending");
			const res = await $axios.$post(newsUri, payload);
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
			const res = await $axios.$patch(`${newsUri}/${payload.id}`, payload);
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
			const res = await $axios.$delete(`${newsUri}/${id}`);
			this.setCurrent(res);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error);
		}
	}
}

export default getModule(NewsModule);
