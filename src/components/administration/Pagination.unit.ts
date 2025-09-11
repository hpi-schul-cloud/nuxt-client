import Pagination from "./Pagination.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const getWrapper = (props = {}) => {
	return mount(Pagination, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
	});
};

describe("@/components/administration/Pagination", () => {
	it("should only render a next page link on the first page", () => {
		const wrapper = getWrapper({ perPage: 5, currentPage: 1, total: 40 });

		const btns = wrapper.findAllComponents(".pagination-link");
		expect(btns).toHaveLength(1);
		expect(btns[0].find(".v-icon").exists()).toBe(true);
	});

	it("should only render a previous page link on the last page", () => {
		const wrapper = getWrapper({
			perPage: 5,
			currentPage: 2,
			total: 10,
		});

		const btns = wrapper.findAllComponents(".pagination-link");
		expect(btns).toHaveLength(1);
		expect(btns[0].find(".v-icon").exists()).toBe(true);
	});

	it("should render both page links on second page", () => {
		const wrapper = getWrapper({ perPage: 5, currentPage: 2, total: 40 });

		const btns = wrapper.findAllComponents(".pagination-link");
		expect(btns).toHaveLength(2);
	});

	it("emits update:current-page when next page link is clicked", async () => {
		const wrapper = getWrapper({
			perPage: 5,
			currentPage: 1,
			total: 40,
		});

		const nextPageLink = wrapper.get(".pagination-link");
		nextPageLink.trigger("click");
		expect(wrapper.emitted("update:current-page")).toStrictEqual([[2]]);
	});

	it("emits update:current-page when previous page link is clicked", () => {
		const wrapper = getWrapper({
			perPage: 5,
			currentPage: 2,
			total: 40,
		});
		const previousPageLink = wrapper.find(".pagination-link");
		previousPageLink.trigger("click");
		expect(wrapper.emitted("update:current-page")).toStrictEqual([[1]]);
	});

	it("emits update:per-page when new perPage value is selected", () => {
		const wrapper = getWrapper({
			perPage: 5,
		});
		const select = wrapper.findComponent({ name: "v-select" });
		select.vm.$emit("update:modelValue", { text: "", value: 10 });

		expect(wrapper.emitted("update:per-page")).toStrictEqual([[10]]);
	});
});
