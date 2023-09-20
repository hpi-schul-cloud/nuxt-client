import {
	ClassInfoResponse,
	ClassInfoSearchListResponse,
	GroupApiFactory,
	GroupApiInterface,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ClassInfo } from "./types/class-info";
import { Pagination } from "./types/commons";
import { SortOrder } from "./types/sort-order.enum";

@Module({
	name: "groupModule",
	namespaced: true,
	stateFactory: true,
})
export default class GroupModule extends VuexModule {
	private classes: ClassInfo[] = [];

	private loading = false;
	private error: object | null = null;

	private pagination: Pagination = {
		limit: 10,
		skip: 0,
		total: 30,
	};

	private sortBy = "name";
	private sortOrder: SortOrder = SortOrder.ASC;
	private page = 1;

	private get groupApi(): GroupApiInterface {
		return GroupApiFactory(undefined, "/v3", $axios);
	}

	get getClasses(): ClassInfo[] {
		return this.classes;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): object | null {
		return this.error;
	}

	get getPagination(): Pagination {
		return this.pagination;
	}

	get getSortBy(): string {
		return this.sortBy;
	}

	get getSortOrder(): SortOrder {
		return this.sortOrder;
	}

	get getPage(): number {
		return this.page;
	}

	@Mutation
	setClasses(classes: ClassInfo[]): void {
		this.classes = classes;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: object | null): void {
		this.error = error;
	}

	@Mutation
	resetError(): void {
		this.error = null;
	}

	@Mutation
	setPagination(pagination: Pagination): void {
		this.pagination = pagination;
	}

	@Mutation
	setSortBy(sortBy: string): void {
		this.sortBy = sortBy;
	}

	@Mutation
	setSortOrder(sortOrder: SortOrder): void {
		this.sortOrder = sortOrder;
	}

	@Mutation
	setPage(page: number): void {
		this.page = page;
	}

	@Action
	async loadClassesForSchool(): Promise<void> {
		this.setLoading(true);
		try {
			const sortBy =
				this.getSortBy === "name" || this.getSortBy === "externalSourceName"
					? this.getSortBy
					: undefined;

			const response: AxiosResponse<ClassInfoSearchListResponse> =
				await this.groupApi.groupControllerFindClassesForSchool(
					this.pagination.skip,
					this.pagination.limit,
					this.getSortOrder,
					sortBy
				);
			const mappedClasses: ClassInfo[] = response.data.data.map(
				(classInfoResponse: ClassInfoResponse): ClassInfo => ({
					name: classInfoResponse.name,
					externalSourceName: classInfoResponse.externalSourceName,
					teachers: classInfoResponse.teachers,
				})
			);

			this.setPagination({
				limit: response.data.limit,
				skip: response.data.skip,
				total: response.data.total,
			});
			this.setClasses(mappedClasses);
		} catch (error) {
			this.setError(error as Error);
		}
		this.setLoading(false);
	}
}
