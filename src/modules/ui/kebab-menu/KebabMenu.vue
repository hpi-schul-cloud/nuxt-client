<template>
	<VMenu
		v-if="hasSlotContent($slots.default)"
		location="bottom end"
		min-width="250"
	>
		<template #activator="{ props }">
			<VBtn
				v-bind="props"
				v-bind.attr="$attrs"
				variant="text"
				:ripple="false"
				:icon="mdiDotsVertical"
				@click.stop.prevent
				@dblclick.stop.prevent
				@keydown.enter.stop
				@keydown.space.stop
				@keydown.left.right.up.down.stop
			/>
		</template>
		<KebabMenuList> <slot /> </KebabMenuList>
	</VMenu>
</template>

<script setup lang="ts">
import type { Slot, VNode } from "vue";
import { Comment, Fragment } from "vue";
import { mdiDotsVertical } from "@icons/material";
import { KebabMenuList } from "@ui-kebab-menu";

const isVnodeEmpty = (vnodes: Array<VNode>) => {
	return vnodes.every((node: VNode) => {
		if (node.type === Fragment && isVnodeEmpty(node.children as Array<VNode>)) {
			return true;
		}

		if (node.type === Comment) {
			return true;
		}

		if (
			node.type === Text &&
			typeof node.children === "string" &&
			!node.children.trim()
		) {
			return true;
		}

		return false;
	});
};

const hasSlotContent = (slot: Slot | undefined) => {
	if (!slot) {
		return false;
	}
	return !isVnodeEmpty(slot());
};
</script>
