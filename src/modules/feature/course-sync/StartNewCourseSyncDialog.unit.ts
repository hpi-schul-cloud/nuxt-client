import { groupResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import GroupSelectionDialog from "./GroupSelectionDialog.vue";
import StartNewCourseSyncDialog from "./StartNewCourseSyncDialog.vue";

describe("StartNewCourseSyncDialog", () => {
	const getWrapper = (
		props: ComponentProps<typeof StartNewCourseSyncDialog> = { isOpen: true }
	) => {
		const wrapper = shallowMount(StartNewCourseSyncDialog, {
			global: {
				plugins: [createTestingI18n()],
			},
			props,
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when the dialog is open", () => {
		it("should open the group dialog", () => {
			const { wrapper } = getWrapper({ isOpen: true });

			const dialog = wrapper.getComponent(GroupSelectionDialog);

			expect(dialog.props().isOpen).toEqual(true);
		});
	});

	describe("when the dialog is closed", () => {
		it("should close the group dialog", () => {
			const { wrapper } = getWrapper({ isOpen: false });

			const dialog = wrapper.getComponent(GroupSelectionDialog);

			expect(dialog.props().isOpen).toEqual(false);
		});
	});

	describe("when confirming the group dialog", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			Object.defineProperty(window, "location", {
				configurable: true,
				value: { assign: vi.fn() },
			});

			const group = groupResponseFactory.build();

			return {
				wrapper,
				group,
			};
		};

		it("should redirect to the course creation", async () => {
			const { wrapper, group } = setup();

			wrapper.getComponent(GroupSelectionDialog).vm.$emit("confirm", group);
			await nextTick();

			expect(window.location.assign).toHaveBeenCalledWith(
				`/courses/add?syncedGroupId=${group.id}`
			);
		});
	});

	describe("when cancel the group dialog", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const group = groupResponseFactory.build();

			return {
				wrapper,
				group,
			};
		};

		it("should be closed", async () => {
			const { wrapper } = setup();

			const dialog = wrapper.getComponent(GroupSelectionDialog);

			dialog.vm.$emit("cancel");
			await nextTick();

			expect(dialog.props().isOpen).toBe(false);
		});
	});
});
