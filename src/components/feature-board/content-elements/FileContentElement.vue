<template>
	<v-card class="mb-4" elevation="0" outlined dense>
		<div v-if="fileRecordModel">
			<FileContentElementDisplay
				v-if="!isEditMode"
				:fileName="fileRecordModel.name"
				:url="url"
			></FileContentElementDisplay>
			<FileContentElementEdit
				v-if="isEditMode"
				:fileName="fileRecordModel.name"
				:url="url"
				@delete:element="onDeleteElement"
			></FileContentElementEdit>
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
import { DeleteElementEventPayload } from "../types/ContentElement";
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
	},
	emits: ["delete:element"],
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

		const onDeleteElement = (): void => {
			emit("delete:element", {
				elementId: props.element.id,
				name: fileRecordModel.value?.name,
			} as DeleteElementEventPayload);
		};

		return {
			onDeleteElement,
			isAutoFocus,
			isBlocked,
			fileRecordModel,
			modelValue,
			url,
		};
	},
});
</script>
