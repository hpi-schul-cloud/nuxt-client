import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Editor from "@/components/molecules/Editor.vue";
import { provide } from "vue";
import { shallowMount } from "@vue/test-utils";

describe("@/components/molecules/Editor", () => {
	const getWrapper: any = (attrs = {}) => {
		const wrapper = shallowMount(Editor, {
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
	});

	it("should render component", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(Editor).exists()).toBe(true);
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
