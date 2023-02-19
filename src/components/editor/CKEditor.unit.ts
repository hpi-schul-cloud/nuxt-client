import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CkEditor from "@/components/editor/CKEditor.vue";
import { mount } from "@vue/test-utils";

class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

describe("@/components/editor/CKEditor", () => {
	const getWrapper: any = (attrs = {}) => {
		const wrapper = mount(CkEditor, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				i18n: { t: (key: string) => key },
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
		expect(wrapper.findComponent(CkEditor).exists()).toBe(true);
	});

	it("should not render with invalid mode property", () => {
		try {
			getWrapper({ propsData: { mode: "wrong_mode" } });
		} catch (e) {
			expect((e as Error).message.includes("Invalid prop")).toBeTruthy();
		}
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
		expect(wrapper.vm.config.toolbar.items).toHaveLength(24);
	});

	it("should have all plugins available in regular mode", () => {
		const wrapper = getWrapper({ propsData: { mode: "regular" } });
		expect(wrapper.vm.config.plugins).toHaveLength(21);
	});

	it("should emit input on content changes", async () => {
		const wrapper = getWrapper();

		const ck = wrapper.findComponent({
			ref: "ck",
		});
		ck.vm.$emit("input");
		await wrapper.vm.$nextTick();

		const emitted = wrapper.emitted();
		expect(emitted["input"]).toHaveLength(1);
	});

	it("should emit focus on editor focus", async () => {
		const wrapper = getWrapper();

		const ck = wrapper.findComponent({
			ref: "ck",
		});
		ck.vm.$emit("focus");
		await wrapper.vm.$nextTick();

		const emitted = wrapper.emitted();
		expect(emitted["focus"]).toHaveLength(1);
	});

	it("should emit delayed blur on editor blur", async () => {
		jest.useFakeTimers();
		const wrapper = getWrapper();

		const ck = wrapper.findComponent({
			ref: "ck",
		});
		ck.vm.$emit("blur");
		jest.advanceTimersByTime(200);

		const emitted = wrapper.emitted();
		expect(emitted["blur"]).toHaveLength(1);
	});
});
