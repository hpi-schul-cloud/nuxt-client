import BaseAudio from "./BaseAudio";

describe("@components/BaseAudio", () => {
	it(...isValidComponent(BaseAudio));
	it("renders src", () => {
		const { element } = shallowMount(BaseAudio, {
			propsData: {
				src: "https://podcast.hpi.de/media/2019-03-05_neuland_ep05.mp3",
			},
		});
		expect(element.innerHTML).toContain(
			"https://podcast.hpi.de/media/2019-03-05_neuland_ep05.mp3"
		);
	});
	it("renders all types", () => {
		const { element } = shallowMount(BaseAudio, {
			propsData: {
				src: [
					"https://podcast.hpi.de/media/2019-03-05_neuland_ep05.mp3",
					"https://podcast.hpi.de/media/2019-03-05_neuland_ep05.ogg",
					"https://podcast.hpi.de/media/2019-03-05_neuland_ep05.wav",
				],
			},
		});
		expect(element.innerHTML).toContain("audio/mpeg");
		expect(element.innerHTML).toContain("audio/ogg");
		expect(element.innerHTML).toContain("audio/wav");
	});
});
