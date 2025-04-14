<template>
	<v-card
		ref="audioRecordContentElement"
		class="board-audio-record-element-card mb-4"
		data-testid="board-audio-record-element"
		dense
		elevation="0"
		variant="outlined"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<AudioRecordContent
			v-if="audioRecordProperties"
			:audio-record-properties="audioRecordProperties"
			:is-edit-mode="isEditMode"
			@update:alternative-text="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
		>
			<BoardMenu
				v-if="isEditMode"
				:scope="BoardMenuScope.AUDIO_RECORD_ELEMENT"
				has-background
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					scope-language-key="components.cardElement.audioRecordElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</AudioRecordContent>
	</v-card>
</template>

<script lang="ts">
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	mdiMicrophone,
	mdiPause,
	mdiPlay,
	mdiPlaySpeed,
	mdiStop,
} from "@icons/material";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { computed, defineComponent, PropType, ref, toRef } from "vue";

import { AudioRecordElementResponse } from "../../../../serverApi/v3";

import AudioRecordContent from "./content/AudioRecordContent.vue";

export default defineComponent({
	name: "AudioRecordContentElement",
	components: {
		AudioRecordContent,
		BoardMenu,
		KebabMenuActionMoveUp,
		KebabMenuActionMoveDown,
		KebabMenuActionDelete,
	},
	props: {
		element: {
			type: Object as PropType<AudioRecordElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
		isNotFirstElement: { type: Boolean, requried: false },
		isNotLastElement: { type: Boolean, requried: false },
		columnIndex: { type: Number, required: true },
		rowIndex: { type: Number, required: true },
		elementIndex: { type: Number, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const audioRecordContentElement = ref(null);

		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, audioRecordContentElement);

		const { modelValue } = useContentElementState(props);

		const audioRecordProperties = computed(() => {
			return {
				element: props.element,
			};
		});

		// watch(element.value, async () => {});

		// onMounted(async () => {});

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onUpdateAlternativeText = (value: string) => {
			modelValue.value.alternativeText = value;
		};

		const onUpdateCaption = (value: string) => {
			modelValue.value.caption = value;
		};

		const onDelete = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element", element.value.id);
			}
		};
		const onStop = () => emit("move-up:edit");

		const onMoveUp = () => emit("move-up:edit");
		const onMoveDown = () => emit("move-down:edit");

		return {
			audioRecordContentElement,
			audioRecordProperties,
			onKeydownArrow,
			onUpdateAlternativeText,
			onUpdateCaption,
			onDelete,
			onMoveUp,
			onMoveDown,
			mdiPlay,
			mdiPause,
			mdiPlaySpeed,
			mdiMicrophone,
			mdiStop,
		};
	},
	computed: {
		BoardMenuScope() {
			return BoardMenuScope;
		},
	},
});
</script>
<style lang="scss" scoped>
/* show focus indicatator properly on all browsers */
.board-audio-record-element-card:focus {
	outline-offset: 1px;
}
</style>
