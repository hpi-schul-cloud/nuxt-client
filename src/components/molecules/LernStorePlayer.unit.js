import LernStorePlayer from "./LernStorePlayer";
import { Resource } from "@@/tests/test-utils/mockDataResource";

const testPropsResource = {
	resource: Resource,
};

describe("@/components/molecules/LernStorePlayer", () => {
	const wrapper = shallowMount(LernStorePlayer, {
		...createComponentMocks({
			i18n: true,
			$route: {
				query: {
					id: "mockId",
				},
			},
		}),
		propsData: { ...testPropsResource },
	});

	it("Renders spinner", () => {
		expect(wrapper.find(".d-flex, .justify-center, .align-center, .min-height-screen").exists()).toBe(true);
	});

	it("Renders not the h5p Iframe", () => {
		LernStorePlayer.getPlayer;
		expect(wrapper.find(".player-iframe").exists()).toBe(false);
	});

});
