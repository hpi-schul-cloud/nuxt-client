import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import { isCollectionHelper } from "@utils/helpers";
import EnvConfigModule from "@/store/env-config";
import hash from "object-hash";
import {
	Query,
	Resource,
	Resources,
	Elements,
	Lessons,
	AddToLessonQuery,
} from "./types/content";
import { Status } from "./types/commons";

const initialState = () => ({
	resources: {
		total: 0,
		limit: 0,
		skip: 0,
		data: [],
		pagination: undefined,
	},
	elements: {
		total: 0,
		limit: 0,
		skip: 0,
		data: [],
		pagination: undefined,
	},
	selected: 0,
	lessons: {
		total: 0,
		limit: 0,
		skip: 0,
		data: [],
	},
	loadingCounter: 0,
	loading: false,
	lastQuery: "",
	collectionsFeatureFlag: null,
	currentResource: {
		access: [],
		aspects: [],
		collection: null,
		commentCount: null,
		content: {},
		createdAt: null,
		createdBy: {},
		downloadUrl: "",
		iconURL: "",
		isDirectory: false,
		license: {},
		mediatype: "",
		metadataset: "",
		mimetype: "",
		modifiedAt: null,
		modifiedBy: {},
		name: "",
		owner: {},
		parent: {},
		preview: {},
		properties: {},
		rating: null,
		ref: {},
		remote: null,
		repositoryType: "",
		size: "",
		title: "",
		type: "",
	},
	status: null,
	notificationModal: null,
});

@Module({
	name: "content",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Content extends VuexModule {
	resources: Resources = initialState().resources;
	elements: Elements = initialState().elements;
	selected: number = initialState().selected;
	lessons: Lessons = initialState().lessons;
	loadingCounter: number = initialState().loadingCounter;
	loading: boolean = initialState().loading;
	lastQuery: string = initialState().lastQuery;
	collectionsFeatureFlag: boolean | null =
		initialState().collectionsFeatureFlag;
	currentResource: Resource = initialState().currentResource;
	status: Status | null = initialState().status;
	notificationModal: string | null = initialState().notificationModal;

	@Mutation
	setSelectedElement(payload: { id: string; value: boolean }): void {
		for (let i = 0; i < this.elements.data.length; i++) {
			if (this.elements.data[i].ref.id === payload.id) {
				this.elements.data[i]["stateSelected"] = payload.value;
				break;
			}
		}
		this.selected = this.elements.data.filter(
			(el: any) => el.stateSelected === true
		).length;
	}

	@Mutation
	setResources(payload: { hash: string; result: Resources }): void {
		if (this.lastQuery === payload.hash) this.resources = payload.result;
	}

	@Mutation
	addResourcesMutation(payload: Resources): void {
		payload.data.forEach((resource: Resource) =>
			this.resources.data.push(resource)
		);
		this.resources = {
			...this.resources,
			pagination: payload.pagination,
		};
	}

	@Mutation
	setElements(payload: { hash: string; result: Elements }): void {
		if (this.lastQuery === payload.hash) this.elements = payload.result;
	}

	@Mutation
	addElementsMutation(payload: Elements): void {
		payload.data.forEach((element: Resource) =>
			this.elements.data.push(element)
		);
		this.elements = {
			...this.elements,
			pagination: payload.pagination,
		};
	}

	@Mutation
	clearResources(): void {
		this.resources = initialState().resources;
		this.selected = initialState().selected;
	}

	@Mutation
	clearElements(): void {
		this.elements = initialState().elements;
		this.selected = initialState().selected;
	}

	@Mutation
	clearLessons(): void {
		this.lessons = initialState().lessons;
	}

	@Mutation
	setLastQuery(payload: string): void {
		this.lastQuery = payload;
	}

	@Mutation
	incLoading(): void {
		if (this.loadingCounter === 0) {
			this.loading = true;
		}
		this.loadingCounter += 1;
	}

	@Mutation
	decLoading(): void {
		this.loadingCounter -= 1;
		if (this.loadingCounter === 0) {
			this.loading = false;
		}
	}

	@Mutation
	setLessons(payload: Lessons): void {
		this.lessons = payload;
	}

	@Mutation
	initMutation(payload?: boolean): void {
		this.collectionsFeatureFlag = payload || null;
	}

	@Mutation
	setCurrentResource(payload: Resource): void {
		this.currentResource = payload;
	}

	@Mutation
	setStatus(payload: Status | null): void {
		this.status = payload;
	}

	@Mutation
	setNotificationModal(payload: string): void {
		this.notificationModal = payload;
	}

	get getLessonsGetter() {
		return this.lessons;
	}

	get getElementsGetter() {
		return this.elements;
	}

	get getSelected() {
		return this.selected;
	}

	get getLoading() {
		return this.loading;
	}

	get getResourcesGetter() {
		return this.resources;
	}

	get getCollectionsFeatureFlag() {
		return this.collectionsFeatureFlag;
	}

	get getCurrentResource() {
		return this.currentResource;
	}

	get getStatus() {
		return this.status;
	}

	get isCollection() {
		return (
			this.collectionsFeatureFlag === true &&
			isCollectionHelper(this.currentResource.properties)
		);
	}

	get getNotificationModal() {
		return this.notificationModal;
	}

	@Action
	selectElement(refId: string): void {
		this.setSelectedElement({ id: refId, value: true });
	}

	@Action
	unselectElement(refId: string): void {
		this.setSelectedElement({ id: refId, value: false });
	}

	@Action
	async getResources(payload: Query): Promise<void> {
		this.incLoading();
		const query = {
			$limit: 12,
			$skip: 0,
			searchQuery: payload.searchQuery,
		};
		const queryHash = hash(query);
		this.setLastQuery(queryHash);
		try {
			const res = await $axios.$get("/v1/edu-sharing", {
				params: query,
			});

			this.setResources({ hash: queryHash, result: res });
		} catch (e) {
			console.error(e);
		} finally {
			this.decLoading();
		}
	}

	@Action
	async addResources(payload: Query) {
		this.incLoading();
		try {
			const res = await $axios.$get("/v1/edu-sharing", {
				params: payload,
			});
			this.addResourcesMutation(res);
		} catch (e) {
			console.error("Error: ", e);
		} finally {
			this.decLoading();
		}
	}

	@Action
	async getElements(payload = {}) {
		this.incLoading();
		const query = {
			$limit: 12,
			$skip: 0,
			...payload,
		};
		const queryHash = hash(query);
		this.setLastQuery(queryHash);
		try {
			const res = await $axios.$get("/v1/edu-sharing", {
				params: query,
			});

			this.setElements({ hash: queryHash, result: res });
		} catch (e) {
			console.error(e);
		} finally {
			this.decLoading();
		}
	}

	@Action
	async addElements(payload = {}) {
		this.incLoading();
		try {
			const res = await $axios.$get("/v1/edu-sharing", {
				params: payload,
			});
			this.addElementsMutation(res);
		} catch (e) {
			console.error("Error: ", e);
		} finally {
			this.decLoading();
		}
	}

	@Action
	async getLessons(payload: string) {
		const params = {
			courseId: payload,
		};
		if (params.courseId) {
			//only search if courseId is existing
			const res = await $axios.$get("/v1/lessons", { params });
			this.setLessons(res);
		}
	}

	@Action
	async addToLesson(payload: AddToLessonQuery) {
		try {
			await $axios.post(
				`/v1/lessons/${payload.lessonId}/material`,
				payload.material
			);
			this.setNotificationModal("successModal");
		} catch (error) {
			this.setNotificationModal("errorModal");
		}
	}

	@Action
	async getResourceMetadata(id: string) {
		this.setStatus("pending");
		const metadata = await $axios.$get(`/v1/edu-sharing/${id}`);
		this.setCurrentResource(metadata);
		this.setStatus("completed");
	}

	@Action
	init() {
		this.initMutation(EnvConfigModule.getEnv.FEATURE_ES_COLLECTIONS_ENABLED);
	}
}

export default getModule(Content);
