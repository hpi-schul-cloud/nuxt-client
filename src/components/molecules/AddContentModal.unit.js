import AddContentModal from "@components/molecules/AddContentModal";
import { isValidComponent } from "@@/tests/unit/commonTests";
import ContentModule from "@/store/content";

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
							_id: course._id,
							name: course.name,
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

describe("@components/molecules/AddContentModal", () => {
	it(...isValidComponent(AddContentModal));

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
			selectedLesson: lessonsMock[0],
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
		expect(co[0]._id).toBe(courseOptions[0]._id);
		expect(co[0].name).toBe(courseOptions[0].name);
	});

	it("create lessonsOptions", async () => {
		const wrapper = getWrapper(testProps);
		ContentModule.setLessons(lessons);
		const lo = wrapper.vm.lessonsOptions;
		expect(lo).toHaveLength(1);
		expect(lo[0]._id).toBe(lessonsMock[0]._id);
		expect(lo[0].name).toBe(lessonsMock[0].name);
	});

	it("submit modal action", async () => {
		const wrapper = getWrapper(testProps);
		wrapper.setData({
			selectedLesson: lessonsMock[0],
		});
		expect(wrapper.vm.isSendEnabled).toBe(true);
		await wrapper.vm.$nextTick();
		const submitBtn = wrapper.find('[data-testid="modal_submit_btn"]');
		await submitBtn.trigger("click");
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")[0][0]).toBeFalse();
	});

	it("submit modal action multiple items", async () => {
		const wrapper = getWrapper(testPropsMultiple);
		wrapper.setData({
			selectedLesson: lessonsMock[0],
		});
		expect(wrapper.vm.isSendEnabled).toBe(true);
		await wrapper.vm.$nextTick();
		const submitBtn = wrapper.find('[data-testid="modal_submit_btn"]');
		await submitBtn.trigger("click");
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")[0][0]).toBeFalse();
	});

	it("cancel modal action", async () => {
		const wrapper = getWrapper(testProps);
		const cancelBtn = wrapper.find("button");
		wrapper.vm.selectedCourse = courseOptions[0];
		wrapper.vm.selectedLesson = lessonsMock[0];
		await cancelBtn.trigger("click");
		expect(Object.keys(wrapper.vm.selectedCourse)).toHaveLength(0);
		expect(Object.keys(wrapper.vm.selectedLesson)).toHaveLength(0);
		expect(wrapper.emitted("update:show-copy-modal")).toHaveLength(1);
		expect(wrapper.emitted("update:show-copy-modal")[0][0]).toBeFalse();
	});
});
