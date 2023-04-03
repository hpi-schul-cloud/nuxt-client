<template>
	<InlineEditInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div class="mb-4">
			<div class="py-2 d-flex align-start justify-space-between">
				<BoardAnyTitleInput
					:value="title"
					scope="column"
					:isEditMode="isEditMode"
					:placeholder="''"
					@update:value="onUpdateTitle"
				></BoardAnyTitleInput>
				<div class="pt-2">
					<BoardMenu scope="column">
						<BoardMenuAction> Delete Column </BoardMenuAction>
					</BoardMenu>
				</div>
			</div>
			<VDivider color="black"></VDivider>
		</div>
	</InlineEditInteractionHandler>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";

export default defineComponent({
	name: "BoardColumnHeader",
	components: {
		BoardMenu,
		BoardAnyTitleInput,
		BoardMenuAction,
		InlineEditInteractionHandler,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	emits: ["update:title"],
	setup(props, { emit }) {
		const isEditMode = ref<boolean>(false);

		const onStartEditMode = () => {
			isEditMode.value = true;
		};
		const onEndEditMode = () => {
			isEditMode.value = true;
		};

		const onUpdateTitle = (newTitle: string) => {
			emit("update:title", newTitle);
		};
		return { isEditMode, onStartEditMode, onEndEditMode, onUpdateTitle };
	},
});
</script>
