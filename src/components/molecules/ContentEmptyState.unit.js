import ContentEmptyState from "./ContentEmptyState";

describe("@components/ContentEmptyState", () => {
	it(...isValidComponent(ContentEmptyState));

	it("Renders svg image", () => {
		const wrapper = shallowMount(ContentEmptyState, {
			mocks: {
				$t: (msg) => msg,
			},
			data: () => ({
				emptyStateSVGs: ["/empty-state/emptyStateSvg_lehrer1.svg"],
			}),
		});
		expect(wrapper.find(".empty-state-container__image").attributes().src).toBe(
			"/empty-state/emptyStateSvg_lehrer1.svg"
		);
	});
});
