import { useForceRender } from "./fixSamePositionDnD.composable";

describe("fixSamePositionDnD", () => {
	it("should add 'id' to the list", () => {
		const { getRenderKey } = useForceRender("test-id-#1");
		getRenderKey();
		expect(getRenderKey()).toBe(1);
	});

	it('should increase the render key when "generateRenderKey" is called', () => {
		const { generateRenderKey, getRenderKey } = useForceRender("test-id-#1");
		expect(getRenderKey()).toBe(1);
		generateRenderKey();
		expect(getRenderKey()).toBe(2);
	});
});
