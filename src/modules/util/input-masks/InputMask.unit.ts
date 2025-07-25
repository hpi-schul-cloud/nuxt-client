import { createInputMask } from "./InputMask.factory";
import { DirectiveBinding, FunctionDirective, VNode } from "vue";
import { vMaska, MaskInputOptions } from "maska";

vi.mock("maska");

const maskaDirectiveMock = {
	element: {} as unknown as HTMLElement,
	binding: {} as unknown as DirectiveBinding<unknown>,
	vnode: {} as unknown as VNode,
	oldVnode: {} as unknown as VNode,
};

describe("InputMask.factory", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should bind maska when directive function is called", () => {
		const mockedMaska = vMaska;

		const directive: FunctionDirective = createInputMask({ mask: "" });
		directive(
			maskaDirectiveMock.element,
			maskaDirectiveMock.binding,
			maskaDirectiveMock.vnode,
			maskaDirectiveMock.oldVnode
		);
		expect(mockedMaska).toHaveBeenCalledTimes(1);
	});

	it("should pass MaskInputOptions to maska as part of DirectiveBinding param", () => {
		const mockedMaska = vMaska;

		const options: MaskInputOptions = { mask: "##-##" };

		const directive: FunctionDirective = createInputMask(options);
		directive(
			maskaDirectiveMock.element,
			maskaDirectiveMock.binding,
			maskaDirectiveMock.vnode,
			maskaDirectiveMock.oldVnode
		);
		expect(mockedMaska).toHaveBeenCalledWith({}, { arg: options }, {}, {});
	});
});
