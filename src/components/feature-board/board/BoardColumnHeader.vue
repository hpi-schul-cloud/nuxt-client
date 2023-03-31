<template>
	<InlineEditInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div class="mb-4" style="border-bottom: 1px solid black">
			<div class="py-2 d-flex align-start justify-space-between">
				<BoardAnyTitleInput
					:value="title"
					scope="column"
					:isEditMode="isEditMode"
					:placeholder="''"
				></BoardAnyTitleInput>
				<BoardMenu scope="column">
					<BoardMenuAction> Delete Column </BoardMenuAction>
				</BoardMenu>
			</div>
		</div>
	</InlineEditInteractionHandler>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
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
	setup() {
		const isEditMode = ref<boolean>(false);

		const onStartEditMode = () => {
			isEditMode.value = true;
		};
		const onEndEditMode = () => {
			isEditMode.value = true;
		};
		return { isEditMode, onStartEditMode, onEndEditMode };
	},
});
</script>
