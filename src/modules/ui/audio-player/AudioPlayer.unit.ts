import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { mdiPause, mdiPlay } from "@icons/material";
import { mount } from "@vue/test-utils";
import { useMediaControls } from "@vueuse/core";
import { nextTick, ref } from "vue";
import AudioPlayer from "./AudioPlayer.vue";

vi.mock("@vueuse/core", () => {
	const original = vi.requireActual("@vueuse/core");

	return {
		...original,
		useMediaControls: vi.fn(),
	};
});

describe("AudioPlayer", () => {
	describe("when audio is not playing", () => {
		const setup = () => {
			const src = "test-source";
			const props = { src };

			const currentTimeRef = ref(0);
			const durationRef = ref(50);
			const rateRef = ref(1);
			const playingRef = ref(false);
			const onSourceErrorMock = vi.fn();

			const useMediaControlsMock = createMock<
				ReturnType<typeof useMediaControls>
			>({
				playing: playingRef,
				currentTime: currentTimeRef,
				duration: durationRef,
				rate: rateRef,
				onSourceError: onSourceErrorMock,
			});
			vi.mocked(useMediaControls).mockReturnValue(useMediaControlsMock);

			const wrapper = mount(AudioPlayer, {
				props,
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});

			const contentElementBar = wrapper.findComponent({
				name: "ContentElementBar",
			});

			return {
				wrapper,
				src,
				currentTimeRef,
				durationRef,
				playingRef,
				rateRef,
				contentElementBar,
				onSourceErrorMock,
			};
		};

		it("should call onSourceError", () => {
			const { onSourceErrorMock } = setup();

			expect(onSourceErrorMock).toHaveBeenCalled();
		});

		it("should render audio element with lazy prop", () => {
			const { wrapper } = setup();

			const audio = wrapper.find("audio");

			expect(audio.attributes("loading")).toBe("lazy");
		});

		it("should pass duration to v-slider", () => {
			const { wrapper, durationRef } = setup();

			const slider = wrapper.findComponent({ name: "v-slider" });

			expect(slider.props("max")).toBe(durationRef.value);
		});

		it("should pass currentTime to v-slider", () => {
			const { wrapper, currentTimeRef } = setup();

			const slider = wrapper.findComponent({ name: "v-slider" });

			expect(slider.props("modelValue")).toBe(currentTimeRef.value);
		});

		it("should have an accessible play button", () => {
			const { wrapper } = setup();

			const playButton = wrapper.findComponent({ name: "v-btn" });
			const playIcon = wrapper.findComponent({ name: "v-icon" });

			expect(playButton.attributes("aria-label")).toBe(
				"components.audioPlayer.play"
			);
			expect(playIcon.html()).toContain(mdiPlay);
		});

		it("should display duration", () => {
			const { wrapper } = setup();

			const duration = wrapper.find(".duration");
			expect(duration.text()).toBe("00:00 / 00:50");
		});

		describe("when play button is clicked", () => {
			it("playing should be set to true", async () => {
				const { wrapper, playingRef } = setup();

				const playButton = wrapper.findComponent({ name: "v-btn" });

				playButton.trigger("click");

				await nextTick();

				expect(playingRef.value).toBe(true);
			});
		});

		describe("when duration slider emits input", () => {
			it("should set current time", async () => {
				const { wrapper, currentTimeRef } = setup();

				const audioSlider = wrapper.findComponent({ name: "v-slider" });

				audioSlider.setValue(10);

				await nextTick();

				expect(currentTimeRef.value).toBe(10);
			});
		});

		it("should render speed menu component with correct props", async () => {
			const { wrapper, rateRef } = setup();

			const speedMenu = wrapper.findComponent({ name: "SpeedMenu" });
			expect(speedMenu.props("rate")).toBe(rateRef.value);
		});

		describe("when speed menu emits speedChange", () => {
			it("should set rate to new value", async () => {
				const { wrapper, rateRef } = setup();

				const newRateValue = 2;
				const speedMenu = wrapper.findComponent({ name: "SpeedMenu" });
				speedMenu.vm.$emit("updateRate", newRateValue);

				await nextTick();

				expect(rateRef.value).toBe(newRateValue);
			});
		});
	});

	describe("when audio is playing", () => {
		const setup = () => {
			const src = "test-source";
			const props = { src };

			const currentTimeRef = ref(5);
			const durationRef = ref(50);
			const rateRef = ref(1);
			const playingRef = ref(true);

			const useMediaControlsMock = createMock<
				ReturnType<typeof useMediaControls>
			>({
				playing: playingRef,
				currentTime: currentTimeRef,
				duration: durationRef,
				rate: rateRef,
			});
			vi.mocked(useMediaControls).mockReturnValue(useMediaControlsMock);

			const wrapper = mount(AudioPlayer, {
				props,
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			});

			return {
				wrapper,
				src,
				currentTimeRef,
				durationRef,
				playingRef,
				rateRef,
			};
		};

		it("should display duration", () => {
			const { wrapper } = setup();

			const duration = wrapper.find(".duration");
			expect(duration.text()).toBe("00:05 / 00:50");
		});

		it("should have an accessible pause button", () => {
			const { wrapper } = setup();

			const playButton = wrapper.findComponent({ name: "v-btn" });
			const playIcon = wrapper.findComponent({ name: "v-icon" });

			expect(playButton.attributes("aria-label")).toBe(
				"components.audioPlayer.pause"
			);
			expect(playIcon.html()).toContain(mdiPause);
		});

		describe("when play button is clicked", () => {
			it("playing should be set to false", async () => {
				const { wrapper, playingRef } = setup();

				const playButton = wrapper.findComponent({ name: "v-btn" });
				playButton.trigger("click");

				await nextTick();

				expect(playingRef.value).toBe(false);
			});
		});
	});
});
