import HomeworksList from "./HomeworksList";
import {
	homeworks,
	overDueHomeworks,
	openHomeworks,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
				loading: () => false,
				isListEmpty: () => false,
				isListFilled: () => true,
				openHomeworks: () => openHomeworks,
				overDueHomeworks: () => overDueHomeworks,
			},
			state: () => ({
				list: homeworks,
				loading: false,
			}),
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksList));

	it("accepts only student and teacher as type prop", () => {
		const validTypes = ["student", "teacher"];
		const { validator } = HomeworksList.props.type;

		validTypes.forEach((type) => {
			expect(validator(type)).toBe(true);
		});

		expect(validator("wrong type")).toBe(false);
	});

	it("Should render complete homework items list", () => {
		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				homeworks,
				type: "student",
			},
		});

		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(
			homeworks.length
		);
	});

	it("Should render an empty list, if there are no homeworks", () => {
		const mockStoreEmpty = {
			homeworks: {
				getters: {
					list: () => [],
					loading: () => false,
					isListEmpty: () => true,
					isListFilled: () => false,
					openHomeworks: () => [],
					overDueHomeworks: () => [],
				},
				state: () => ({
					list: [],
					loading: false,
				}),
			},
		};

		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreEmpty,
			}),
			vuetify,
			propsData: {
				type: "student",
			},
		});
		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("Should render loading state while fetching homework", () => {
		const mockStoreLoading = {
			homeworks: {
				getters: {
					list: () => [],
					loading: () => true,
					isListEmpty: () => false,
					isListFilled: () => false,
					openHomeworks: () => [],
					overDueHomeworks: () => [],
				},
				state: () => ({
					list: [],
					loading: true,
				}),
			},
		};
		const wrapper = mount(HomeworksList, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreLoading,
			}),
			vuetify,
			propsData: {
				homeworks: [],
				type: "student",
			},
		});

		expect(wrapper.find(".v-skeleton-loader__text").exists()).toBe(true);
		expect(
			wrapper.find(".v-skeleton-loader__list-item-avatar-two-line").exists()
		).toBe(true);
		expect(wrapper.props("homeworks")).toStrictEqual([]);
		expect(wrapper.findAllComponents({ name: "VListItem" })).toHaveLength(0);
	});

	it("should accept valid type props", () => {
		const { validator } = HomeworksList.props.type;
		const validTypes = ["student", "teacher"];
		const invalidTypes = ["invalid", "type"];

		validTypes.forEach((type) => {
			expect(validator(type)).toBe(true);
		});

		invalidTypes.forEach((type) => {
			expect(validator(type)).toBe(false);
		});
	});
});
