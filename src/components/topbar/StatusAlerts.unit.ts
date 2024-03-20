import { mount } from "@vue/test-utils";
import StatusAlerts from "./StatusAlerts.vue";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import dayjs from "dayjs";
import { formatDateForAlerts } from "@/plugins/datetime";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const testProps = {
	statusAlerts: mockStatusAlerts,
};

describe("@/components/topbar/StatusAlerts", () => {
	const setup = (props: object = {}, options?: object) => {
		const wrapper = mount(StatusAlerts, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			...options,
		});

		return { wrapper };
	};

	it("should have correct props", () => {
		const { wrapper } = setup(testProps);
		expect(wrapper.vm.statusAlerts).toStrictEqual(testProps.statusAlerts);
	});

	it("should not render status alert items, when none are given", () => {
		const { wrapper } = setup();

		expect(wrapper.findAll("v-list-item")).toHaveLength(0);
	});

	it("should show alert title", () => {
		const { wrapper } = setup(testProps);
		const title = wrapper.find("[data-testid='alert-title-0']");
		expect(title.element.textContent).toContain(mockStatusAlerts[0].title);
	});

	it("should show alert text", () => {
		const { wrapper } = setup(testProps);
		const title = wrapper.find("[data-testid='alert-text-0']");
		expect(title.element.textContent).toContain(mockStatusAlerts[0].text);
	});

	it("should show multiple alerts", () => {
		const { wrapper } = setup(testProps);
		const title0 = wrapper.find("[data-testid='alert-title-0']");
		expect(title0.element.textContent).toContain(mockStatusAlerts[0].title);
		const title1 = wrapper.find("[data-testid='alert-title-1']");
		expect(title1.element.textContent).toContain(mockStatusAlerts[1].title);
		const title2 = wrapper.find("[data-testid='alert-title-2']");
		expect(title2.element.textContent).toContain(mockStatusAlerts[2].title);
	});

	describe("formatDate", () => {
		it("returns 'vor ein paar Sekunden' for seconds difference", () => {
			setup(testProps);
			const fewSecondsAgo = dayjs().subtract(30, "seconds");
			const expectedOutput = "vor ein paar Sekunden";
			const result = formatDateForAlerts(fewSecondsAgo);
			expect(result).toBe(expectedOutput);
		});
		it("returns European format after 7 days", () => {
			const { wrapper } = setup(testProps);
			const pastDate = dayjs.utc().subtract(8, "days").toISOString();
			const expectedDate = dayjs.utc(pastDate).format("DD.MM.YYYY");
			expect(wrapper.vm.formatDate(pastDate)).toEqual(expectedDate);
		});
	});
});
