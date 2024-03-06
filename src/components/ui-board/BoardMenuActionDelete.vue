<template>
	<BoardMenuAction
		:icon="mdiTrashCanOutline"
		@click="onClick"
		dataTestId="board-menu-action-delete"
	>
		{{ $t("components.board.action.delete") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { MENU_SCOPE } from "./injection-tokens";
import { injectStrict } from "@/utils/inject";
import { mdiTrashCanOutline } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { defineComponent } from "vue";
import { BoardMenuScope } from "./board-menu-scope";

export default defineComponent({
	name: "BoardMenuActionDelete",
	props: {
		name: { type: String, required: false },
		skipDeleteConfirmation: { type: Boolean, default: () => false },
	},
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(props, { emit }) {
		const scope = injectStrict<BoardMenuScope>(MENU_SCOPE);
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const getLanguageKeyTypeName = (scope: string) => {
			switch (scope) {
				case "column":
					return "components.boardColumn";
				case "card":
					return "components.boardCard";
				case "element":
					return "components.boardElement";
				default:
					return "components.board";
			}
		};

		const onClick = (): void => {
			const promise = askDeleteConfirmation(
				props.name,
				getLanguageKeyTypeName(scope)
			);

			emit("click", promise);
		};

		return {
			onClick,
			mdiTrashCanOutline,
		};
	},
});
</script>
