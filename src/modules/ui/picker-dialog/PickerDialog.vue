<template>
	<VDialog :data-testid="dataTestId" width="360">
		<VCard>
			<VCardTitle class="text-h4 my-4 text-break"> Ansicht wählen </VCardTitle>
			<VCardText class="d-flex justify-center">
				<v-btn
					v-for="(item, key) in options"
					:key="key"
					variant="text"
					size="large"
					:height="85"
					:width="125"
					class=""
					:data-testid="item.dataTestId"
					@click.stop="item.action"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span>
							<v-icon size="x-large">{{ item.icon }}</v-icon>
						</span>
						<span class="subtitle">{{ $t(item.label) }}</span>
					</span>
				</v-btn>
			</VCardText>
			<VCardActions>
				<VBtn data-testid="dialog-close" @click="$emit('dialog-closed')">
					{{ $t("common.labels.close") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { PickerOption } from "./types";

defineProps({
	options: {
		type: Array as PropType<PickerOption[]>,
		required: true,
	},
	dataTestId: {
		type: String,
		default: "picker-dialog",
	},
});
</script>
<style lang=""></style>
