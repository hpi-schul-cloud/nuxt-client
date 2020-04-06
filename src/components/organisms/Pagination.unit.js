import Pagination from "./Pagination";
import MultiSelect from "vue-multiselect";

function getFirstPageWrapper() {
	return shallowMount(Pagination, {
		propsData: {
			perPage: 5,
			currentPage: 1,
			total: 40,
		},
	});
}

function getLastPageWrapper() {
	return shallowMount(Pagination, {
		propsData: {
			perPage: 5,
			currentPage: 2,
			total: 10,
		},
	});
}

describe("@components/organisms/Pagination", () => {
	it.skip(...isValidComponent(Pagination));

	it.skip("does not render a previous page link on first page", () => {
		const wrapper = getFirstPageWrapper();

		const currentPageAnchor = wrapper.find(".current");
		expect(currentPageAnchor.text()).toBe("1");
		expect(wrapper.findAll(".pagination-link-wrapper")).toHaveLength(2);
		expect(wrapper.findAll(".pagination-link-wrapper").at(1).text()).toBe(
			"keyboard_arrow_right"
		);
	});

	it.skip("does not render a next page link on last page", () => {
		const wrapper = getLastPageWrapper();
		const currentPageAnchor = wrapper.find(".current");
		expect(currentPageAnchor.text()).toBe("2");
		expect(wrapper.findAll(".pagination-link")).toHaveLength(2);
		expect(wrapper.findAll(".pagination-link").at(0).text()).toBe(
			"keyboard_arrow_left"
		);
	});

	it.skip("emits update:current-page when next page link is clicked", () => {
		const wrapper = getFirstPageWrapper();
		const nextPageLink = wrapper.findAll(".pagination-link").at(1);
		nextPageLink.trigger("click");
		expect(wrapper.emitted()["update:current-page"]).toStrictEqual([[2]]);
	});

	it.skip("emits update:current-page when previous page link is clicked", () => {
		const wrapper = getLastPageWrapper();
		const previousPageLink = wrapper.find(".pagination-link");
		previousPageLink.trigger("click");
		expect(wrapper.emitted()["update:current-page"]).toStrictEqual([[1]]);
	});

	it.skip("emits update:per-page when new perPage value is selected", () => {
		const wrapper = mount(Pagination, {
			propsData: {
				perPage: 5,
			},
		});

		const perPageSelect = wrapper.find(MultiSelect);
		const secondOption = perPageSelect.vm.options[2];
		perPageSelect.vm.select(secondOption);
		expect(wrapper.emitted()["update:per-page"]).toStrictEqual([
			[secondOption.value],
		]);
	});
});
