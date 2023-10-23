<template>
	<v-card
		class="mb-4"
		data-testid="board-link-element"
		dense
		elevation="0"
		:outlined="true"
		ref="linkContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<LinkContentElementDisplay
			v-if="computedElement.content.url"
			:url="computedElement.content.url"
			:title="computedElement.content.title"
			:imageUrl="computedElement.content.imageUrl"
			:isLoading="isLoading"
			:isEditMode="isEditMode"
			><BoardMenu scope="element">
				<BoardMenuActionMoveUp @click="onMoveUp" />
				<BoardMenuActionMoveDown @click="onMoveDown" />
				<BoardMenuActionDelete @click="onDelete" />
			</BoardMenu>
		</LinkContentElementDisplay>
		<LinkContentElementCreate v-else @create:url="onCreateUrl" />
	</v-card>
</template>

<script lang="ts">
import { LinkElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { defineComponent, ref, toRef } from "vue";
import { PropType } from "vue/types/umd";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import { useMetaTagExtractorApi } from "../composables/MetaTagExtractorApi.composable";
import { ensureProtocolIncluded } from "../util/url.util";

export default defineComponent({
	name: "LinkElementContent",
	components: {
		LinkContentElementCreate,
		LinkContentElementDisplay,
		BoardMenu,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
		BoardMenuActionDelete,
	},
	props: {
		element: {
			type: Object as PropType<LinkElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-keyboard:edit",
		"move-down:edit",
		"move-up:edit",
	],
	setup(props, { emit }) {
		const linkContentElement = ref(null);
		const isLoading = ref(false);
		const element = toRef(props, "element");

		useBoardFocusHandler(element.value.id, linkContentElement);

		const { modelValue, computedElement } = useContentElementState(props, {
			autoSaveDebounce: 100,
		});

		const { getData } = useMetaTagExtractorApi(element.value.id);

		const onCreateUrl = async (originalUrl: string) => {
			isLoading.value = true;
			// WIP: handle invalid URL exception
			const validUrl = ensureProtocolIncluded(originalUrl);
			modelValue.value.url = validUrl;

			try {
				const { title, description, imageUrl } = await getData(validUrl);
				modelValue.value.title = title;
				modelValue.value.description = description;
				modelValue.value.imageUrl = imageUrl;
			} catch (error) {
				modelValue.value.url = "";
			}

			isLoading.value = false;
		};

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveDown = () => emit("move-down:edit");

		const onMoveUp = () => emit("move-up:edit");

		const onDelete = () => emit("delete:element", element.value.id);

		return {
			computedElement,
			isLoading,
			linkContentElement,
			modelValue,
			onCreateUrl,
			onKeydownArrow,
			onMoveDown,
			onMoveUp,
			onDelete,
		};
	},
});
</script>
../composables/imageUrlAccessor.composable
