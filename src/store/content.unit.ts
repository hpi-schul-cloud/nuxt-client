import { Content, Resource } from "./content";
import { initializeAxios } from "../utils/api";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

const ESPath = "/v1/edu-sharing";
const lessonsPath = "/v1/lessons";
let requestPath: string;

const mockResource: Resource = {
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
	name: "mockResource",
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
};

const mockResources = {
	total: 0,
	limit: 0,
	skip: 0,
	data: [mockResource],
	pagination: undefined,
};

const mockLessons = {
	total: 0,
	limit: 0,
	skip: 0,
	data: [
		{
			contents: [],
			courseId: "",
			createdAt: "",
			date: "",
			hidden: false,
			isCopyFrom: {},
			materialIds: [],
			name: "",
			position: 0,
			time: "",
			updatedAt: "",
			__v: 0,
			_id: "",
		},
	],
};

const axiosInitializer = () => {
	initializeAxios({
		$get: async (path: string) => {
			requestPath = path;
			if (path === ESPath) return mockResources;
			if (path === lessonsPath) return mockLessons;
		},
		post: async (path: string) => {
			requestPath = path;
		},
	} as NuxtAxiosInstance);
};

describe("content module", () => {
	beforeEach(() => {
		requestPath = "";
	});
	describe("actions", () => {
		it("selectElement action should call setSelectedElement mutation", () => {
			const contentModule = new Content({});
			const selectedSpy = jest.fn();
			contentModule.setSelectedElement = selectedSpy;
			expect(selectedSpy).not.toBeCalled();
			contentModule.selectElement("mockId");
			expect(selectedSpy).toBeCalled();
		});
		it("unselectElemeent action should call setSelectedElement mutation", () => {
			const contentModule = new Content({});
			const selectedSpy = jest.fn();
			contentModule.setSelectedElement = selectedSpy;
			expect(selectedSpy).not.toBeCalled();
			contentModule.unselectElement("mockId");
			expect(selectedSpy).toBeCalled();
		});
		it("getResources should call incLoading, setLastQuery, setResources, and decLoading mutations", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			const incLoadingSpy = jest.fn();
			const setLastQuerySpy = jest.fn();
			const decLoadingSpy = jest.fn();
			const setResourcesSpy = jest.fn();

			contentModule.incLoading = incLoadingSpy;
			contentModule.setLastQuery = setLastQuerySpy;
			contentModule.decLoading = decLoadingSpy;
			contentModule.setResources = setResourcesSpy;

			expect(incLoadingSpy).not.toBeCalled();
			expect(setLastQuerySpy).not.toBeCalled();
			expect(decLoadingSpy).not.toBeCalled();
			expect(setResourcesSpy).not.toBeCalled();

			await contentModule.getResources(query);

			expect(incLoadingSpy).toBeCalled();
			expect(setLastQuerySpy).toBeCalled();
			expect(decLoadingSpy).toBeCalled();
			expect(setResourcesSpy).toBeCalled();
		});
		it("getResources should make a get request to the right path", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			await contentModule.getResources(query);
			expect(requestPath).toBe(ESPath);
		});
		it("getResources should get resources", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};

			await contentModule.getResources(query);
			expect(contentModule.resources).toStrictEqual(mockResources);
		});
		it("addResources should call incLoading, addResourceMutation and decLoading mutations", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			const incLoadingSpy = jest.fn();
			const decLoadingSpy = jest.fn();
			const addResourceSpy = jest.fn();

			contentModule.incLoading = incLoadingSpy;
			contentModule.decLoading = decLoadingSpy;
			contentModule.addResourcesMutation = addResourceSpy;

			expect(incLoadingSpy).not.toBeCalled();
			expect(decLoadingSpy).not.toBeCalled();
			expect(addResourceSpy).not.toBeCalled();

			await contentModule.addResources(query);

			expect(incLoadingSpy).toBeCalled();
			expect(decLoadingSpy).toBeCalled();
			expect(addResourceSpy).toBeCalled();
		});
		it("addResources should make a get request to the right path", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			await contentModule.addResources(query);
			expect(requestPath).toBe(ESPath);
		});
		it("addResources should get resources", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};

			await contentModule.addResources(query);
			expect(contentModule.resources).toStrictEqual(mockResources);
		});
		it("getElements should call incLoading, setLastQuery, setElements and decLoading mutations", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			const incLoadingSpy = jest.fn();
			const setLastQuerySpy = jest.fn();
			const decLoadingSpy = jest.fn();
			const setElementsSpy = jest.fn();

			contentModule.incLoading = incLoadingSpy;
			contentModule.setLastQuery = setLastQuerySpy;
			contentModule.decLoading = decLoadingSpy;
			contentModule.setElements = setElementsSpy;

			expect(incLoadingSpy).not.toBeCalled();
			expect(setLastQuerySpy).not.toBeCalled();
			expect(decLoadingSpy).not.toBeCalled();
			expect(setElementsSpy).not.toBeCalled();

			await contentModule.getElements(query);

			expect(incLoadingSpy).toBeCalled();
			expect(setLastQuerySpy).toBeCalled();
			expect(decLoadingSpy).toBeCalled();
			expect(setElementsSpy).toBeCalled();
		});
		it("getElements should make a get request to the right path", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			await contentModule.getElements(query);
			expect(requestPath).toBe(ESPath);
		});
		it("addElements should call incLoading, addElementsMutation and decLoading mutations", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			const incLoadingSpy = jest.fn();
			const decLoadingSpy = jest.fn();
			const addElementsSpy = jest.fn();

			contentModule.incLoading = incLoadingSpy;
			contentModule.decLoading = decLoadingSpy;
			contentModule.addElementsMutation = addElementsSpy;

			expect(incLoadingSpy).not.toBeCalled();
			expect(decLoadingSpy).not.toBeCalled();
			expect(addElementsSpy).not.toBeCalled();

			await contentModule.addElements(query);

			expect(incLoadingSpy).toBeCalled();
			expect(decLoadingSpy).toBeCalled();
			expect(addElementsSpy).toBeCalled();
		});
		it("addElements should make a get request to the right path", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const query = {
				$limit: 0,
				$skip: 0,
				searchQuery: "mock",
			};
			await contentModule.addElements(query);
			expect(requestPath).toBe(ESPath);
		});
		it("getLessons should call setLessons mutation if courseId exists", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			const setLessonsSpy = jest.fn();

			contentModule.setLessons = setLessonsSpy;

			expect(setLessonsSpy).not.toBeCalled();

			await contentModule.getLessons("mockId");

			expect(setLessonsSpy).toBeCalled();
		});
		it("getLessons should make a get request to the right path", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			await contentModule.getLessons("mockId");
			expect(requestPath).toBe(lessonsPath);
		});
		it("getLessons should get lessons", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			await contentModule.getLessons("mockId");
			expect(contentModule.lessons).toBe(mockLessons);
		});
		it("addToLesson should call setNotificationModal mutation", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			const query = {
				lessonId: "",
				event: {},
				material: {
					client: "",
					merlinReference: "",
					title: "",
					url: "",
				},
			};
			const setNotificationSpy = jest.fn();

			contentModule.setNotificationModal = setNotificationSpy;

			expect(setNotificationSpy).not.toBeCalled();

			await contentModule.addToLesson(query);

			expect(setNotificationSpy).toBeCalled();
		});
		it("addToLesson should make a post request to the right path", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			const mockQuery = {
				lessonId: "mockId",
				event: {},
				material: {
					client: "",
					merlinReference: "",
					title: "",
					url: "",
				},
			};

			await contentModule.addToLesson(mockQuery);
			expect(requestPath).toBe(`/v1/lessons/${mockQuery.lessonId}/material`);
		});
		it("addToLesson should call setNotificationModal with 'successModal' parameter when the call is successful", async () => {
			const contentModule = new Content({});
			axiosInitializer();

			const mockQuery = {
				lessonId: "mockId",
				event: {},
				material: {
					client: "",
					merlinReference: "",
					title: "",
					url: "",
				},
			};
			const setNoticationSpy = jest.spyOn(
				contentModule,
				"setNotificationModal"
			);

			expect(setNoticationSpy.mock.calls[0]).toBeUndefined();
			await contentModule.addToLesson(mockQuery);
			expect(setNoticationSpy.mock.calls[0][0]).toBe("successModal");
		});
		it("getResourceMetadata should call setStatus and setCurrentResource mutation", async () => {
			const contentModule = new Content({});
			const setStatusSpy = jest.fn();
			const setCurrentResourceSpy = jest.fn();

			contentModule.setStatus = setStatusSpy;
			contentModule.setCurrentResource = setCurrentResourceSpy;

			expect(setStatusSpy).not.toBeCalled();
			expect(setCurrentResourceSpy).not.toBeCalled();

			await contentModule.getResourceMetadata("");

			expect(setStatusSpy).toBeCalled();
			expect(setCurrentResourceSpy).toBeCalled();
		});
		it("getResourceMetadata should call the right path", async () => {
			const contentModule = new Content({});
			axiosInitializer();
			const mockId = "mockId";
			await contentModule.getResourceMetadata(mockId);
			expect(requestPath).toBe(`/v1/edu-sharing/${mockId}`);
		});
		it("init action calls initMutation mutation", () => {
			const contentModule = new Content({});
			const initSpy = jest.fn();

			contentModule.initMutation = initSpy;

			expect(initSpy).not.toBeCalled();

			contentModule.init();

			expect(initSpy).toBeCalled();
		});
	});
	describe("mutations", () => {
		it("setSelectedElements should set stateSelected value when the id matches", () => {
			const contentModule = new Content({});
			const mockElements = {
				total: 0,
				limit: 0,
				skip: 0,
				data: [
					{
						ref: { id: "mockId" },
						stateSelected: false,
					},
				],
				pagination: undefined,
			};
			contentModule.elements = mockElements;
			expect(contentModule.elements.data[0].stateSelected).toBe(false);
			contentModule.setSelectedElement({ id: "mockId", value: true });
			expect(contentModule.elements.data[0].stateSelected).toBe(true);
		});
		it("setSelectedElements should set selected value equals to the number of stateSelected === true elements", () => {
			const contentModule = new Content({});
			const mockElements = {
				total: 0,
				limit: 0,
				skip: 0,
				data: [
					{
						ref: { id: "" },
						stateSelected: false,
					},
					{
						ref: { id: "" },
						stateSelected: true,
					},
					{
						ref: { id: "" },
						stateSelected: true,
					},
				],
				pagination: undefined,
			};

			contentModule.elements = mockElements;
			expect(contentModule.selected).toBe(0);
			contentModule.setSelectedElement({ id: "asf", value: false });
			expect(contentModule.selected).toBe(2);
		});
		it("setResources should set resources value if lastQuery matches the hash", () => {
			const contentModule = new Content({});
			const mockHash = "mockHash";

			expect(contentModule.resources.data[0]).toBeUndefined();
			contentModule.lastQuery = mockHash;
			contentModule.setResources({ hash: mockHash, result: mockResources });
			expect(contentModule.resources.data[0]).not.toBeUndefined();
			expect(contentModule.resources.data[0].name).toBe("mockResource");
		});
		it("addResourcesMutation sets resources value", () => {
			const contentModule = new Content({});

			expect(contentModule.resources.data[0]).toBeUndefined();
			contentModule.addResourcesMutation(mockResources);
			expect(contentModule.resources.data[0]).not.toBeUndefined();
			expect(contentModule.resources.data[0].name).toBe("mockResource");
		});
		it("setElements should set elements value if lastQuery matches the hash", () => {
			const contentModule = new Content({});
			const mockHash = "mockHash";
			const mockElements = {
				total: 0,
				limit: 0,
				skip: 0,
				data: [
					{
						name: "mockElement",
					},
				],
				pagination: undefined,
			};

			expect(contentModule.elements.data[0]).toBeUndefined();
			contentModule.lastQuery = mockHash;
			contentModule.setElements({ hash: mockHash, result: mockElements });
			expect(contentModule.elements.data[0]).not.toBeUndefined();
			expect(contentModule.elements.data[0].name).toBe("mockElement");
		});
		it("addElementsMutation sets elements value", () => {
			const contentModule = new Content({});
			const mockElements = {
				total: 0,
				limit: 0,
				skip: 0,
				data: [
					{
						name: "mockElement",
					},
				],
				pagination: undefined,
			};

			expect(contentModule.elements.data[0]).toBeUndefined();
			contentModule.addElementsMutation(mockElements);
			expect(contentModule.elements.data[0]).not.toBeUndefined();
			expect(contentModule.elements.data[0].name).toBe("mockElement");
		});
		it("clearResources sets resources and selected to their initial values", () => {
			const contentModule = new Content({});

			contentModule.resources = mockResources;
			contentModule.selected = 123;
			expect(contentModule.resources.data[0]).not.toBeUndefined();
			expect(contentModule.selected).not.toBe(0);

			contentModule.clearResources();
			expect(contentModule.resources.data[0]).toBeUndefined();
			expect(contentModule.selected).toBe(0);
		});
		it("clearElements sets elements and selected to their initial values", () => {
			const contentModule = new Content({});
			const mockElements = {
				total: 0,
				limit: 0,
				skip: 0,
				data: [
					{
						name: "mockElement",
					},
				],
				pagination: undefined,
			};
			contentModule.elements = mockElements;
			contentModule.selected = 123;
			expect(contentModule.elements.data[0]).not.toBeUndefined();
			expect(contentModule.selected).not.toBe(0);

			contentModule.clearElements();
			expect(contentModule.elements.data[0]).toBeUndefined();
			expect(contentModule.selected).toBe(0);
		});
		it("clearLessons sets lessons to its initial value", () => {
			const contentModule = new Content({});
			contentModule.lessons = mockLessons;
			expect(contentModule.lessons.data[0]).not.toBeUndefined();

			contentModule.clearLessons();
			expect(contentModule.lessons.data[0]).toBeUndefined();
			expect(contentModule.selected).toBe(0);
		});
		it("setLastQuery sets lastQuery value", () => {
			const contentModule = new Content({});
			const mockQuery = "mockQuery";

			expect(contentModule.lastQuery).toBe("");
			contentModule.setLastQuery(mockQuery);
			expect(contentModule.lastQuery).toBe(mockQuery);
		});
		it("incLoading sets loading to true if loadingCounter is 0 and increases it by 1", () => {
			const contentModule = new Content({});
			expect(contentModule.loading).toBe(false);
			expect(contentModule.loadingCounter).toBe(0);

			contentModule.incLoading();
			expect(contentModule.loading).toBe(true);
			expect(contentModule.loadingCounter).toBe(1);
		});
		it("decLoading sets loading to false if loadingCounter is 0 and decreases it by 1", () => {
			const contentModule = new Content({});
			contentModule.loadingCounter = 1;
			contentModule.loading = true;
			expect(contentModule.loading).toBe(true);
			expect(contentModule.loadingCounter).toBe(1);

			contentModule.decLoading();
			expect(contentModule.loading).toBe(false);
			expect(contentModule.loadingCounter).toBe(0);
		});
		it("setLessons sets lessons value", () => {
			const contentModule = new Content({});
			expect(contentModule.lessons.data[0]).toBeUndefined();

			contentModule.setLessons(mockLessons);
			expect(contentModule.lessons.data[0]).toBeDefined();
		});
		it("initMutation sets collectionsFeatureFlag value", () => {
			const contentModule = new Content({});
			expect(contentModule.collectionsFeatureFlag).toBeNull();
			contentModule.initMutation(true);
			expect(contentModule.collectionsFeatureFlag).toBe(true);
		});
		it("setCurrentResource sets currentResource value", () => {
			const contentModule = new Content({});
			expect(contentModule.currentResource.name).toBe("");
			contentModule.setCurrentResource(mockResource);
			expect(contentModule.currentResource.name).toBe("mockResource");
		});
		it("setStatus sets status value", () => {
			const contentModule = new Content({});
			expect(contentModule.status).toBeNull();
			contentModule.setStatus("completed");
			expect(contentModule.status).toBe("completed");
		});
		it("setNotificationModal sets notification modal value", () => {
			const contentModule = new Content({});
			expect(contentModule.notificationModal).toBeNull();
			contentModule.setNotificationModal("mockModal");
			expect(contentModule.notificationModal).toBe("mockModal");
		});
	});
	describe("getters", () => {
		it("getLessonsGetter gets lessons", () => {
			const contentModule = new Content({});
			contentModule.lessons = mockLessons;
			expect(contentModule.getLessonsGetter).toBe(mockLessons);
		});
		it("getElementsGetter gets elements", () => {
			const contentModule = new Content({});
			const mockElements = {
				total: 0,
				limit: 0,
				skip: 0,
				data: [
					{
						name: "mockElement",
					},
				],
				pagination: undefined,
			};
			contentModule.elements = mockElements;
			expect(contentModule.getElementsGetter).toBe(mockElements);
		});
		it("getSelected gets selected", () => {
			const contentModule = new Content({});
			contentModule.selected = 1;
			expect(contentModule.getSelected).toBe(1);
		});
		it("getLoading gets loading", () => {
			const contentModule = new Content({});
			contentModule.loading = true;
			expect(contentModule.getLoading).toBe(true);
		});
		it("getResourcesGetter gets resources", () => {
			const contentModule = new Content({});
			contentModule.resources = mockResources;
			expect(contentModule.getResourcesGetter).toBe(mockResources);
		});
		it("getCollectionsFeatureFlag gets resources", () => {
			const contentModule = new Content({});
			contentModule.collectionsFeatureFlag = true;
			expect(contentModule.getCollectionsFeatureFlag).toBe(true);
		});
		it("getCurrentResource gets resources", () => {
			const contentModule = new Content({});
			expect(contentModule.getCurrentResource).not.toBe(mockResource);
			contentModule.currentResource = mockResource;
			expect(contentModule.getCurrentResource).toBe(mockResource);
		});
		it("getStatus gets resources", () => {
			const contentModule = new Content({});
			contentModule.status = "completed";
			expect(contentModule.getStatus).toBe("completed");
		});
		it("getNotificationModal gets notificationModal", () => {
			const contentModule = new Content({});
			contentModule.notificationModal = "modalMock";
			expect(contentModule.getNotificationModal).toBe("modalMock");
		});
	});
});
