<template>
	<VBtn
		v-show="true"
		variant="text"
		:ripple="false"
		:icon="collapsed ? mdiChevronDown : mdiChevronUp"
		size="small"
		style="height: 36px; width: 36px"
		data-testid="collapse-line-btn"
		@click="collapsed = !collapsed"
	/>
	<KebabMenu data-testid="line-menu-btn">
		<VListItem
			v-if="lineId"
			:prepend-icon="mdiRenameOutline"
			data-testid="action-update-line-title"
			@click="$emit('rename-title', lineId)"
		>
			<VListItemTitle>
				<span>{{ $t("common.actions.rename") }}</span>
			</VListItemTitle>
		</VListItem>
		<SvsColorPickerMenu v-model:color="color" />
		<VListItem
			v-if="lineId"
			:prepend-icon="mdiTrashCanOutline"
			data-testid="action-delete-line"
			@click="$emit('delete:line', lineId)"
		>
			<VListItemTitle>
				<span>{{ $t("common.actions.delete") }}</span>
			</VListItemTitle>
		</VListItem>
	</KebabMenu>
</template>

<script setup lang="ts">
import { Colors } from "@api-server";
import { mdiChevronDown, mdiChevronUp, mdiRenameOutline, mdiTrashCanOutline } from "@icons/material";
import { SvsColorPickerMenu } from "@ui-color-picker";
import { KebabMenu } from "@ui-kebab-menu";
import { ModelRef, PropType } from "vue";

defineProps({
	lineId: {
		type: String,
		required: false,
		default: undefined,
	},
});

const collapsed: ModelRef<boolean> = defineModel("collapsed", {
	type: Boolean,
	default: false,
});

const color: ModelRef<Colors> = defineModel("color", {
	type: String as PropType<Colors>,
	default: Colors.TRANSPARENT,
});

defineEmits<{
	(e: "delete:line", lineId: string): void;
	(e: "rename-title", lineId: string): void;
}>();
</script>

<style scoped>
:deep(.v-color-picker-swatches__color) {
	border: 1px solid lightgray;
}
</style>
