import { shallowMount } from "@vue/test-utils";
import VideoDisplay from ".//VideoDisplay.vue";

describe("VideoDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const src = "test-source";
		const name = "test-name";
		const slotContent = "test-slot-content";
		const propsData = {
			src,
			name,
		};

		const wrapper = shallowMount(VideoDisplay, {
			attachTo: document.body,
			propsData,
			slots: {
				default: slotContent,
			},
		});

		return {
			wrapper,
			src,
			name,
		};
	};

	it("should render video element", () => {
		const { wrapper } = setup();

		const video = wrapper.find("video");
		expect(video.exists()).toBe(true);
	});

	it("should render video element with correct attributes", () => {
		const { wrapper, src, name } = setup();

		const video = wrapper.find("video");
		expect(video.attributes("src")).toBe(src);
		expect(video.attributes("alt")).toBe(name);
		expect(video.attributes("controls")).toBe("controls");
		expect(video.attributes("loading")).toBe("lazy");
	});

	it("should render with slot content", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain("test-slot-content");
	});
});
