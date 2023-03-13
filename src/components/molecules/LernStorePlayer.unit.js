import LernStorePlayer from "./LernStorePlayer";
import { Resource } from "@@/tests/test-utils/mockDataResource";

const testProps = {
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
		propsData: { ...testProps },
	});

	it("Renders h5p Iframe", () => {
		expect(wrapper.find(".player-iframe").exists()).toBe(true);
	});

});
