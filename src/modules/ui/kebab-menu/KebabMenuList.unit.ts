import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { KebabMenuList } from "@ui-kebab-menu";
import { VList } from "vuetify/lib/components/index";

describe("KebabMenuList", () => {
	const setup = () => {
		const wrapper = mount(KebabMenuList, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			slots: {
				default:
					'<VListItem tabindex="-2" role="menuitem">Item 1</VListItem><VListItem tabindex="-2" role="menuitem">Item 2</VListItem>',
			},
		});

		return wrapper;
	};
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();

			expect(wrapper.exists()).toBe(true);
			expect(wrapper.findComponent(VList).exists()).toBe(true);
		});

		it("should have aria role menu", () => {
			const wrapper = setup();
			const menuList = wrapper.findComponent(VList);

			expect(menuList.attributes("role")).toBe("menu");
		});

		it("should focus the first menu item", () => {
			const wrapper = setup();
			const menuList = wrapper.findComponent(VList);

			// Note: We can't check document.activeElement here anymore because Vuetify's internal focus()
			// function changed and we don't want to mock vuetify internals
			const focusSpy = vi.spyOn(menuList.vm, "focus");

			vi.runAllTimers();

			expect(focusSpy).toHaveBeenCalledWith("first");
		});
	});
});
