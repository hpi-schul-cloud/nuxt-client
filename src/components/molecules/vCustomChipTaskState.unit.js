import Vuetify from "vuetify";
import VCustomChipTaskState from "./VCustomChipTaskState";

let vuetify;

describe("@components/molecules/vCustomEmptyState", () => {
	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(VCustomChipTaskState));

	it("should render an orange v-chip component, with n hours left", () => {
		const dueDate = new Date();
		dueDate.setHours(dueDate.getHours() + 3);

		const wrapper = mount(VCustomChipTaskState, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				type: "warning",
				dueDate: dueDate.toISOString(),
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should render an orange v-chip component, with n minutes left", () => {
		const dueDate = new Date();
		dueDate.setMinutes(dueDate.getMinutes() + 20);

		const wrapper = mount(VCustomChipTaskState, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				type: "warning",
				dueDate: dueDate.toISOString(),
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should render a red v-chip component, with overdue label", () => {
		const dueDate = new Date();
		dueDate.setMinutes(dueDate.getMinutes() - 20);

		const wrapper = mount(VCustomChipTaskState, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				type: "overdue",
				dueDate: dueDate.toISOString(),
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should render a blue v-chip component, with graded label", () => {
		const wrapper = mount(VCustomChipTaskState, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				type: "graded",
				dueDate: undefined,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("hintDueDate() method return the right label dependent on date", () => {
		let label;
		const dueDate = new Date();
		dueDate.setMinutes(dueDate.getMinutes() + 20);

		const wrapper = shallowMount(VCustomChipTaskState, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				type: "overdue",
				dueDate: dueDate.toISOString(),
			},
		});

		label = wrapper.vm.hintDueDate(dueDate.toISOString());
		expect(label).toContain("19 Minuten");
		label = wrapper.vm.hintDueDate(dueDate.toISOString(), true);
		expect(label).toContain("19 min");

		dueDate.setHours(dueDate.getHours() + 2);
		label = wrapper.vm.hintDueDate(dueDate.toISOString());
		expect(label).toContain("2 Stunden");
		label = wrapper.vm.hintDueDate(dueDate.toISOString(), true);
		expect(label).toContain("2 h");
	});

	it("accepts valid type props", () => {
		const validTypes = ["warning", "overdue"];
		const { validator } = VCustomChipTaskState.props.type;

		validTypes.forEach((type) => {
			expect(validator(type)).toBe(true);
		});

		expect(validator("wrong type")).toBe(false);
	});

	it("accepts valid dueDate props", () => {
		const validDueDates = [
			"2021-06-11T14:00:00.000Z",
			"2021-06-07T09:30:00.000Z",
		];
		const { validator } = VCustomChipTaskState.props.dueDate;

		validDueDates.forEach((dueDate) => {
			expect(validator(dueDate)).toBe(true);
		});

		expect(validator("wrong due date")).toBe(false);
	});
});
