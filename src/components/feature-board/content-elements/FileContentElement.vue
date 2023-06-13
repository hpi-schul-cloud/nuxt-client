<template>
	<v-card class="mb-4" elevation="0" outlined dense>
		<div v-if="fileRecordModel">
			<FileContentElementDisplay
				v-if="!isEditMode"
				:caption="modelValue.caption"
				:fileRecord="fileRecordModel"
			></FileContentElementDisplay>
			<FileContentElementEdit
				v-if="isEditMode"
				:caption="modelValue.caption"
				:fileRecord="fileRecordModel"
				@update:caption="($event) => (modelValue.caption = $event)"
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
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { getFile, refreshFile, newFileForParent } = useFileStorageApi();

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

		const refreshFileState = async () => {
			fileRecordModel.value = await refreshFile(
				parentId.value,
				FileRecordParentType.BOARDNODES
			);

			if (!fileRecordModel.value || isPending) {
				await new Promise((resolve) => setTimeout(resolve, 10000));
				await refreshFileState();
			}
		};

		onMounted(() => {
			(async () => {
				parentId.value = props.element.id;
				fileRecordModel.value = getFile(parentId.value);

				if (!fileRecordModel.value || isPending) {
					await refreshFileState();
				}
			})();
		});

		watch(newFileForParent, (newValue) => {
			if (newValue === parentId.value) {
				fileRecordModel.value = getFile(parentId.value);
			}
		});

		return {
			isAutoFocus,
			isBlocked,
			fileRecordModel,
			modelValue,
		};
	},
});
</script>
