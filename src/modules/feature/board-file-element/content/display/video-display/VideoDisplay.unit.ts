import VideoDisplay from "./VideoDisplay.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("VideoDisplay", () => {
	const setup = (options?: { showMenu?: boolean }) => {
		const src = "test-source";
		const name = "test-name";
		const slotContent = "test-slot-content";
		const props = {
			src,
			name,
			showMenu: options?.showMenu ?? true,
		};

		const wrapper = mount(VideoDisplay, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props,
			slots: {
				default: slotContent,
			},
		});

		return {
			wrapper,
			src,
			name,
			slotContent,
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

	it("should render with slot content if showMenu is true", () => {
		const { wrapper, slotContent } = setup({ showMenu: true });

		expect(wrapper.text()).toContain(slotContent);
	});

	it("should not render with slot content if showMenu is false", () => {
		const { wrapper, slotContent } = setup({ showMenu: false });

		expect(wrapper.text()).not.toContain(slotContent);
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
