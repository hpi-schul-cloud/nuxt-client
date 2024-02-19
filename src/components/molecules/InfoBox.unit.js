import InfoBox from "./InfoBox";

describe("@/components/molecules/InfoBox", () => {
	it(
		...rendersSlotContent(InfoBox, ["header", "body", "actions"], {
			...createComponentMocks({ i18n: true }),
			propsData: {
				active: true,
			},
		})
	);
});