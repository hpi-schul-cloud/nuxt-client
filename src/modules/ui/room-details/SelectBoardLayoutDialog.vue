<template>
	<VDialog :data-testid="dataTestId" width="360">
		<VCard>
			<VCardTitle class="text-h4 text-break px-6 pt-4">
				{{ title }}
			</VCardTitle>
			<VCardText class="d-flex justify-center">
				<v-btn
					v-for="(item, key) in options"
					:key="key"
					variant="text"
					size="large"
					:height="85"
					:width="125"
					:data-testid="item.dataTestId"
					@click.stop="item.action"
				>
					<span class="d-flex flex-column justify-center button-max-width">
						<span>
							<v-icon size="x-large">{{ item.icon }}</v-icon>
						</span>
						<span class="subtitle mt-1">{{ $t(item.label) }}</span>
					</span>
				</v-btn>
			</VCardText>
			<VCardActions class="mb-2 px-6">
				<VBtn
					data-testid="dialog-close"
					variant="outlined"
					@click="$emit('dialog-closed')"
				>
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
	title: {
		type: String,
		required: true,
	},
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

<style>
.button-max-width {
	max-width: 100px;
}
</style>
