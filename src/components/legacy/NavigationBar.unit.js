import NavigationBar from "./NavigationBar";
import { envConfigModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";

const navbarLinks = [
	{
		title: "Blog",
		href: "https://blog.hpi-schul-cloud.de/",
	},
	{
		title: "Erste Schritte",
		href: "https://blog.hpi-schul-cloud.de/erste-schritte/",
	},
	{
		title: "FAQ",
		href: "https://blog.hpi-schul-cloud.de/faqs",
	},
];

const getWrapper = () => {
	return mount(NavigationBar, {
		...createComponentMocks({ i18n: true }),
		propsData: {
			links: navbarLinks,
			img: "@assets/img/logo/logo-dBildungscloud.svg",
			buttons: true,
		},
	});
};

describe("@components/legacy/NavigationBar", () => {
	beforeEach(() => {
		setupStores({
			"env-config": EnvConfigModule,
		});
	});

	it(...isValidComponent(NavigationBar));

	it("renders logo, links and buttons for default theme", () => {
		const wrapper = getWrapper();

		expect(wrapper.find(".logo.logo-full").exists()).toBe(true);
		expect(wrapper.find(".logo.logo-full").attributes("src")).toBe(
			wrapper.props().img
		);

		expect(wrapper.find(".link-container").exists()).toBe(true);
		expect(wrapper.vm.linksToDisplay).toHaveLength(3);

		expect(wrapper.find(".buttons-container").exists()).toBe(true);
		expect(wrapper.vm.hasButtons).toBe(true);
	});

	it.each(["n21", "brb", "int"])(
		"does render logo but not links and Buttons for %s theme",
		(theme) => {
			envConfigModule.setEnvs({ SC_THEME: theme });

			const wrapper = getWrapper();

			expect(wrapper.find(".logo.logo-full").exists()).toBe(true);
			expect(wrapper.find(".logo.logo-full").attributes("src")).toBe(
				wrapper.props().img
			);

			expect(wrapper.find(".link-container").exists()).toBe(false);
			expect(wrapper.vm.linksToDisplay).toHaveLength(0);

			expect(wrapper.find(".buttons-container").exists()).toBe(false);
			expect(wrapper.vm.hasButtons).toBe(false);
		}
	);
});
