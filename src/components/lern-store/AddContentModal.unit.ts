import { contentModule } from "@/store";
import courses from "@/store/courses";
import ContentModule from "@/store/content";
import { initializeAxios } from "@/utils/api";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { nextTick } from "vue";
import { VBtn, VSelect } from "vuetify/lib/components/index.mjs";
import { createStore } from "vuex";
import AddContentModal from "./AddContentModal.vue";

initializeAxios(createMock<AxiosInstance>());
const testProps = {
	showCopyModal: true,
	resource: {
		title: "Test title",
		url: "test url",
		client: "test client",
	},
	contentId: "Test content",
	items: [],
};
const testPropsMultiple = {
	showCopyModal: true,
	resource: {
		title: "",
		url: "",
		client: "",
	},
	contentId: "Test content",
	items: [
		{
			title: "Test title1",
			url: "test url1",
			client: "test client2",
		},
		{
			title: "Test title2",
			url: "test url2",
			client: "test client2",
		},
	],
};

const courseOptions = [
	{
		_id: "id1",
		name: "course1",
		isArchived: false,
	},
	{
		_id: "id2",
		name: "course2",
		isArchived: true,
	},
];

const lessonsMock = [
	{
		_id: "id1",
		name: "lesson-1",
	},
];

const lessons = {
	total: 1,
	limit: 500,
	skip: 0,
	data: [
		{
			_id: "id1",
			materialIds: [""],
			hidden: true,
			isCopyFrom: null,
			position: 0,
			courseId: "0000dcfbfb5c7a3f00bf21ab",
			name: "lesson-1",
			contents: [],
			time: "2021-08-17T22:00:00.000Z",
			date: "1999-12-31T23:00:00.000Z",
			createdAt: "2021-08-18T09:11:18.962Z",
			updatedAt: "2021-08-18T10:30:37.348Z",
		},
	],
};

const createMockStore = () => {
	const createStudentStub = jest.fn();
	const mockStore = createStore({
		modules: {
			courses: {
				namespaced: true,
				getters: {
					getCoursesOptions: () => courseOptions,
				},
			},
		},
	});
	return { mockStore, createStudentStub };
};

describe("@/components/molecules/AddContentModal", () => {
	const setup = () => {
		setupStores({
			contentModule: ContentModule,
		});
		const getWrapper = (props: object) => {
			const { mockStore } = createMockStore();
			return mount(AddContentModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					mocks: {
						$store: mockStore,
					},
				},
				props,
			});
		};
		return { getWrapper };
	};

	it("nothing selected submit should be disabled", async () => {
		const { getWrapper } = setup();
		const wrapper = getWrapper(testProps);
		const submitBtn = wrapper.findComponent('[data-testid="modal_submit_btn"]');
		expect(wrapper.vm.isSendEnabled).toBe(false);
		expect(submitBtn.exists()).toBe(true);
		expect(submitBtn.attributes().disabled).toBe("");
	});

	it("selected submit should be enabled", async () => {
		const { getWrapper } = setup();
		const wrapper = getWrapper(testProps);
		expect(wrapper.vm.isSendEnabled).toBe(false);
		wrapper.setData({
			selectedLesson: lessonsMock[0],
		});
		await wrapper.vm.$nextTick();
		const submitBtn = wrapper.findComponent('[data-testid="modal_submit_btn"]');
		expect(wrapper.vm.isSendEnabled).toBe(true);
		expect(submitBtn.attributes().disabled).toBeUndefined();
	});

	it("create coursesOptions", async () => {
		const { getWrapper } = setup();
		const wrapper = getWrapper(testProps);
		const selection = wrapper.findComponent(VSelect);
		expect(selection.props("items")).toBe(courseOptions);
	});

	it("create lessonsOptions", async () => {
		const { getWrapper } = setup();
		const wrapper = getWrapper(testProps);
		contentModule.setLessons(lessons);
		const lo = wrapper.vm.lessonsOptions;
		expect(lo).toHaveLength(1);
		expect(lo[0]._id).toBe(lessonsMock[0]._id);
		expect(lo[0].name).toBe(lessonsMock[0].name);
	});

	it("submit modal action", async () => {
		const { getWrapper } = setup();
		const wrapper = getWrapper(testProps);
		wrapper.setData({
			selectedLesson: lessonsMock[0],
		});
		expect(wrapper.vm.isSendEnabled).toBe(true);
		await nextTick();
		const submitBtn = wrapper.findComponent('[data-testid="modal_submit_btn"]');
		await submitBtn.trigger("click");
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")?.[0][0]).toBe(false);
	});

	it("submit modal action multiple items", async () => {
		const { getWrapper } = setup();
		const wrapper = getWrapper(testPropsMultiple);
		wrapper.setData({
			selectedLesson: lessonsMock[0],
		});
		expect(wrapper.vm.isSendEnabled).toBe(true);
		await nextTick();
		const submitBtn = wrapper.findComponent('[data-testid="modal_submit_btn"]');
		await submitBtn.trigger("click");
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")?.[0][0]).toBe(false);
	});

	it("cancel modal action", async () => {
		const { getWrapper } = setup();
		const wrapper = getWrapper(testProps);
		const cancelBtn = wrapper.findComponent(VBtn);
		const courseSelection = wrapper.findAllComponents(VSelect)[0];
		const lessonSelection = wrapper.findAllComponents(VSelect)[1];

		courseSelection.vm.$emit("update:modelValue", courseOptions[0]);
		await nextTick();
		lessonSelection.vm.$emit("update:modelValue", lessonsMock[0]);
		await nextTick();
		expect(lessonSelection.props("modelValue")).toEqual(lessonsMock[0]);
		expect(courseSelection.props("modelValue")).toEqual(courseOptions[0]);

		await cancelBtn.trigger("click");

		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(lessonSelection.props("modelValue")).toBeNull();
		expect(courseSelection.props("modelValue")).toBeNull();
	});
});

// This test is necessary to ensure that the real Vuex course-store is functioning correctly.
// The course-store is only invoked at this point, making it crucial to test it here.
describe("AddContentModal with real Vuex course-store", () => {
	// const setup = () => {}; //TODO ....
	it("course options should be defined", async () => {
		const store = createStore({
			modules: {
				courses,
			},
		});
		const getWrapper = (props: object) => {
			return mount(AddContentModal, {
				global: {
					plugins: [store, createTestingVuetify(), createTestingI18n()],
				},
				props,
			});
		};
		const wrapper = getWrapper(testProps);
		const select = wrapper.findComponent(VSelect);
		const items = select.props("items");
		expect(items).toHaveLength(0);
	});
});
