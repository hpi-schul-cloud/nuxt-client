import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import RoomCardChip from "@/components/rooms/RoomCardChip.vue";
import { mdiAlert } from "@mdi/js";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";

describe("RoomCardChip", () => {
	const getWrapper = () => {
		document.body.setAttribute("data-app", "true");
		const slotContent = "Slot Content";
		const wrapper: Wrapper<any> = shallowMount(
			RoomCardChip as MountOptions<Vue>,
			{
				...createComponentMocks({}),
				slots: { default: slotContent },
			}
		);

		return {
			wrapper,
			slotContent,
		};
	};

	describe("when room card chips is used", () => {
		it("should render the room card chip", () => {
			const { wrapper } = getWrapper();

			const chip = wrapper.find("v-chip-stub");

			expect(chip.exists()).toBeTruthy();
		});

		it("should contain an mdiAlert icon", () => {
			const { wrapper } = getWrapper();

			const icon = wrapper.find("v-icon-stub");

			expect(icon.exists()).toBeTruthy();
			expect(icon.attributes("color")).toBe("warning");
			expect(icon.text()).toBe(mdiAlert);
		});

		it("should render content passed in the default slot", () => {
			const { wrapper, slotContent } = getWrapper();

			const text = wrapper.text();

			expect(text).toContain(slotContent);
		});
	});
});
