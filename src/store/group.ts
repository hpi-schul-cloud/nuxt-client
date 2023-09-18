import {
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
	// TODO: remove test data
	private classes: ClassInfo[] = [
		{ name: "1a", externalSourceName: "Klasse", teachers: ["Manni", "Max"] },
		{
			name: "1b",
			externalSourceName: "Klasse",
			teachers: ["Max", "Max", "Thomas"],
		},
		{ name: "2a", externalSourceName: "Klasse", teachers: ["Thomas"] },
		{
			name: "2b",
			externalSourceName: "Klasse",
			teachers: ["Adolfo", "Thomas"],
		},
		{ name: "3a", externalSourceName: "Klasse", teachers: ["Carlie"] },
		{ name: "1a", externalSourceName: "Klasse", teachers: ["Manni"] },
		{ name: "1b", externalSourceName: "Klasse", teachers: ["Max"] },
		{ name: "2a", externalSourceName: "Klasse", teachers: ["Thomas"] },
		{ name: "2b", externalSourceName: "Klasse", teachers: ["Adolfo"] },
		{ name: "3a", externalSourceName: "Klasse", teachers: ["Carlie"] },
		{ name: "1a", externalSourceName: "Klasse", teachers: ["Manni"] },
		{ name: "1b", externalSourceName: "Klasse", teachers: ["Max"] },
		{ name: "2a", externalSourceName: "Klasse", teachers: ["Thomas"] },
		{ name: "2b", externalSourceName: "Klasse", teachers: ["Adolfo"] },
		{ name: "3a", externalSourceName: "Klasse", teachers: ["Carlie"] },
	];
	private loading = false;
	private error: object | null = null;

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
	setPagination(pagination: Pagination): void {
		this.error = pagination;
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

			const classesInfoList: AxiosResponse<ClassInfoSearchListResponse> =
				await this.groupApi.groupControllerFindClassesForSchool(
					this.pagination.skip,
					this.pagination.limit,
					this.getSortOrder,
					sortBy
				);

			this.setPagination({
				limit: classesInfoList.data.limit,
				skip: classesInfoList.data.skip,
				total: classesInfoList.data.total,
			});
			// TODO: mapping
			this.setClasses(classesInfoList.data.data as ClassInfo[]);
		} catch (error) {
			this.setError(error as Error);
		}
		this.setLoading(false);
	}
}
