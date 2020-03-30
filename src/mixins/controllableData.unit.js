import controllableData from "./controllableData";

describe("@mixins/controllableData", () => {
	it("throws an error if no props are passed", () => {
		expect(() => {
			controllableData();
		}).toThrow(new Error("props must be an array of string"));
	});
	it("throws an error if props are passed as object", () => {
		expect(() => {
			controllableData({
				prop1: {
					type: String,
					required: true,
				},
			});
		}).toThrow(new Error("props must be an array of string"));
	});
});
