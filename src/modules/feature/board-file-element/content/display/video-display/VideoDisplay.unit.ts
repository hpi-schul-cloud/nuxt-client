import { mount } from "@vue/test-utils";
import VideoDisplay from "./VideoDisplay.vue";

describe("VideoDisplay", () => {
	const setup = () => {
		const src = "test-source";
		const name = "test-name";
		const slotContent = "test-slot-content";
		const props = {
			src,
			name,
		};

		const wrapper = mount(VideoDisplay, {
			props,
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
		expect(video.attributes("aria-label")).toBe(name);
		expect(video.attributes("controls")).toBe("");
		expect(video.attributes("controlslist")).toBe("nodownload");
		expect(video.attributes("loading")).toBe("lazy");
	});

	it("should render with slot content", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain("test-slot-content");
	});

	describe("when video dispatches error event", () => {
		it("should emit error event", () => {
			const { wrapper } = setup();

			const video = wrapper.find("video");
			video.trigger("error");

			expect(wrapper.emitted("error")).toBeTruthy();
		});
	});
});
