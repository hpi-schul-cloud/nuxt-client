import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import vCustomEmptyState from "./vCustomEmptyState.vue";

const title = "Test title";
const subtitle = "Test subtitle";
const image = "@/assets/img/empty-state/tasks-empty-state.svg";

describe("@/components/molecules/vCustomEmptyState", () => {
	const getWrapper = () => {
		return mount(vCustomEmptyState, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				image,
				title,
			},
		});
	};

	it("should render a title", () => {
		const wrapper = getWrapper();

		const h1 = wrapper.find("h1");

		expect(h1.text()).toBe(title);
	});

	it("should render subtitle, if it is passed as props", async () => {
		const wrapper = getWrapper();
		const h2 = wrapper.find("h2");

		expect(h2.exists()).toBe(false);
		// @ts-expect-error type error
		expect(wrapper.props("subtitle")).toBe("");

		wrapper.setProps({ subtitle });
		await wrapper.vm.$nextTick();

		const newH2 = wrapper.find("h2");
		expect(newH2.exists()).toBe(true);
		expect(newH2.text()).toBe(subtitle);
	});
});
