<template>
	<div class="rich-text-edit">
		<div class="cursor-text">
			<ck-editor
				v-model="modelValue"
				@focus="onFocus"
				:placeholder="
					$t('components.cardElement.richTextElement.placeholder').toString()
				"
				mode="simple"
			/>
		</div>

		<div class="board-menu">
			<BoardMenu scope="element">
				<BoardMenuAction>
					<VIcon>
						{{ mdiArrowCollapseUp }}
					</VIcon>
					{{ $t("components.board.action.moveUp") }}
				</BoardMenuAction>
				<BoardMenuAction>
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
		</div>
	</div>
</template>
<script lang="ts">
import CkEditor from "@/components/editor/CKEditor.vue";
import { useEventListener, useVModel } from "@vueuse/core";
import { computed, defineComponent } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import {
	mdiArrowCollapseUp,
	mdiArrowCollapseDown,
	mdiTrashCanOutline,
} from "@mdi/js";

export default defineComponent({
	name: "RichTextContentElementEdit",
	components: { CkEditor, BoardMenu, BoardMenuAction },
	props: {
		value: {
			type: String,
			required: true,
		},
		autofocus: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:value"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);

		const onFocus = () => {
			const elements = computed(() =>
				document.getElementsByClassName("ck-balloon-panel")
			);

			for (const element of elements.value) {
				useEventListener(element, "click", (event: PointerEvent) => {
					event.stopPropagation();
				});
			}
		};

		return {
			modelValue,
			onFocus,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
		};
	},
});
</script>
<style scoped>
.rich-text-edit {
	position: relative;
}
.cursor-text {
	cursor: text;
}
.board-menu {
	position: absolute;
	top: 10px;
	right: -11px;
	z-index: 1;
}
</style>
