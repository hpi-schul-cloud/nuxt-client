import {
	ClassInfoSearchListResponse,
	GroupApiFactory,
	GroupApiInterface,
	SchoolYearQueryType,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { AxiosResponse } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { GroupMapper } from "./group/group.mapper";
import { ClassInfo } from "./types/class-info";
import { BusinessError, Pagination } from "./types/commons";
import { SortOrder } from "./types/sort-order.enum";

@Module({
	name: "groupModule",
	namespaced: true,
	stateFactory: true,
})
export default class GroupModule extends VuexModule {
	private classes: ClassInfo[] = [];

	private loading = false;
	private businessError: BusinessError | null = null;

	private pagination: Pagination = {
		limit: 10,
		skip: 0,
		total: 0,
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

	get getBusinessError(): BusinessError | null {
		return this.businessError;
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
	setBusinessError(businessError: BusinessError | null): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = null;
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
	async deleteClass(deleteQuery: {
		classId: string;
		query?: SchoolYearQueryType;
	}): Promise<void> {
		this.setLoading(true);

		try {
			await $axios.delete(`/v1/classes/${deleteQuery.classId}`);

			await this.loadClassesForSchool(deleteQuery.query);
		} catch (error) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: `${apiError.type}: ${apiError.message}`,
			});
		}

		this.setLoading(false);
	}

	@Action
	async loadClassesForSchool(
		schoolYearQuery?: SchoolYearQueryType
	): Promise<void> {
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
					sortBy,
					schoolYearQuery
				);
			const mappedClasses: ClassInfo[] = GroupMapper.mapToClassInfo(
				response.data.data
			);

			this.setPagination({
				limit: response.data.limit,
				skip: response.data.skip,
				total: response.data.total,
			});
			this.setClasses(mappedClasses);
		} catch (error) {
			const apiError = mapAxiosErrorToResponseError(error);

			console.log(apiError);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: `${apiError.type}: ${apiError.message}`,
			});
		}
		this.setLoading(false);
	}
}
