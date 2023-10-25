import { createInputMask } from "@/components/util-input-masks/InputMask.factory";
import { DirectiveBinding, DirectiveFunction } from "vue";
import { vMaska, MaskInputOptions } from "maska";
import { VNode } from "vue/types/umd";

jest.mock("maska");

describe("InputMask.factory", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should bind maska when directive function is called", () => {
		const mockedMaska = vMaska;

		const directive: DirectiveFunction = createInputMask({ mask: "" });
		directive(
			{} as unknown as HTMLElement,
			{} as unknown as DirectiveBinding<unknown>,
			{} as unknown as VNode,
			{} as unknown as VNode
		);
		expect(mockedMaska).toHaveBeenCalledTimes(1);
	});

	it("should pass MaskInputOptions to maska as part of DirectiveBinding param", () => {
		const mockedMaska = vMaska;

		const options: MaskInputOptions = { mask: "##-##" };

		const directive: DirectiveFunction = createInputMask(options);
		directive(
			{} as unknown as HTMLElement,
			{} as unknown as DirectiveBinding<unknown>,
			{} as unknown as VNode,
			{} as unknown as VNode
		);
		expect(mockedMaska).toHaveBeenCalledWith({}, { arg: options }, {}, {});
	});
});
