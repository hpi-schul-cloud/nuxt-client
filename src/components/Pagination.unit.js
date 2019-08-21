import Pagination from "./Pagination";

describe("@components/Pagination", () => {
	it(...isValidComponent(Pagination));

	it("Check that no previous page link is being rendered on first page", () => {
		const wrapper = shallowMount(Pagination, {
			propsData: {
				perPage: 5,
				currentPage: 1,
				total: 40,
			},
		});
		const currentPageAnchor = wrapper.find(".current");
		expect(currentPageAnchor.text()).toBe("1");
		expect(wrapper.findAll(".pagination-link-wrapper").length).toBe(2);
		expect(
			wrapper
				.findAll(".pagination-link-wrapper")
				.at(1)
				.text()
		).toBe("→");
	});

	it("Check that no next page link is being rendered on last page", () => {
		const wrapper = shallowMount(Pagination, {
			propsData: {
				perPage: 5,
				currentPage: 2,
				total: 10,
			},
		});
		const currentPageAnchor = wrapper.find(".current");
		expect(currentPageAnchor.text()).toBe("2");
		expect(wrapper.findAll(".pagination-link").length).toBe(2);
		expect(
			wrapper
				.findAll(".pagination-link")
				.at(0)
				.text()
		).toBe("←");
	});

	//TODO set up diffrent pages -> make sure current page is correct
	//TODO click next page
	//TODO click privouse page
	//TODO dont find link to next page on last page
	//TODO dont find link to pre page on first page
});
