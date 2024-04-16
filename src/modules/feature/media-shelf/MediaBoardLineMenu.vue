<template>
	<VBtn
		v-show="false"
		variant="text"
		:ripple="false"
		:icon="collapsed ? mdiChevronUp : mdiChevronDown"
		size="small"
		style="height: 36px; width: 36px"
		@click="collapsed = !collapsed"
		data-testid="collapse-line-btn"
	/>
	<VMenu location="bottom end" min-width="250">
		<template v-slot:activator="{ props }">
			<VBtn
				variant="text"
				:ripple="false"
				v-bind="props"
				icon
				@click.stop.prevent="() => {}"
				@dblclick.stop.prevent="() => {}"
				@keydown.enter.stop
				@keydown.left.right.up.down.stop="() => {}"
				size="small"
				style="height: 36px; width: 36px"
			>
				<VIcon class="text-grey-darken-2">
					{{ mdiDotsVertical }}
				</VIcon>
			</VBtn>
		</template>
		<VList>
			<VListItem
				@click="$emit('delete:line', lineId)"
				:prepend-icon="mdiTrashCanOutline"
				data-testid="action-delete-line"
			>
				<VListItemTitle>
					<span>{{ $t("common.actions.remove") }}</span>
				</VListItemTitle>
			</VListItem>
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import {
	mdiChevronDown,
	mdiChevronUp,
	mdiDotsVertical,
	mdiTrashCanOutline,
} from "@mdi/js";
import { ModelRef } from "vue";

const collapsed: ModelRef<boolean> = defineModel("collapsed", {
	type: Boolean,
	default: false,
});

defineProps({
	lineId: {
		type: String,
		required: true,
	},
});

defineEmits<{
	(e: "delete:line", lineId: string): void;
}>();
</script>

<style scoped lang="scss"></style>
