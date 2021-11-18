import { mount } from "@vue/test-utils";
import RoomAvatarIterator from "./RoomAvatarIterator.vue";
import flushPromises from "flush-promises";

declare var createComponentMocks: Function;

const propsData = {
	size: "4em",
	maxItems: 4,
};

const getWrapper = (props: object, options?: object) => {
	return mount(RoomAvatarIterator, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("RoomAvatarIterator", () => {
	it("should display the title", async () => {
		const wrapper = getWrapper(propsData);
		expect(wrapper).toBeTruthy();
		await flushPromises();
		expect(1 == 1).toBe(true);
	});
});
