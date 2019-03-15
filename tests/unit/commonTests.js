export function isValidComponent(component) {
	return [
		"exports a valid component",
		() => {
			expect(component).toBeAComponent();
		},
	];
}

export function rendersDefaultSlotContent(component, mountOptions) {
	return [
		"renders its default slot content",
		() => {
			const slotContent = "<p>Hello!</p>";
			const { element } = shallowMount(component, {
				...mountOptions,
				slots: {
					default: slotContent,
				},
			});
			expect(element.innerHTML).toContain(slotContent);
		},
	];
}
export default {
	isValidComponent,
	rendersDefaultSlotContent,
};
