import VCustomChipTimeRemaining from "./VCustomChipTimeRemaining.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@/components/tasks/vCustomChipTimeRemaining", () => {
	const setup = (dueDate: Date, shortenUnit = false) => {
		const wrapper = mount(VCustomChipTimeRemaining, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				type: "warning",
				dueDate: dueDate.toISOString(),
				shortenUnit,
			},
		});

		return { wrapper };
	};

	describe("time remaining hint hours", () => {
		let dueDate: Date;
		const HOURS_UNTIL_DUE = 3;

		beforeEach(() => {
			dueDate = new Date();
			dueDate.setHours(dueDate.getHours() + HOURS_UNTIL_DUE);
		});

		it("renders in long form", () => {
			const { wrapper } = setup(dueDate);

			const expectedResult = `${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintDueTime"
			)}${HOURS_UNTIL_DUE} ${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintHours",
				HOURS_UNTIL_DUE
			)}`;

			expect(wrapper.element.textContent).toContain(expectedResult);
		});

		it("should render in shortened form", () => {
			const { wrapper } = setup(dueDate, true);

			const expectedResult = `${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintDueTime"
			)}${HOURS_UNTIL_DUE} ${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintHoursShort"
			)}`;
			expect(wrapper.element.textContent).toContain(expectedResult);
		});
	});

	describe("time remaining hint minutes", () => {
		let dueDate: Date;
		const MINUTES_UNTIL_DUE = 20;

		beforeEach(() => {
			dueDate = new Date();
			dueDate.setMinutes(dueDate.getMinutes() + MINUTES_UNTIL_DUE);
		});

		it("should render in long form", () => {
			const { wrapper } = setup(dueDate);

			const expectedResult = `${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintDueTime"
			)}${MINUTES_UNTIL_DUE} ${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintMinutes",
				MINUTES_UNTIL_DUE
			)}`;

			expect(wrapper.element.textContent).toContain(expectedResult);
		});

		it("should render in shortened form", () => {
			const { wrapper } = setup(dueDate, true);

			const expectedResult = `${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintDueTime"
			)}${MINUTES_UNTIL_DUE} ${wrapper.vm.$t(
				"components.atoms.VCustomChipTimeRemaining.hintMinShort"
			)}`;

			expect(wrapper.element.textContent).toContain(expectedResult);
		});
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
