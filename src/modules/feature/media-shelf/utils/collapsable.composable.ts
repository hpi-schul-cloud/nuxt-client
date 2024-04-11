import { computed, ref, Ref, WritableComputedRef } from "vue";

export const useCollapsableState = (expansionPanelValue: string) => {
	const collapsed: Ref<boolean> = ref(false);

	const openItems: WritableComputedRef<string[]> = computed({
		get(): string[] {
			return collapsed.value ? [] : [expansionPanelValue];
		},
		set(value: string[]): void {
			collapsed.value = value.includes(expansionPanelValue);
		},
	});

	return {
		collapsed,
		openItems,
	};
};
