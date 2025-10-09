import { computed, Ref, WritableComputedRef } from "vue";

export const useCollapsableState = (expansionPanelValue: string, collapsed: Ref<boolean>) => {
	const openItems: WritableComputedRef<string[]> = computed({
		get(): string[] {
			return collapsed.value ? [] : [expansionPanelValue];
		},
		set(value: string[]): void {
			collapsed.value = !value.includes(expansionPanelValue);
		},
	});

	return {
		openItems,
	};
};
