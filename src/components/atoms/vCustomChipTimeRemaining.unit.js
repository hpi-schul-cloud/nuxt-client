import Vuetify from "vuetify";
import VCustomChipTimeRemaining from "./VCustomChipTimeRemaining";

let vuetify;

describe("@/components/atoms/vCustomChipTimeRemaining", () => {
	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(VCustomChipTimeRemaining));

	it("should render an orange v-chip component, with n hours left", () => {
		const dueDate = new Date();
		dueDate.setHours(dueDate.getHours() + 3);

		const wrapper = mount(VCustomChipTimeRemaining, {
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

		const wrapper = mount(VCustomChipTimeRemaining, {
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

	it("hintDueDate() method return the right label dependent on date", () => {
		let label;
		const dueDate = new Date();
		dueDate.setMinutes(dueDate.getMinutes() + 20);

		const wrapper = shallowMount(VCustomChipTimeRemaining, {
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
		const validTypes = ["warning"];
		const { validator } = VCustomChipTimeRemaining.props.type;

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
		const { validator } = VCustomChipTimeRemaining.props.dueDate;

		validDueDates.forEach((dueDate) => {
			expect(validator(dueDate)).toBe(true);
		});

		expect(validator("wrong due date")).toBe(false);
	});
});
