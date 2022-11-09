import { contentModule } from "@/store";
import ContentModule from "@/store/content";
import setupStores from "@@/tests/test-utils/setupStores";
import AddContentModal from "@/components/molecules/AddContentModal";

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
		value: "id1",
		text: "course1",
		isArchived: false,
	},
	{
		value: "id2",
		text: "course2",
		isArchived: true,
	},
];

const lessonsMock = [
	{
		value: "id1",
		text: "lesson-1",
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
			__v: 0,
		},
	],
};

const addToLesson = jest.fn().mockReturnValue(Promise.resolve());

const mockStore = {
	courses: {
		getters: {
			getCoursesOptions: () =>
				courseOptions
					.filter((course) => course.isArchived === false)
					.map((course) => {
						return {
							value: course.value,
							text: course.text,
						};
					}),
		},
	},
	content: {
		actions: {
			addToLesson,
			getLessons: () => Promise.resolve(),
		},
		state: {
			lessons: {
				data: lessonsMock,
			},
		},
		getters: {
			getLessons: () => ({ data: lessonsMock }),
		},
	},
};

function getWrapper(attributes, options) {
	return mount(AddContentModal, {
		...createComponentMocks({
			i18n: true,
			store: mockStore,
		}),
		propsData: attributes,
		...options,
	});
}

describe("@/components/molecules/AddContentModal", () => {
	beforeEach(() => {
		setupStores({
			contentModule: ContentModule,
		});
	});

	it("nothing selected submit should be disabled", async () => {
		const wrapper = getWrapper(testProps);
		const submitBtn = wrapper.find('[data-testid="modal_submit_btn"]');
		expect(wrapper.vm.isSendEnabled).toBe(false);
		expect(submitBtn.exists()).toBe(true);
		expect(submitBtn.attributes().disabled).toBe("disabled");
	});

	it("selected submit should be enabled", async () => {
		const wrapper = getWrapper(testProps);
		expect(wrapper.vm.isSendEnabled).toBe(false);
		wrapper.setData({
			selectedLessons: lessonsMock[0],
		});
		await wrapper.vm.$nextTick();
		const submitBtn = wrapper.find('[data-testid="modal_submit_btn"]');
		expect(wrapper.vm.isSendEnabled).toBe(true);
		expect(submitBtn.attributes().disabled).toBeUndefined();
	});

	it("create coursesOptions", async () => {
		const wrapper = getWrapper(testProps);
		const co = wrapper.vm.coursesOptions;
		expect(co).toHaveLength(1);
		expect(co[0].value).toBe(courseOptions[0].value);
		expect(co[0].text).toBe(courseOptions[0].text);
	});

	it("create lessonsOptions", async () => {
		const wrapper = getWrapper(testProps);
		contentModule.setLessons(lessons);
		const lo = wrapper.vm.lessonsOptions;
		expect(lo).toHaveLength(1);
		expect(lo[0].value).toBe(lessonsMock[0].value);
		expect(lo[0].text).toBe(lessonsMock[0].text);
	});

	it("submit modal action", async () => {
		const wrapper = getWrapper(testProps);
		wrapper.setData({
			selectedLessons: lessonsMock,
		});
		expect(wrapper.vm.isSendEnabled).toBe(true);
		await wrapper.vm.$nextTick();
		const submitBtn = wrapper.find('[data-testid="modal_submit_btn"]');
		await submitBtn.trigger("click");
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")[0][0]).toBeFalsy();
	});

	it("submit modal action multiple items", async () => {
		const wrapper = getWrapper(testPropsMultiple);
		wrapper.setData({
			selectedLessons: lessonsMock,
		});
		expect(wrapper.vm.isSendEnabled).toBe(true);
		await wrapper.vm.$nextTick();
		const submitBtn = wrapper.find('[data-testid="modal_submit_btn"]');
		await submitBtn.trigger("click");
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")[0][0]).toBeFalsy();
	});

	it("cancel modal action", async () => {
		const wrapper = getWrapper(testProps);
		const cancelBtn = wrapper.find("button");
		wrapper.vm.selectedCourse = courseOptions[0];
		wrapper.vm.selectedLesson = lessonsMock[0];
		await cancelBtn.trigger("click");
		expect(Object.keys(wrapper.vm.selectedCourse)).toHaveLength(0);
		expect(Object.keys(wrapper.vm.selectedLessons)).toHaveLength(0);
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")[0][0]).toBeFalsy();
	});
});
