<template>
	<div :id="element.id" tabindex="0" ref="linkContentElement">
		<v-card
			class="mb-4"
			:class="{ 'd-none': isHidden }"
			data-testid="board-link-element"
			:variant="outlined"
			:ripple="false"
			@keydown.up.down="onKeydownArrow"
			@keydown.stop
			:aria-label="ariaLabel"
			:href="sanitizedUrl"
			target="_blank"
			:loading="isLoading ? 'primary' : false"
		>
			<LinkContentElementDisplay
				v-if="computedElement.content.url"
				:url="computedElement.content.url"
				:title="computedElement.content.title"
				:imageUrl="computedElement.content.imageUrl"
				:isEditMode="isEditMode"
				><BoardMenu :scope="BoardMenuScope.LINK_ELEMENT" has-background>
					<BoardMenuActionMoveUp @click="onMoveUp" />
					<BoardMenuActionMoveDown @click="onMoveDown" />
					<BoardMenuActionDelete @click="onDelete" />
				</BoardMenu>
			</LinkContentElementDisplay>

			<LinkContentElementCreate v-if="isCreating" @create:url="onCreateUrl"
				><BoardMenu :scope="BoardMenuScope.LINK_ELEMENT" has-background>
					<BoardMenuActionMoveUp @click="onMoveUp" />
					<BoardMenuActionMoveDown @click="onMoveDown" />
					<BoardMenuActionDelete @click="onDelete" />
				</BoardMenu>
			</LinkContentElementCreate>
		</v-card>
	</div>
</template>

<script setup lang="ts">
import { LinkElementResponse } from "@/serverApi/v3";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
} from "@ui-board";
import { computed, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useMetaTagExtractorApi } from "../composables/MetaTagExtractorApi.composable";
import { usePreviewGenerator } from "../composables/PreviewGenerator.composable";
import { ensureProtocolIncluded } from "../util/url.util";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";

const props = defineProps({
	element: {
		type: Object as PropType<LinkElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isDetailView: { type: Boolean, required: true },
});
const emit = defineEmits<{
	(e: "delete:element", id: string): void;
	(e: "move-keyboard:edit", event: Event): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
}>();

const { t } = useI18n();
const linkContentElement = ref(null);
const isLoading = ref(false);
const element = toRef(props, "element");

const outlined = computed(() => {
	return props.isEditMode === true || computedElement.value.content.url !== ""
		? "outlined"
		: "text";
});

useBoardFocusHandler(element.value.id, linkContentElement);

const { modelValue, computedElement } = useContentElementState(props, {
	autoSaveDebounce: 100,
});

const sanitizedUrl = computed(() =>
	props.element.content.url ? sanitizeUrl(props.element.content.url) : ""
);

const isCreating = computed(
	() => props.isEditMode && !computedElement.value.content.url
);

const isHidden = computed(
	() => props.isEditMode === false && !computedElement.value.content.url
);

const { getMetaTags } = useMetaTagExtractorApi();

const { createPreviewImage } = usePreviewGenerator(element.value.id);

const onCreateUrl = async (originalUrl: string) => {
	isLoading.value = true;

	try {
		const validUrl = ensureProtocolIncluded(originalUrl);
		modelValue.value.url = validUrl;

		const { title, description, imageUrl } = await getMetaTags(validUrl);
		modelValue.value.title = title;
		modelValue.value.description = description;
		if (imageUrl) {
			modelValue.value.imageUrl = await createPreviewImage(imageUrl);
		}
	} catch (error) {
		modelValue.value.url = "";
	} finally {
		isLoading.value = false;
	}
};

const ariaLabel = computed(() => {
	const contentUrl = computedElement.value.content.url;

	return contentUrl
		? `${contentUrl}, ${t("common.ariaLabel.newTab")}`
		: undefined;
});

const onKeydownArrow = (event: KeyboardEvent) => {
	if (isCreating.value === false && props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onMoveDown = () => emit("move-down:edit");

const onMoveUp = () => emit("move-up:edit");

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", element.value.id);
	}
};
</script>
