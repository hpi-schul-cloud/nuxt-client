import { MaskInputOptions, vMaska } from "maska";
import { DirectiveFunction } from "vue";

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
	// DirectiveFunction type is necessary to ensure compatibility with defineComponent()-Syntax in vue 2.7
	// going forward with Vue3 we should be able to use Directive<HTMLElement> type
	const bindMaska: DirectiveFunction = (el, binding, vNode, oldVnode) => {
		const newBinding = { ...binding, arg: options as string };
		(vMaska as DirectiveFunction)(el, newBinding, vNode, oldVnode);
	};

	return bindMaska;
};
