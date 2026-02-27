import CardTitle from "./CardTitle.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useBoardAllowedOperations } from "@data-board";
import { shallowMount } from "@vue/test-utils";
import { computed } from "vue";

const componentProps = {
	value: "props value",
	isFocused: true,
};

vi.mock("@data-board");
const mockedUseBoardAllowedOperations = vi.mocked(useBoardAllowedOperations);

describe("CardTitle", () => {
	const setup = (options: { isEditMode: boolean }) => {
		mockedUseBoardAllowedOperations.mockReturnValue({
			allowedOperations: computed(() => ({
				updateCardTitle: true,
			})),
		} as ReturnType<typeof useBoardAllowedOperations>);

		const wrapper = shallowMount(CardTitle, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: {
				...componentProps,
				isEditMode: options.isEditMode,
			},
			provide: {
				CARD_HOST_INTERACTION_EVENT: undefined,
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });
			expect(wrapper).toBeDefined();
		});

		it("should pass the value to its sub component", async () => {
			const { wrapper } = setup({ isEditMode: true });
			const anyTitleInput = wrapper.findComponent({
				name: "BoardAnyTitleInput",
			});
			expect(anyTitleInput.attributes("value")).toStrictEqual("props value");
		});

		it("should bubble enter event", async () => {
			const { wrapper } = setup({ isEditMode: true });
			const anyTitleInput = wrapper.findComponent({
				name: "BoardAnyTitleInput",
			});
			anyTitleInput.vm.$emit("enter");
			const emitted = wrapper.emitted();

			expect(emitted["enter"]).toHaveLength(1);
		});
	});
});
