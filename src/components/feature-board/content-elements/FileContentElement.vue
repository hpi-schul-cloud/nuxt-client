<template>
	<v-card class="mb-4" elevation="0" outlined dense>
		<div v-if="fileRecordModel">
			<FileContentElementDisplay
				v-if="!isEditMode"
				:fileName="fileRecordModel.name"
				:url="url"
			></FileContentElementDisplay>
			<div v-if="isEditMode" tabindex="0" @keydown.up.down="onKeydownArrow">
				<FileContentElementEdit
					:fileName="fileRecordModel.name"
					:url="url"
					:isFirstElement="isFirstElement"
					:isLastElement="isLastElement"
					:hasMultipleElements="hasMultipleElements"
					@move-down:element="onMoveFileEditDown"
					@move-up:element="onMoveFileEditUp"
				/>
			</div>
			<FileContentElementAlert v-if="isBlocked" />
		</div>
		<v-card-text v-else>
			<v-progress-linear indeterminate></v-progress-linear>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import {
	computed,
	defineComponent,
	PropType,
	watch,
	ref,
	onMounted,
} from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { useFileStorageApi } from "../shared/FileStorageApi.composable";
import {
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";

export default defineComponent({
	name: "FileContentElement",
	components: {
		FileContentElementAlert,
		FileContentElementDisplay,
		FileContentElementEdit,
	},
	props: {
		element: { type: Object as PropType<FileElementResponse>, required: true },
		isEditMode: { type: Boolean, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: ["move-down:edit", "move-up:edit", "move-keyboard:edit"],
	setup(props, { emit }) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { getFile, fetchFileRecursively, refreshFile, newFileForParent } =
			useFileStorageApi();

		const fileRecordModel = ref<FileRecordResponse>();
		const parentId = ref<string>("");

		const isBlocked = computed(
			() =>
				fileRecordModel.value?.securityCheckStatus ===
				FileRecordScanStatus.BLOCKED
		);

		const isPending = computed(
			() =>
				fileRecordModel.value?.securityCheckStatus ===
				FileRecordScanStatus.PENDING
		);

		const url = computed(() =>
			!isBlocked.value ? fileRecordModel.value?.url : ""
		);

		onMounted(() => {
			(async () => {
				parentId.value = props.element.id;
				fileRecordModel.value = getFile(parentId.value);

				if (!fileRecordModel.value) {
					fileRecordModel.value = await refreshFile(
						parentId.value,
						FileRecordParentType.BOARDNODES
					);
				}

				if (isPending.value) {
					fileRecordModel.value = await fetchFileRecursively(
						parentId.value,
						FileRecordParentType.BOARDNODES
					);
				}
			})();
		});

		watch(newFileForParent, async (newValue) => {
			if (newValue === parentId.value) {
				fileRecordModel.value = getFile(parentId.value);

				if (isPending.value) {
					fileRecordModel.value = await fetchFileRecursively(
						parentId.value,
						FileRecordParentType.BOARDNODES
					);
				}
			}
		});

		const onKeydownArrow = (event: KeyboardEvent) => {
			event.preventDefault();
			emit("move-keyboard:edit", props.element.id, event);
		};

		const onMoveFileEditDown = () => {
			emit("move-down:edit");
		};

		const onMoveFileEditUp = () => {
			emit("move-up:edit");
		};
		return {
			isAutoFocus,
			isBlocked,
			fileRecordModel,
			modelValue,
			onKeydownArrow,
			onMoveFileEditDown,
			onMoveFileEditUp,
			url,
		};
	},
});
</script>
