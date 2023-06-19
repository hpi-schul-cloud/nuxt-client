<template>
	<div ref="fileContentElement" tabindex="0" @keydown.up.down="onKeydownArrow">
		<v-list flat class="py-0">
			<v-list-item :href="url" download>
				<v-list-item-icon class="mr-2">
					<v-icon>{{ mdiFileDocumentOutline }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title style="color: var(--v-primary-base)">{{
						fileName
					}}</v-list-item-title>
				</v-list-item-content>

				<v-list-item-icon>
					<BoardMenu scope="element">
						<BoardMenuAction
							v-if="hasMultipleElements && !isFirstElement"
							@click="onMoveElementUp"
						>
							<VIcon>
								{{ mdiArrowCollapseUp }}
							</VIcon>
							{{ $t("components.board.action.moveUp") }}
						</BoardMenuAction>
						<BoardMenuAction
							v-if="hasMultipleElements && !isLastElement"
							@click="onMoveElementDown"
						>
							<VIcon>
								{{ mdiArrowCollapseDown }}
							</VIcon>
							{{ $t("components.board.action.moveDown") }}
						</BoardMenuAction>
						<BoardMenuAction>
							<VIcon>
								{{ mdiTrashCanOutline }}
							</VIcon>
							{{ $t("components.board.action.delete") }}
						</BoardMenuAction>
					</BoardMenu>
				</v-list-item-icon>
			</v-list-item>
		</v-list>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import {
	mdiAlertCircle,
	mdiArrowCollapseUp,
	mdiArrowCollapseDown,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { BoardMenu, BoardMenuAction },
	props: {
		fileId: {
			type: String,
			required: true,
		},
		fileName: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"update:caption",
		"move-down:element",
		"move-up:element",
		"move-keyboard:element",
	],
	setup(props, { emit }) {
		const fileContentElement = ref(undefined);
		useBoardFocusHandler(props.fileId, fileContentElement);
		const onKeydownArrow = (event: KeyboardEvent) => {
			event.preventDefault();
			emit("move-keyboard:element", event);
		};

		const onMoveElementDown = async () => {
			emit("move-down:element");
		};

		const onMoveElementUp = async () => {
			emit("move-up:element");
		};

		return {
			fileContentElement,
			mdiAlertCircle,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			onKeydownArrow,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
