<template>
	<v-list dense flat class="py-0">
		<v-list-item :href="fileRecord.url" download>
			<v-list-item-icon class="mr-2">
				<v-icon>{{ mdiFileDocumentOutline }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title style="color: var(--v-primary-base)">{{
					fileRecord.name
				}}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item
			v-if="fileRecord.securityCheckStatus === FileRecordScanStatus.BLOCKED"
			style="background: #ffdbe1"
		>
			<v-list-item-icon class="mr-2">
				<v-icon color="error">{{ mdiAlertCircle }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				{{ $t("components.cardElement.fileElement.virusDetected") }}
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FileRecordResponse, FileRecordScanStatus } from "@/fileStorageApi/v3";
import { mdiAlertCircle, mdiFileDocumentOutline } from "@mdi/js";

export default defineComponent({
	name: "FileContentElementDisplay",
	props: {
		caption: {
			type: String,
			required: true,
		},
		fileRecord: {
			type: Object as PropType<FileRecordResponse>,
			required: true,
		},
	},

	setup() {
		return {
			FileRecordScanStatus,
			mdiAlertCircle,
			mdiFileDocumentOutline,
		};
	},
});
</script>
