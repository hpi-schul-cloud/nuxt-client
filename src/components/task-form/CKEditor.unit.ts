import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CKEditor from "@components/task-form/CKEditor.vue";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";

class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

describe("@components/task-form/CKEditor", () => {
	const getWrapper: any = (attrs = {}) => {
		const wrapper = mount(CKEditor, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		window.ResizeObserver = ResizeObserver;
	});

	it("should render component", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(CKEditor).exists()).toBe(true);
	});

	it("should not render with invalid mode property", () => {
		try {
			getWrapper({ propsData: { mode: "wrong_mode" } });
		} catch (e) {
			if (e instanceof Error) {
				expect(e.message).toContain("Invalid prop");
			}
			return;
		}
		fail("No error on invalid prop");
	});

	it("should have reduced toolbar items in simple mode", () => {
		const wrapper = getWrapper({ propsData: { mode: "simple" } });
		expect(wrapper.vm.config.toolbar.items).toHaveLength(3);
	});

	it("should have reduced plugins available in simple mode", () => {
		const wrapper = getWrapper({ propsData: { mode: "simple" } });
		expect(wrapper.vm.config.plugins).toHaveLength(5);
	});

	it("should have all toolbar items in regular mode", () => {
		const wrapper = getWrapper({ propsData: { mode: "regular" } });
		expect(wrapper.vm.config.toolbar.items).toHaveLength(23);
	});

	it("should have all plugins available in regular mode", () => {
		const wrapper = getWrapper({ propsData: { mode: "regular" } });
		expect(wrapper.vm.config.plugins).toHaveLength(20);
	});

	it("should emit input on content changes", async () => {
		const wrapper = getWrapper();

		const ck = wrapper.findComponent({
			ref: "ck",
		});

		await ck.vm.$emit("input");
		expect(wrapper.emitted("input")).toHaveLength(1);
	});
});
