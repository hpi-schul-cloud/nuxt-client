import RegistrationLayout from "./Registration.layout.vue";
import Logo from "@/assets/img/logo/logo-image-mono.svg";
import NavigationBar from "@/components/legacy/NavigationBar.vue";
import TheFooter from "@/components/legacy/TheFooter.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("Registration.layout", () => {
	const setup = (options?: Partial<{ windowWidth: number }>) => {
		Object.defineProperty(globalThis, "innerWidth", {
			value: options?.windowWidth ?? 1280,
		});

		const slotContent = "<h1>Test Slot Content</h1>";
		const wrapper = mount(RegistrationLayout, {
			global: {
				plugins: [createTestingVuetify()],
				stubs: { NavigationBar: true, TheFooter: true },
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
		it("should render navigation bar with logo", () => {
			const { wrapper } = setup();
			const navigationBar = wrapper.findComponent(NavigationBar);

			expect(navigationBar.exists()).toBe(true);
			expect(navigationBar.props("img")).toBe(Logo);
		});

		it("should not render buttons in NavigationBar", () => {
			const { wrapper } = setup();
			const navigationBar = wrapper.findComponent(NavigationBar);

			expect(navigationBar.props().hideButtons).toBe(true);
		});

		it("renders inside a header landmark", () => {
			const { wrapper } = setup();
			const header = wrapper.find('[data-testid="registration-layout-top-bar"]');
			const navigationBar = header.findComponent(NavigationBar);

			expect(navigationBar.exists()).toBe(true);
		});
	});

	describe("main content", () => {
		it("should render main landmark", () => {
			const { wrapper } = setup();
			const main = wrapper.find("main");

			expect(main.exists()).toBe(true);
		});

		it("should render slot content in main landmark", () => {
			const { wrapper, slotContent } = setup();
			const main = wrapper.find("main");

			expect(main.html()).toContain(slotContent);
		});

		it("should render in a smaller wrapper for extra small devices", () => {
			const { wrapper } = setup({ windowWidth: 500 });
			const mainWrapper = wrapper.find("main");

			expect(mainWrapper.classes()).toContain("small-wrapper");
			expect(mainWrapper.classes()).not.toContain("wrapper");
		});

		it("should render in a normal wrapper for devices larger than extra small", () => {
			const { wrapper } = setup({ windowWidth: 1280 });
			const mainWrapper = wrapper.find("main");

			expect(mainWrapper.classes()).toContain("wrapper");
			expect(mainWrapper.classes()).not.toContain("small-wrapper");
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
