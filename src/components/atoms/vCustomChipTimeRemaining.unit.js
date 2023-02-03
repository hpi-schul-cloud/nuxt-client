import Vuetify from "vuetify";
import VCustomChipTimeRemaining from "./VCustomChipTimeRemaining";

let vuetify;

describe("@/components/atoms/vCustomChipTimeRemaining", () => {
	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it("should render an orange v-chip component, with n hours left", () => {
		const dueDate = new Date();
		const addHour = 3;
		dueDate.setHours(dueDate.getHours() + addHour);

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

		const expectedResult = `${wrapper.vm.$t(
			"components.atoms.VCustomChipTimeRemaining.hintDueTime"
		)}${addHour - 1} ${wrapper.vm.$tc(
			"components.atoms.VCustomChipTimeRemaining.hintHours",
			addHour - 1
		)}`;
		expect(wrapper.element.textContent).toContain(expectedResult);
	});

	it("should render an orange v-chip component, with n minutes left", () => {
		const dueDate = new Date();
		const addMinute = 20;
		dueDate.setMinutes(dueDate.getMinutes() + addMinute);

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

		const expectedResult = `${wrapper.vm.$t(
			"components.atoms.VCustomChipTimeRemaining.hintDueTime"
		)}${addMinute - 1} ${wrapper.vm.$tc(
			"components.atoms.VCustomChipTimeRemaining.hintMinutes",
			addMinute - 1
		)}`;

		expect(wrapper.element.textContent).toContain(expectedResult);
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
