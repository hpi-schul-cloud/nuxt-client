import { mount } from "@vue/test-utils";
import AudioDisplay from "./AudioDisplay.vue";

describe("AudioDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const src = "test-source";
		const slotContent = "test-slot-content";
		const propsData = {
			src,
		};

		const wrapper = mount(AudioDisplay, {
			attachTo: document.body,
			propsData,
			slots: {
				default: slotContent,
			},
		});

		return {
			wrapper,
			src,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const audioDisplayElement = wrapper.findComponent(AudioDisplay);
		expect(audioDisplayElement.exists()).toBe(true);
	});

	it("should have an audio element", () => {
		const { wrapper } = setup();

		const audio = wrapper.find("audio");
		expect(audio.exists()).toBe(true);
	});

	it("should have a play button ", () => {
		const { wrapper } = setup();

		const playButton = wrapper.find("v-btn");
		expect(playButton.exists()).toBe(true);
	});

	it("should have a play icon when audio is not playing", () => {
		const { wrapper } = setup();

		const playButton = wrapper.find("v-btn");
		const playIcon = wrapper.find("v-icon");

		wrapper.vm.$nextTick(() => {
			expect(playButton.attributes("aria-label")).toBe("Play");
			expect(playIcon.text()).toBe("mdiPlay");
		});
	});

	it("should have a pause icon when audio is playing", () => {
		const { wrapper } = setup();

		const playButton = wrapper.find("v-btn");
		const playIcon = wrapper.find("v-icon");

		wrapper.vm.$nextTick(() => {
			expect(playButton.attributes("aria-label")).toBe("Pause");
			expect(playIcon.text()).toBe("mdiPause");
		});
	});

	it("should render speed menu component", async () => {
		const { wrapper } = setup();

		const speedMenu = wrapper.findComponent({ name: "SpeedMenu" });
		expect(speedMenu.exists()).toBe(true);
	});

	it("should render speed menu component with correct props", async () => {
		const { wrapper } = setup();

		const speedMenu = wrapper.findComponent({ name: "SpeedMenu" });
		wrapper.vm.$nextTick(() => {
			expect(speedMenu.props("speed")).toBe(1);
		});
	});

	it("should render content element bar component correctly", () => {
		const { wrapper } = setup();

		const contentElementBar = wrapper.findComponent({
			name: "ContentElementBar",
		});
		expect(contentElementBar.exists()).toBe(true);
	});

	it("should render audio element with src", () => {
		const { wrapper, src } = setup();

		const audio = wrapper.find("audio");
		wrapper.vm.$nextTick(() => {
			expect(audio.attributes("src")).toBe(src);
		});
	});

	it("should display duration correctly", () => {
		const { wrapper } = setup();

		const duration = wrapper.find(".duration");
		wrapper.vm.$nextTick(() => {
			expect(duration.text()).toBe("00:00");
		});
	});

	it("should display audio slider correctly", () => {
		const { wrapper } = setup();

		const audioSlider = wrapper.findComponent({ name: "VSlider" });
		wrapper.vm.$nextTick(() => {
			expect(audioSlider.exists()).toBe(true);
		});
	});

	it("should display rate correctly", () => {
		const { wrapper } = setup();

		const rate = wrapper.find(".rate");
		wrapper.vm.$nextTick(() => {
			expect(rate.text()).toBe("1.0x");
		});
	});

	it("should render slot content", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain("test-slot-content");
	});

	describe("when audio dispatches error event", () => {
		it("should emit error event", () => {
			const { wrapper } = setup();
			const audio = wrapper.find("audio");

			audio.trigger("error");
			wrapper.vm.$nextTick(() => {
				expect(wrapper.emitted("error")).toBeTruthy();
			});
		});
	});
});
