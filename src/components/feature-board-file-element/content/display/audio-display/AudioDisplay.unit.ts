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

	it("should render audio element with src", () => {
		const { wrapper, src } = setup();

		const audio = wrapper.find("audio");
		expect(audio.attributes("src")).toBe(src);
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

			expect(wrapper.emitted("error")).toBeTruthy();
		});
	});
});
