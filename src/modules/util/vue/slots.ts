import { Slot, VNode } from "vue";

/**
 *
 * check if slot is providing actual content
 * (helps to check this in a compact, reusable way - see example)
 *
 * @param slot Slot
 * @returns boolean
 *
 * 	```html
 * 	<div :class="{ 'mr-10': hasSlotContent($slots.menu) }">
 *		<slot name="menu" />
 *  </div>
 *  ```
 */

export const hasSlotContent = (slot: Slot | undefined, props = {}) => slot && !isSlotEmpty(slot, props);

function isSlotEmpty(slot: Slot | undefined, props = {}): boolean {
	return slot !== undefined && isVNodeEmpty(slot?.(props));
}

function isVNodeEmpty(vNode: VNode | VNode[]) {
	if (!vNode) return true;

	const vNodes = asArray(vNode);
	if (vNodes.every((vnode) => vnode.type === Comment)) return true;
	if (vNodes.length === 0) return true;
	if (vNodes.length === 1) {
		if (vNodes[0].children === null) return true;
		if (vNodes[0].children.length === 0) return true;
	}
	return false;
}

function asArray(arg: unknown) {
	if (Array.isArray(arg)) return arg;
	return arg !== null ? [arg] : [];
}
