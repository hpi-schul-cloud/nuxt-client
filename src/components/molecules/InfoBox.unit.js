import InfoBox from "./InfoBox";

describe("@components/molecules/InfoBox", () => {
	it(...isValidComponent(InfoBox));
	it(
		...rendersSlotContent(InfoBox, ["header", "body", "actions"], {
			propsData: {
				active: true,
			},
		})
	);
});
