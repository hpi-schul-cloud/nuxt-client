<template>
	<v-card
		class="mb-4"
		data-testid="board-file-element"
		dense
		elevation="0"
		:outlined="isOutlined"
		ref="fileContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<FileContent
			v-if="fileProperties"
			:file-properties="fileProperties"
			@fetch:file="onFetchFile"
			:is-edit-mode="isEditMode"
			@update:alternativeText="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
		>
			<slot
				v-if="isEditMode"
				name="menu"
				:elementName="fileProperties?.name"
			></slot>
		</FileContent>
		<FileUpload
			v-else-if="isEditMode"
			:elementId="element.id"
			@upload:file="onUploadFile"
		>
			<slot
				v-if="isEditMode"
				name="menu"
				:elementName="fileProperties?.name"
			></slot>
		</FileUpload>
	</v-card>
</template>

<script lang="ts">
import { FileRecordParentType } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import {
	convertDownloadToPreviewUrl,
	isDownloadAllowed,
	isPreviewPossible,
} from "@/utils/fileHelper";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	computed,
	defineComponent,
	onMounted,
	PropType,
	ref,
	toRef,
} from "vue";
import FileContent from "./content/FileContent.vue";
import { useFileStorageApi } from "./shared/composables/FileStorageApi.composable";
import FileUpload from "./upload/FileUpload.vue";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileUpload,
		FileContent,
	},
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["move-keyboard:edit", "delete:element"],
	setup(props, { emit }) {
		const fileContentElement = ref(null);
		const isLoadingFileRecord = ref(true);
		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, fileContentElement);

		const { modelValue } = useContentElementState(props);
		const { fetchFile, upload, fileRecord } = useFileStorageApi(
			element.value.id,
			FileRecordParentType.BOARDNODES
		);

		const fileProperties = computed(() => {
			if (fileRecord.value === undefined) {
				return;
			}

			const previewUrl = isPreviewPossible(fileRecord.value?.previewStatus)
				? convertDownloadToPreviewUrl(fileRecord.value.url)
				: undefined;

			return {
				size: fileRecord.value.size,
				name: fileRecord.value.name,
				url: fileRecord.value.url,
				previewUrl,
				previewStatus: fileRecord.value.previewStatus,
				isDownloadAllowed: isDownloadAllowed(
					fileRecord.value.securityCheckStatus
				),
				element: props.element,
			};
		});

		const hasFileRecord = computed(() => {
			return fileRecord.value !== undefined;
		});

		const isOutlined = computed(() => {
			return fileRecord.value !== undefined || props.isEditMode === true;
		});

		onMounted(() => {
			(async () => {
				await fetchFile();
				isLoadingFileRecord.value = false;
			})();
		});

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onUploadFile = async (file: File): Promise<void> => {
			try {
				await upload(file);
			} catch (error) {
				emit("delete:element", element.value.id);
			}
		};

		const onFetchFile = async (): Promise<void> => {
			await fetchFile();
		};

		const onUpdateAlternativeText = (value: string) => {
			modelValue.value.alternativeText = value;
		};

		const onUpdateCaption = (value: string) => {
			modelValue.value.caption = value;
		};

		return {
			fileContentElement,
			fileProperties,
			fileRecord,
			hasFileRecord,
			isOutlined,
			modelValue,
			onKeydownArrow,
			onUploadFile,
			onFetchFile,
			onUpdateAlternativeText,
			onUpdateCaption,
		};
	},
});
</script>
