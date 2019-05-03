import BaseVideo from "./BaseVideo";

describe("@components/BaseVideo", () => {
	it(...isValidComponent(BaseVideo));

	it("video player get's rendered", () => {
		const wrapper = mount(BaseVideo, {
			...createComponentMocks({ stubs: { "video-player": true } }),
			propsData: {
				configuration: {
					streams: [
						{
							sd:
								"https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/sd/video.mp4",
						},
					],
					initialState: { playState: "PAUSED" },
					videoPreload: false,
				},
			},
		});
		expect(wrapper.element.nodeName).toBe("VIDEO-PLAYER-STUB");
	});
});
