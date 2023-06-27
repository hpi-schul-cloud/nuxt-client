<template>
	<div>
		<v-img :src="fileRecord.url" :alt="fileRecord.name" />
		<div class="menu">
			<FileContentElementMenu
				:file-record="fileRecord"
				v-if="isEditMode"
				@delete:element="onDelete"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { FileRecordResponse } from "@/fileStorageApi/v3";
import {
	mdiAlertCircle,
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { defineComponent } from "vue";
import FileContentElementMenu from "./FileContentElementMenu.vue";

export default defineComponent({
	name: "ImageFileDisplay",
	components: { FileContentElementMenu },
	props: {
		fileRecord: {
			type: Object as () => FileRecordResponse,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["delete:element", "update:caption"],
	setup(props, { emit }) {
		const onDelete = () => {
			emit("delete:element");
		};

		return {
			mdiAlertCircle,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiTrayArrowDown,
			onDelete,
		};
	},
});
</script>

<style scoped>
.menu {
	position: absolute;
	top: 8px;
	right: 8px;
}
</style>
