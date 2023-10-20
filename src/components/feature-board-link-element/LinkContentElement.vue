<template>
	<div class="mb-4" @keydown.up.down="onKeydownArrow">
		<LinkContentElementDisplay
			v-if="computedElement.content.url"
			:url="computedElement.content.url"
			:title="computedElement.content.title"
			:imageUrl="computedElement.content.imageUrl"
			:isLoading="isLoading"
		/>
		<LinkContentElementEdit
			v-if="!computedElement.content.url"
			@create:url="onCreateUrl"
		/>
	</div>
</template>

<script lang="ts">
import {
	LinkElementResponse,
	MetaTagExtractorApiFactory,
} from "@/serverApi/v3";
import { useContentElementState } from "@data-board";
import { defineComponent, toRef } from "vue";
import { PropType } from "vue/types/umd";
import { useFileStorageApi } from "@feature-board-file-element";
import { FileRecordParentType } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { $axios } from "@/utils/api";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import LinkContentElementEdit from "./LinkContentElementEdit.vue";

export default defineComponent({
	name: "LinkElementContent",
	components: {
		LinkContentElementEdit,
		LinkContentElementDisplay,
	},
	props: {
		element: {
			type: Object as PropType<LinkElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-keyboard:edit"],
	setup(props, { emit }) {
		const element = toRef(props, "element");
		const metaTagApi = MetaTagExtractorApiFactory(undefined, "/v3", $axios);
		const { fetchFile, fileRecord, uploadFromUrl } = useFileStorageApi(
			element.value.id,
			FileRecordParentType.BOARDNODES
		);

		const { modelValue, computedElement, isLoading } = useContentElementState(
			props,
			{ autoSaveDebounce: 100 }
		);

		// can be removed after refactoring of upload+virusScan-workflow
		const updateFileRecord = (increase = 100, base = 1000, retries = 0) => {
			fetchFile().then(() => {
				if (
					fileRecord?.value?.previewStatus &&
					isPreviewPossible(fileRecord.value?.previewStatus)
				) {
					modelValue.value.imageUrl = convertDownloadToPreviewUrl(
						fileRecord.value.url
					);
				} else if (retries < 10) {
					setTimeout(
						() => updateFileRecord(base + increase, base, retries++),
						base + increase
					);
				}
			});
		};

		const onCreateUrl = async (url: string) => {
			const res = await metaTagApi.metaTagExtractorControllerGetData({ url });
			const { title, description, imageUrl } = res.data;
			modelValue.value.url = url;
			modelValue.value.title = title;
			modelValue.value.description = description;
			if (imageUrl) {
				await uploadFromUrl(imageUrl);
				updateFileRecord();
			}
		};

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		return {
			computedElement,
			isLoading,
			modelValue,
			onCreateUrl,
			onKeydownArrow,
		};
	},
});
</script>
