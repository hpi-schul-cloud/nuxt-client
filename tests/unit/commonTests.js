export function isValidComponent(component) {
	return [
		"exports a valid component",
		() => {
			expect(component).toBeAComponent();
		},
	];
}

export function rendersSlotContent(
	component,
	slotNames = ["default"],
	mountOptions
) {
	return [
		"renders his slot(s) content(s)",
		() => {
			slotNames.forEach((slotName) => {
				const slots = {};
				slots[slotName] = `<p>Slot-${slotName}</p>`;
				const { element } = shallowMount(component, {
					...mountOptions,
					slots,
				});
				expect(element.innerHTML).toContain(slots[slotName]);
			});
		},
	];
}

export default {
	isValidComponent,
	rendersSlotContent,
};
