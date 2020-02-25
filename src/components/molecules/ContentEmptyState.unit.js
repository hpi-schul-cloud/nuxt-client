import ContentEmptyState from "./ContentEmptyState";

describe("@components/ContentEmptyState", () => {
	it(...isValidComponent(ContentEmptyState));

	// eslint-disable-next-line jest/no-commented-out-tests
	// it("Renders svg image", () => {
	// 	const wrapper = shallowMount(ContentEmptyState, {
	// 		...createComponentMocks({ i18n: true }),
	// 		data: () => ({
	// 			emptyStateSVGs: ["/empty-state/emptyStateSvg_lehrer1.svg"],
	// 		}),
	// 	});
	// 	expect(wrapper.find(".empty-state-container__image").attributes().src).toBe(
	// 		"/empty-state/emptyStateSvg_lehrer1.svg"
	// 	);
	// });
});
