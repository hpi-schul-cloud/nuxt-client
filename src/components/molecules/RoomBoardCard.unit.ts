import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RoomBoardCard from "./RoomBoardCard.vue";

describe("RoomBoardCard", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(RoomBoardCard as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
		});
	};
	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(RoomBoardCard).exists()).toBe(true);
		});
	});
});
