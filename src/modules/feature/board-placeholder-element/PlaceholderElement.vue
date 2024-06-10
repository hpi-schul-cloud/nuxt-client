<template>
	<v-card
		class="mb-4"
		data-testid="board-external-tool-element"
		elevation="0"
		variant="outlined"
		ref="externalToolElement"
		:ripple="false"
		tabindex="0"
	>
		<ContentElementBar :has-grey-background="true" :icon="mdiPuzzleOutline">
			<template #title>
				{{ "Gelöscht: " + element.content.title }}
			</template>
			<template #description>
				{{ element.content.deletedType }}
			</template>
		</ContentElementBar>
	</v-card>
</template>

<script lang="ts">
import { PlaceholderElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { mdiPuzzleOutline } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { defineComponent, PropType, Ref, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	components: {
		ContentElementBar,
	},
	props: {
		element: {
			type: Object as PropType<PlaceholderElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const { t } = useI18n();
		useContentElementState(props, {
			autoSaveDebounce: 0,
		});

		const autofocus: Ref<boolean> = ref(false);
		const element: Ref<PlaceholderElementResponse> = toRef(props, "element");
		useBoardFocusHandler(element.value.id, ref(null), () => {
			autofocus.value = true;
		});

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveElementDown = () => {
			emit("move-down:edit");
		};

		const onMoveElementUp = () => {
			emit("move-up:edit");
		};

		const onDeleteElement = () => emit("delete:element", element.value.id);

		return {
			t,
			mdiPuzzleOutline,
			onMoveElementDown,
			onMoveElementUp,
			onKeydownArrow,
			onDeleteElement,
		};
	},
});
</script>
