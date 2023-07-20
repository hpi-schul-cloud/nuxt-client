import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardTitle from "./CardTitle.vue";

const componentProps = {
	value: "props value",
	isFocused: true,
};

describe(CardTitle.name, () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardTitle as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				...componentProps,
				isEditMode: options.isEditMode,
			},
			provide: {
				CARD_HOST_INTERACTION_EVENT: undefined,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ isEditMode: false });
			expect(wrapper).toBeDefined();
		});

		it("should pass the value to its sub component", async () => {
			setup({ isEditMode: true });
			const anyTitleInput = wrapper.findComponent({
				name: "BoardAnyTitleInput",
			});
			expect(anyTitleInput.attributes("value")).toStrictEqual("props value");
		});

		it("should bubble enter event", async () => {
			setup({ isEditMode: true });
			const anyTitleInput = wrapper.findComponent({
				name: "BoardAnyTitleInput",
			});
			anyTitleInput.vm.$emit("enter");
			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});
	});
});
