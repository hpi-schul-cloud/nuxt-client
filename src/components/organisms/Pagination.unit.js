import Pagination from "./Pagination";

function getFirstPageWrapper() {
	return shallowMount(Pagination, {
		...createComponentMocks({ i18n: true }),
		propsData: {
			perPage: 5,
			currentPage: 1,
			total: 40,
		},
	});
}

function getLastPageWrapper() {
	return shallowMount(Pagination, {
		...createComponentMocks({ i18n: true }),
		propsData: {
			perPage: 5,
			currentPage: 2,
			total: 10,
		},
	});
}

describe("@/components/organisms/Pagination", () => {
	it("renders only a next page link on the first page", () => {
		const wrapper = getFirstPageWrapper();
		expect(wrapper.findAll(".pagination-link")).toHaveLength(1);
		expect(
			wrapper.get(".pagination-link base-icon-stub").attributes("icon")
		).toBe("keyboard_arrow_right");
	});

	it("renders only a previous page link on the last page", () => {
		const wrapper = getLastPageWrapper();

		expect(wrapper.findAll(".pagination-link")).toHaveLength(1);
		expect(
			wrapper.get(".pagination-link base-icon-stub").attributes("icon")
		).toBe("keyboard_arrow_left");
	});

	it("emits update:current-page when next page link is clicked", async () => {
		const wrapper = mount(Pagination, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				perPage: 5,
				currentPage: 1,
				total: 40,
			},
		});
		const nextPageLink = wrapper.get(".pagination-link");
		nextPageLink.trigger("click");
		expect(wrapper.emitted("update:current-page")).toStrictEqual([[2]]);
	});

	it("emits update:current-page when previous page link is clicked", () => {
		const wrapper = mount(Pagination, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				perPage: 5,
				currentPage: 2,
				total: 40,
			},
		});
		const previousPageLink = wrapper.find(".pagination-link");
		previousPageLink.trigger("click");
		expect(wrapper.emitted("update:current-page")).toStrictEqual([[1]]);
	});

	it("emits update:per-page when new perPage value is selected", () => {
		const wrapper = shallowMount(Pagination, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				perPage: 5,
			},
		});
		const secondOption = wrapper.vm.perPageOptions[2].value;
		wrapper.vm.setPagination(secondOption);
		expect(wrapper.emitted("update:per-page")).toStrictEqual([
			[secondOption.value],
		]);
	});
});
