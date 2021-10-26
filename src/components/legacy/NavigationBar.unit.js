import NavigationBar from "./NavigationBar";
import BaseLink from "@components/base/BaseLink";

describe("@components/legacy/NavigationBar", () => {
	const navbarLinks = [
		{
			title: "Blog",
			href: "https://blog.hpi-schul-cloud.de/",
		},
		{
			title: "layouts.loggedoutFullWidth.steps",
			href: "https://blog.hpi-schul-cloud.de/erste-schritte/",
		},
		{
			title: "FAQ",
			href: "https://blog.hpi-schul-cloud.de/faqs",
		},
	];

	it(...isValidComponent(NavigationBar));

	it("links get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: navbarLinks,
				img: "@assets/img/logo/logo-dBildungscloud.svg",
				buttons: true,
			},
		});

		expect(wrapper.props().links).toHaveLength(4);
	});

	it("logo get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: navbarLinks,
				img: "@assets/img/logo/logo-dBildungscloud.svg",
				buttons: true,
			},
		});

		expect(wrapper.findComponent(BaseLink).exists()).toBe(true);
		expect(wrapper.props().img).toBe(
			"@assets/img/logo/logo-dBildungscloud.svg"
		);
		expect(wrapper.find(".link-container").exists()).toBe(true);
		expect(wrapper.find(".buttons-container").exists()).toBe(true);
	});
});
