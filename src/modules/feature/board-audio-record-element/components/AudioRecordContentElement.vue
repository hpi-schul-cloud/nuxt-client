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
		<div class="bg-grey-lighten-4 pa-4 rounded-t">
			<AudioRecordContentTitle />
		</div>
		<div class="rounded-b border-top">
			<v-btn
				:aria-label="
					$t(
						'component.cardElement.audioRecordElement.audioPlayer.startRecording'
					)
				"
				color="transparent"
				density="comfortable"
				icon
				variant="flat"
				@click="start"
			>
				<v-icon> {{ mdiMicrophone }}</v-icon>
			</v-btn>
			<v-btn
				:aria-label="
					$t(
						'component.cardElement.audioRecordElement.audioPlayer.pauseRecording'
					)
				"
				color="transparent"
				density="comfortable"
				icon
				variant="flat"
				@click="pause"
			>
				<v-icon> {{ mdiPause }}</v-icon>
			</v-btn>
			<v-btn
				:aria-label="
					$t(
						'component.cardElement.audioRecordElement.audioPlayer.resumeRecording'
					)
				"
				color="transparent"
				density="comfortable"
				icon
				variant="flat"
				@click="resume"
			>
				<v-icon> {{ mdiPlay }}</v-icon>
			</v-btn>

			<v-btn
				:aria-label="
					$t(
						'component.cardElement.audioRecordElement.audioPlayer.stopRecording'
					)
				"
				color="transparent"
				density="comfortable"
				icon
				variant="flat"
				@click="stop"
			>
				<v-icon> {{ mdiStop }}</v-icon>
			</v-btn>
			<!-- <v-slider
				:aria-label="
					$t('component.cardElement.audioRecordElement.audioPlayer.slider')
				"
				class="duration-slider"
				color="white"
				thumb-color="white"
				track-color="black"
			/> -->
		</div>

		<AudioRecordContent
			v-if="audioRecordProperties"
			:audio-record-properties="audioRecordProperties"
			:is-edit-mode="isEditMode"
			:alerts="alerts"
			@fetch:file="onFetchFile"
			@update:alternative-text="onUpdateAlternativeText"
			@update:caption="onUpdateCaption"
			@add:alert="onAddAlert"
		>
			<BoardMenu
				v-if="isEditMode"
				:scope="BoardMenuScope.AUDIO_RECORD_ELEMENT"
				has-background
				:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					:name="audioRecordProperties.name"
					scope-language-key="components.cardElement.audioRecordElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</AudioRecordContent>
	</v-card>
</template>

<script lang="ts">
import { FileRecordParentType, PreviewWidth } from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	isDownloadAllowed,
	isPreviewPossible,
} from "@/utils/fileHelper";
import {
	mdiPause,
	mdiPlay,
	mdiPlaySpeed,
	mdiMicrophone,
	mdiStop,
} from "@icons/material";
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

import { AudioRecordElementResponse } from "../../../../serverApi/v3";
import { useFileStorageApi } from "../../board-file-element";
import { AudioRecordAlert } from "./content/alert/AudioRecordAlert.enum";
import { useAudioRecordAlerts } from "../composables/useAudioRecordAlerts.composable";

import AudioRecordContent from "./content/AudioRecordContent.vue";
import { useAudioRecorder } from "../composables";
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
		const isLoadingFileRecord = ref(false);

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
				element.value.content.caption = " ";
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

		// Audio Recorder
		const { state, start, stop, pause, resume } = useAudioRecorder();
		const audioUrl = ref("");

		return {
			audioUrl,
			state,
			start,
			stop,
			pause,
			resume,
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
