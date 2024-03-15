import { ConfigResponse, SchulcloudTheme } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import NavigationBar from "./NavigationBar.vue";

const navbarLinks = [
	{
		title: "global.topbar.loggedOut.actions.blog",
		href: "https://blog.hpi-schul-cloud.de/",
	},
	{
		title: "global.topbar.loggedOut.actions.steps",
		href: "https://blog.hpi-schul-cloud.de/erste-schritte/",
	},
	{
		title: "global.topbar.loggedOut.actions.faq",
		href: "https://blog.hpi-schul-cloud.de/faqs",
	},
];

const getWrapper = () => {
	const img = "@/assets/img/logo/logo-dBildungscloud.svg";
	const wrapper = mount(NavigationBar, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			stubs: ["base-link"],
		},
		props: {
			links: navbarLinks,
			img,
			buttons: true,
		},
	});

	return { wrapper, img };
};

describe("@/components/legacy/NavigationBar", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	it("renders logo, links and buttons for default theme", () => {
		envConfigModule.setEnvs({
			SC_THEME: SchulcloudTheme.Default,
		} as ConfigResponse);
		const { wrapper, img } = getWrapper();

		expect(wrapper.find(".logo.logo-full").exists()).toBe(true);
		expect(wrapper.find(".logo.logo-full").attributes("src")).toBe(img);

		expect(wrapper.find(".link-container").exists()).toBe(true);
		expect(wrapper.vm.linksToDisplay).toHaveLength(3);

		expect(wrapper.find(".buttons-container").exists()).toBe(true);
		expect(wrapper.vm.hasButtons).toBe(true);
	});

	it.each([SchulcloudTheme.N21, SchulcloudTheme.Brb])(
		"does render logo but not links and Buttons for %s theme",
		(theme) => {
			envConfigModule.setEnvs({ SC_THEME: theme } as ConfigResponse);
			const { wrapper, img } = getWrapper();

			expect(wrapper.find(".logo.logo-full").exists()).toBe(true);
			expect(wrapper.find(".logo.logo-full").attributes("src")).toBe(img);

			expect(wrapper.find(".link-container").exists()).toBe(false);
			expect(wrapper.vm.linksToDisplay).toHaveLength(0);

			expect(wrapper.find(".buttons-container").exists()).toBe(false);
			expect(wrapper.vm.hasButtons).toBe(false);
		}
	);
});
