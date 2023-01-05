import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CKEditor from "@/components/task-form/CKEditor.vue";
import { mount } from "@vue/test-utils";

// TODO Promise rejection - CKEditorError: bo.window.ResizeObserver is not a constructor
describe("@/components/task-form/CKEditor", () => {
	const getWrapper: any = (attrs = {}) => {
		const wrapper = mount(CKEditor, {
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
	});

	it("should render component", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(CKEditor).exists()).toBe(true);
	});

	it("should not render with invalid mode property", () => {
		try {
			getWrapper({ propsData: { mode: "wrong_mode" } });
		} catch (e) {
			expect((e as Error).message.includes("Invalid prop")).toBeTruthy();
		}
	});

	it("should render ckeditor component", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent({ ref: "ck" }).exists()).toBe(true);
	});

	// TODO: find out how to mock a component and trigger an event by this mock
	// it("should emit input on content changes", async () => {
	// 	const wrapper = getWrapper();

	// 	const ck = wrapper.findComponent({
	// 		ref: "ck",
	// 	});

	// 	await ck.vm.$emit("input");
	// 	// await wrapper.vm.$emit("input");
	// 	await wrapper.vm.$nextTick();
	// 	const emitted = wrapper.emitted();

	// 	expect(emitted["input"]).toHaveLength(1);
	// });
});
