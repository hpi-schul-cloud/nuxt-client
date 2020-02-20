import BaseVideo from "./BaseVideo";

const getVideoplayer = (props) => {
	return shallowMount(BaseVideo, {
		propsData: props,
	});
};

describe("@components/BaseVideo", () => {
	it(...isValidComponent(BaseVideo));

	it("renders sources", () => {
		const mockVideos = [{ src: "http://mock/video.mp4", type: "video/mp4" }];
		const wrapper = getVideoplayer({
			sources: mockVideos,
		});
		mockVideos.forEach((video) => {
			expect(wrapper.find(`[src="${video.src}"]`).exists()).toBe(true);
		});
	});

	it("renders tracks", () => {
		const mockVideos = [{ src: "http://mock/video.mp4", type: "video/mp4" }];
		const mockTracks = [
			{
				src: "subtitles_en.vtt",
				kind: "subtitles",
				srclang: "en",
				label: "English",
			},
		];
		const wrapper = getVideoplayer({
			sources: mockVideos,
			tracks: mockTracks,
		});
		mockVideos.forEach((track) => {
			expect(wrapper.find(`[src="${track.src}"]`).exists()).toBe(true);
		});
	});

	it("renders with default controls", () => {
		const mockVideos = [{ src: "http://mock/video.mp4", type: "video/mp4" }];
		const wrapper = getVideoplayer({
			sources: mockVideos,
		});
		expect(wrapper.contains(`video[controls]`)).toBe(true);
	});

	it("can render without controls", () => {
		const mockVideos = [{ src: "http://mock/video.mp4", type: "video/mp4" }];
		const wrapper = getVideoplayer({
			sources: mockVideos,
			noControls: true,
		});
		expect(wrapper.contains("video[controls]")).toBe(false);
	});
});
