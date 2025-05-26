import { createTestingI18n } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import AudioDisplay from "./AudioDisplay.vue";

describe("AudioDisplay", () => {
	const setup = (options?: { showMenu?: boolean }) => {
		const src = "test-source";
		const slotContent = "test-slot-content";
		const props = {
			src,
			showMenu: options?.showMenu ?? true,
		};

		const wrapper = mount(AudioDisplay, {
			props,
			slots: {
				default: slotContent,
			},
			global: { plugins: [createTestingI18n()] },
		});

		const contentElementBar = wrapper.findComponent({
			name: "ContentElementBar",
		});

		return {
			wrapper,
			src,
			contentElementBar,
		};
	};

	it("should render AudioPlayer with correct src", () => {
		const { wrapper, src } = setup();

		const audioPlayer = wrapper.findComponent({ name: "AudioPlayer" });
		expect(audioPlayer.exists()).toBe(true);
		expect(audioPlayer.props("src")).toBe(src);
	});

	it("should emit error from AudioPlayer", () => {
		const { wrapper } = setup();
		const audioPlayer = wrapper.findComponent({ name: "AudioPlayer" });
		const error = new Error("Test error");

		audioPlayer.vm.$emit("error", error);

		expect(wrapper.emitted("error")).toBeTruthy();
		expect(wrapper.emitted("error")?.at(0)).toEqual([error]);
	});

	it("should render slot content if showMenu is true", () => {
		const { wrapper } = setup({ showMenu: true });

		expect(wrapper.text()).toContain("test-slot-content");
	});

	it("should render slot content if showMenu is false", () => {
		const { wrapper } = setup({ showMenu: false });

		expect(wrapper.text()).not.toContain("test-slot-content");
	});
});
