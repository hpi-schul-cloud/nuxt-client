import type { MaskInputOptions } from "maska";
import { vMaska } from "maska";
import { FunctionDirective } from "vue";

/**
 *  Creates a Maska-Directive from a given maska-configuration.
 *
 *  **Usage**
 *  ```ts
 *  const myGermanIsoDateMask = createInputMask({mask: '##.##.####'})
 *  ```
 *
 *  @see https://beholdr.github.io/maska/#/?id=maskinput-options
 */
export const createInputMask = (options: MaskInputOptions) => {
	const bindMaska: FunctionDirective<HTMLElement> = (el, binding, vNode, oldVnode) => {
		const newBinding = { ...binding, arg: options as string };
		(vMaska as FunctionDirective<HTMLElement>)(el, newBinding, vNode, oldVnode);
	};

	return bindMaska;
};
