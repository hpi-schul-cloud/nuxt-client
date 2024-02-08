<template>
	<BoardColumnHeader
		:columnId="columnId"
		:title="title"
		:titlePlaceholder="titlePlaceholder"
		:canEdit="hasEditPermission"
		@update:title="$emit('update:title', $event)"
		class="pl-2"
	>
		<template #menu>
			<BoardMenu v-if="hasDeletePermission" scope="column">
				<BoardMenuActionEdit v-if="!isEditMode" @click="onStartEditMode" />
				<BoardMenuActionMoveLeft @click="$emit('move:column-left', $event)" />
				<BoardMenuActionMoveRight @click="$emit('move:column-right', $event)" />
				<BoardMenuActionDelete
					:name="title"
					@click="$emit('delete:column', $event)"
				/>
			</BoardMenu>
		</template>
	</BoardColumnHeader>
</template>

<script setup lang="ts">
import { useBoardPermissions, useEditMode } from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionEdit,
	BoardMenuActionMoveLeft,
	BoardMenuActionMoveRight,
} from "@ui-board";
import { toRef } from "vue";
import BoardColumnHeader from "./BoardColumnHeader.vue";

const props = defineProps({
	columnId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	titlePlaceholder: {
		type: String,
		required: true,
	},
});
defineEmits<{
	(e: "update:title", value: unknown): void;
	(e: "move:column-left", value: unknown): void;
	(e: "move:column-right", value: unknown): void;
	(e: "delete:column", value: unknown): void;
}>();

const columnId = toRef(props, "columnId");

const { isEditMode, startEditMode } = useEditMode(columnId.value);

const { hasEditPermission, hasDeletePermission } = useBoardPermissions();

const onStartEditMode = () => {
	if (!hasEditPermission) return;
	startEditMode();
};
</script>

<style scoped lang="scss"></style>
