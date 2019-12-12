import NavigationBar from "./NavigationBar";

describe("@components/NavigationBar", () => {
	it(...isValidComponent(NavigationBar));

	it("links get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "Projekt",
						href: "/about",
					},
					{
						title: "Mitmachen",
						href: "/community",
					},
					{
						title: "Blog",
						href: "https://blog.schul-cloud.org/",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});
		expect(wrapper.props().links).toHaveLength(3);
	});

	it("links get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "Projekt",
						href: "/about",
					},
					{
						title: "Mitmachen",
						href: "/community",
					},
					{
						title: "Blog",
						href: "https://blog.schul-cloud.org/",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});
		expect(wrapper.props().img).toBe("@assets/img/logo/logo-image-color.svg");
		expect(wrapper.find(".link-container").exists()).toBe(true);
	});
});
