<template>
	<section>
		<VExpansionPanels :model-value="expanded" variant="accordion" mandatory>
			<VExpansionPanel elevation="0" :disabled="isPanelOneEmpty">
				<VExpansionPanelTitle data-testid="upperTaskSection" class="text-h4 font-weight-bold" @click="toggle">
					{{ panelOneTitle }} ({{ panelOneCount }})
				</VExpansionPanelTitle>
				<VExpansionPanelText>
					<slot name="panelOne" />
				</VExpansionPanelText>
			</VExpansionPanel>

			<VExpansionPanel elevation="0" :disabled="isPanelTwoEmpty">
				<VExpansionPanelTitle class="text-h4 font-weight-bold" data-testid="lowerTaskSection" @click="toggle">
					{{ panelTwoTitle }} ({{ panelTwoCount }})
				</VExpansionPanelTitle>
				<VExpansionPanelText>
					<slot name="panelTwo" />
				</VExpansionPanelText>
			</VExpansionPanel>
		</VExpansionPanels>
	</section>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

const props = withDefaults(
	defineProps<{
		panelOneCount: number;
		panelTwoCount: number;
		panelOneTitle: string;
		panelTwoTitle: string;
		expandedDefault?: 0 | 1;
	}>(),
	{
		expandedDefault: 0,
	}
);

const isPanelOneEmpty = computed(() => props.panelOneCount === 0);
const isPanelTwoEmpty = computed(() => props.panelTwoCount === 0);

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const expanded = ref<0 | 1>(props.expandedDefault);

watchEffect(() => {
	const bothEmpty = isPanelOneEmpty.value && isPanelTwoEmpty.value;
	const bothFilled = !isPanelOneEmpty.value && !isPanelTwoEmpty.value;

	if (bothEmpty || bothFilled) {
		expanded.value = props.expandedDefault;
	} else {
		expanded.value = isPanelOneEmpty.value ? 1 : 0;
	}
});

const toggle = () => {
	expanded.value = expanded.value === 0 ? 1 : 0;
};
</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
	padding: 0 0 8px 0;
}
</style>
