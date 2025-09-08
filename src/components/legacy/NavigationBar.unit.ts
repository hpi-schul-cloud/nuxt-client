import { SchulcloudTheme } from "@/serverApi/v3";
import { createTestEnvStore, envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import NavigationBar from "./NavigationBar.vue";
import { beforeAll } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEnvStore } from "@data-env";

describe("@/components/legacy/NavigationBar", () => {
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

	it("renders logo, links and buttons for default theme", () => {
		createTestEnvStore({ SC_THEME: SchulcloudTheme.Default });

		const { wrapper, img } = getWrapper();

		const wrapperVm = wrapper.vm as unknown as typeof NavigationBar;

		expect(wrapper.find(".logo.logo-full").exists()).toBe(true);
		expect(wrapper.find(".logo.logo-full").attributes("src")).toBe(img);

		expect(wrapper.find(".link-container").exists()).toBe(true);
		expect(wrapperVm.linksToDisplay).toHaveLength(3);

		expect(wrapper.find(".buttons-container").exists()).toBe(true);
		expect(wrapperVm.hasButtons).toBe(true);
	});

	it.each([SchulcloudTheme.N21, SchulcloudTheme.Brb])(
		"does render logo but not links and Buttons for %s theme",
		(theme) => {
			createTestEnvStore({ SC_THEME: theme });

			const { wrapper, img } = getWrapper();
			const wrapperVm = wrapper.vm as unknown as typeof NavigationBar;

			expect(wrapper.find(".logo.logo-full").exists()).toBe(true);
			expect(wrapper.find(".logo.logo-full").attributes("src")).toBe(img);

			expect(wrapper.find(".link-container").exists()).toBe(false);
			expect(wrapperVm.linksToDisplay).toHaveLength(0);

			expect(wrapper.find(".buttons-container").exists()).toBe(false);
			expect(wrapperVm.hasButtons).toBe(false);
		}
	);
});
