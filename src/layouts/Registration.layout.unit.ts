import RegistrationLayout from "./Registration.layout.vue";
import Logo from "@/assets/img/logo/logo-image-mono.svg";
import TheFooter from "@/components/legacy/TheFooter.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";
import { VContainer, VMain, VToolbar } from "vuetify/components";

describe("Registration.layout", () => {
	const setup = (options?: Partial<{ windowWidth: number }>) => {
		Object.defineProperty(globalThis, "innerWidth", {
			writable: true,
			configurable: true,
			value: options?.windowWidth ?? 1280,
		});

		const slotContent = "<h1>Test Slot Content</h1>";
		const wrapper = mount(RegistrationLayout, {
			global: {
				plugins: [createTestingVuetify(), createTestingPinia()],
				stubs: { NavigationBar: true, TheFooter: true, ApplicationError: true, AlertContainer: true, VMain: true },
			},
			slots: {
				default: slotContent,
			},
		});

		return { wrapper, slotContent };
	};

	it("should render correctly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("topbar", () => {
		it("should render logo", () => {
			const { wrapper } = setup();
			const topbar = wrapper.findComponent(VToolbar);

			expect(topbar.exists()).toBe(true);
			expect(topbar.html()).toContain(Logo);
		});
	});

	describe("main content", () => {
		it("should render main landmark", () => {
			const { wrapper } = setup();
			const main = wrapper.findComponent({ name: "VMain" });

			expect(main.exists()).toBe(true);
		});

		it("should render slot content in main landmark", () => {
			const { wrapper, slotContent } = setup();
			const main = wrapper.findComponent({ name: "VMain" });

			expect(main.html()).toContain(slotContent);
		});

		it("should render in a smaller wrapper for small devices", async () => {
			const { wrapper } = setup({ windowWidth: 300 });
			await nextTick();
			const mainWrapper = wrapper.findComponent(VMain).findComponent(VContainer);

			const classes = mainWrapper.classes();

			expect(classes).toContain("main-container-sm");
		});

		it("should render in a normal wrapper for larger devices ", () => {
			const { wrapper } = setup({ windowWidth: 1280 });
			const mainWrapper = wrapper.findComponent(VMain).findComponent(VContainer);

			expect(mainWrapper.classes()).toContain("main-container");
			expect(mainWrapper.classes()).not.toContain("main-container-sm");
		});
	});

	describe("footer", () => {
		it("should render the footer component", () => {
			const { wrapper } = setup();
			const footer = wrapper.findComponent(TheFooter);

			expect(footer.exists()).toBe(true);
		});
	});
});
