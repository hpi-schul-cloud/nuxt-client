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
			v-if="audioRecordProperties && isUploading !== true"
			:audio-record-properties="audioRecordProperties"
			:alerts="alerts"
			:is-edit-mode="isEditMode"
			@fetch:file="onFetchFile"
			@update:alternative-text="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
			@add:alert="onAddAlert"
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
		<AudioRecordFileUpload
			v-else
			:is-edit-mode="isEditMode"
			@upload:file="onUploadFile"
		>
			<BoardMenu :scope="BoardMenuScope.AUDIO_RECORD_ELEMENT" has-background>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					scope-language-key="components.cardElement.audioRecordElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</AudioRecordFileUpload>
	</v-card>
</template>

<script lang="ts">
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import {
	computed,
	defineComponent,
	onMounted,
	PropType,
	ref,
	toRef,
	watch,
} from "vue";

import {
	convertDownloadToPreviewUrl,
	isDownloadAllowed,
	isPreviewPossible,
} from "@/utils/fileHelper";
import {
	FileRecordParentType,
	PreviewWidth,
} from "../../../../fileStorageApi/v3";
import { AudioRecordElementResponse } from "../../../../serverApi/v3";
import { useAudioRecordAlerts } from "../composables/useAudioRecordAlerts.composable";
import { useFileStorageApi } from "../composables/useFileStorageApi.composable";
import { AudioRecordAlert } from "./content/alert/AudioRecordAlert.enum";
import AudioRecordContent from "./content/AudioRecordContent.vue";
import AudioRecordFileUpload from "./upload/AudioRecordFileUpload.vue";

export default defineComponent({
	name: "AudioRecordContentElement",
	components: {
		AudioRecordContent,
		AudioRecordFileUpload,
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
		const isLoadingFileRecord = ref(true);

		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, audioRecordContentElement);

		const { modelValue } = useContentElementState(props);
		const { fetchFile, upload, getFileRecord } = useFileStorageApi();

		const fileRecord = getFileRecord(element.value.id);

		const { alerts, addAlert } = useAudioRecordAlerts(fileRecord);

		const isUploading = computed(() => {
			return fileRecord.value?.isUploading;
		});

		const audioRecordProperties = computed(() => {
			if (fileRecord.value === undefined) {
				return;
			}

			const previewUrl = isPreviewPossible(fileRecord.value.previewStatus)
				? convertDownloadToPreviewUrl(fileRecord.value.url, PreviewWidth._500)
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
				mimeType: fileRecord.value.mimeType,
				element: props.element,
			};
		});

		const hasFileRecord = computed(() => {
			return fileRecord.value !== undefined;
		});

		const isOutlined = computed(() => {
			const { isEditMode } = props;
			const isUploadingInViewMode =
				fileRecord.value?.id !== undefined && !isEditMode && !isUploading.value;

			return isUploadingInViewMode || isEditMode;
		});

		watch(element.value, async () => {
			isLoadingFileRecord.value = true;
			await fetchFile(element.value.id, FileRecordParentType.BOARDNODES);
			isLoadingFileRecord.value = false;
		});

		onMounted(async () => {
			await fetchFile(element.value.id, FileRecordParentType.BOARDNODES);
			isLoadingFileRecord.value = false;
		});

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onUploadFile = async (file: File): Promise<void> => {
			try {
				await upload(file, element.value.id, FileRecordParentType.BOARDNODES);
			} catch {
				emit("delete:element", element.value.id);
			}
		};

		const onFetchFile = async (): Promise<void> => {
			await fetchFile(element.value.id, FileRecordParentType.BOARDNODES);
		};

		const onUpdateAlternativeText = (value: string) => {
			modelValue.value.alternativeText = value;
		};

		const onUpdateCaption = (value: string) => {
			modelValue.value.caption = value;
		};

		const onAddAlert = (alert: AudioRecordAlert) => {
			addAlert(alert);
		};

		const onDelete = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element", element.value.id);
			}
		};

		const onMoveUp = () => emit("move-up:edit");
		const onMoveDown = () => emit("move-down:edit");

		return {
			audioRecordContentElement,
			audioRecordProperties,
			fileRecord,
			hasFileRecord,
			isOutlined,
			modelValue,
			alerts,
			isUploading,
			onKeydownArrow,
			onUploadFile,
			onFetchFile,
			onUpdateAlternativeText,
			onUpdateCaption,
			onAddAlert,
			onDelete,
			onMoveUp,
			onMoveDown,
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
