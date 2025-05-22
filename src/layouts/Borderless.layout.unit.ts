import AlertContainer from "@/components/molecules/AlertContainer.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { AutoLogoutWarning } from "@feature-auto-logout";
import { createTestingPinia } from "@pinia/testing";
import { SkipLink } from "@ui-skip-link";
import { shallowMount } from "@vue/test-utils";
import { KeepAlive } from "vue";
import { RouterView } from "vue-router";
import { VMain } from "vuetify/lib/components/index.mjs";
import BorderlessLayout from "./Borderless.layout.vue";

describe("BorderlessLayout", () => {
	const getWrapper = () => {
		const wrapper = shallowMount(BorderlessLayout, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia(),
				],
			},
		});

		return {
			wrapper,
		};
	};

	describe("VMain", () => {
		it("should render VMain", () => {
			const { wrapper } = getWrapper();

			const vMain = wrapper.findComponent(VMain);

			expect(vMain.exists()).toBe(true);
		});
	});

	describe("SkipLink", () => {
		it("should render SkipLink", () => {
			const { wrapper } = getWrapper();

			const skipLink = wrapper.findComponent(SkipLink);

			expect(skipLink.exists()).toBe(true);
		});
	});

	describe("ApplicationErrorWrapper", () => {
		it("should render ApplicationErrorWrapper", () => {
			const { wrapper } = getWrapper();

			const skipLink = wrapper.findComponent(ApplicationErrorWrapper);

			expect(skipLink.exists()).toBe(true);
		});
	});

	describe("RouterView", () => {
		it("should render RouterView", () => {
			const { wrapper } = getWrapper();

			const skipLink = wrapper.findComponent(RouterView);

			expect(skipLink.exists()).toBe(true);
		});
	});

	describe("AlertContainer", () => {
		it("should render AlertContainer", () => {
			const { wrapper } = getWrapper();

			const skipLink = wrapper.findComponent(AlertContainer);

			expect(skipLink.exists()).toBe(true);
		});
	});

	describe("AutoLogoutWarning", () => {
		it("should render AutoLogoutWarning inside of KeepAlive", () => {
			const { wrapper } = getWrapper();

			const autoLogoutWarning = wrapper
				.findComponent(KeepAlive)
				.findComponent(AutoLogoutWarning);

			expect(autoLogoutWarning.exists()).toBe(true);
		});
	});
});
