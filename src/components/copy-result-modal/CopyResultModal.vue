<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="onDialogClosed"
	>
		<h2
			v-if="status !== 'success'"
			slot="title"
			class="text-h4 my-2 wordbreak-normal"
		>
			{{ $t("components.molecules.copyResult.title") }}
		</h2>
		<template slot="content">
			<div>
				<v-alert
					v-if="status === 'success'"
					type="success"
					:icon="mdiCheckCircle"
					text
					border="left"
				>
					<div class="alert_text mr-2">
						{{ $t("components.molecules.copyResult.successfullyCopied") }}
					</div>
				</v-alert>
				<div v-if="hasNotification">
					<v-alert type="warning" :icon="mdiInformation" text border="left">
						<div class="alert_text mr-2">
							<div v-if="hasFailedGeogebraElement">
								<strong>Geogebra</strong> &middot; Material-IDs sind aus
								technischen Gründen nicht kopierbar und müssen ergänzt werden.
								i18n missing
							</div>
							<div v-if="hasFailedEtherpadElement">
								<strong>Etherpad</strong> &middot; Inhalte werden aus
								Datenschutzgründen nicht kopiert und müssen neu hinzugefügt
								werden.
							</div>
							<div v-if="hasFailedFileElement">
								<strong>Dateien</strong> &middot; Kursdateien werden aus
								technischen Gründen nicht kopiert und müssen neu hinzugefügt
								werden.
							</div>
						</div>
					</v-alert>
				</div>

				<copy-result-modal-list :items="items"></copy-result-modal-list>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import CopyResultModalList from "@components/copy-result-modal/CopyResultModalList";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import { mdiCheckCircle, mdiInformation } from "@mdi/js";

// const mockData = {
// 	id: "asdklöjfasdklf",
// 	status: "partial",
// 	elements: [
// 		{
// 			type: "METADATA",
// 			status: "success",
// 		},
// 		{
// 			type: "USER_GROUP",
// 			status: "not-doing",
// 		},
// 		{
// 			type: "LTITOOL_GROUP",
// 			status: "not-doing",
// 		},
// 		{
// 			type: "TIME_GROUP",
// 			status: "not-doing",
// 		},
// 		{
// 			type: "FILE_GROUP",
// 			status: "not-implemented",
// 		},
// 		{
// 			type: "COURSEGROUP_GROUP",
// 			status: "not-implemented",
// 		},
// 		{
// 			title: "taskgroup",
// 			type: "TASK_GROUP",
// 			status: "failure",
// 			id: "62e7a94e2c74e087967d3727",
// 			elements: [
// 				{
// 					type: "METADATA",
// 					status: "success",
// 				},
// 				{
// 					title: "task in group",
// 					type: "TASK",
// 					status: "failure",
// 					id: "62e7a94e2c74e087967d3237",
// 					elements: [
// 						{
// 							type: "METADATA",
// 							status: "success",
// 						},
// 						{
// 							type: "CONTENT",
// 							status: "success",
// 						},
// 						{
// 							type: "SUBMISSION_GROUP",
// 							status: "not-doing",
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			title: "board",
// 			type: "BOARD",
// 			status: "partial",
// 			id: "62e7a94e2c74e087967d3737",
// 			elements: [
// 				{
// 					title: "Thema (3)",
// 					type: "LESSON",
// 					status: "partial",
// 					id: "62e7a94e2c74e087967d3723",
// 					elements: [
// 						{
// 							type: "METADATA",
// 							status: "success",
// 						},
// 						{
// 							type: "LESSON_CONTENT_GROUP",
// 							status: "partial",
// 							elements: [
// 								{
// 									title: "Text",
// 									type: "LESSON_CONTENT_TEXT",
// 									status: "success",
// 								},
// 								{
// 									title: "Sieb des Blabla",
// 									type: "LESSON_CONTENT_GEOGEBRA",
// 									status: "partial",
// 								},
// 								{
// 									title: "Lernmaterial",
// 									type: "LESSON_CONTENT_ETHERPAD",
// 									status: "success",
// 								},
// 							],
// 						},
// 					],
// 				},
// 				{
// 					title: "Thema (2)",
// 					type: "LESSON",
// 					status: "partial",
// 					id: "62e7a94e2c74e087967d3724",
// 					elements: [
// 						{
// 							type: "METADATA",
// 							status: "success",
// 						},
// 						{
// 							type: "LESSON_CONTENT_GROUP",
// 							status: "partial",
// 							elements: [
// 								{
// 									title: "Text",
// 									type: "LESSON_CONTENT_TEXT",
// 									status: "success",
// 								},
// 								{
// 									title: "Geogebra",
// 									type: "LESSON_CONTENT_GEOGEBRA",
// 									status: "partial",
// 								},
// 								{
// 									title: "Lernmaterial",
// 									type: "LESSON_CONTENT_NEXBOARD",
// 									status: "success",
// 								},
// 							],
// 						},
// 					],
// 				},
// 				{
// 					title: "Thema (1)",
// 					type: "LESSON",
// 					status: "partial",
// 					id: "62e7a94e2c74e087967d3725",
// 					elements: [
// 						{
// 							type: "METADATA",
// 							status: "success",
// 						},
// 						{
// 							type: "LESSON_CONTENT_GROUP",
// 							status: "partial",
// 							elements: [
// 								{
// 									title: "Text",
// 									type: "LESSON_CONTENT_NEXBOARD",
// 									status: "success",
// 								},
// 								{
// 									title: "Geogebra",
// 									type: "LESSON_CONTENT_GEOGEBRA",
// 									status: "partial",
// 								},
// 								{
// 									title: "Lernmaterial",
// 									type: "LESSON_CONTENT_LERNSTORE",
// 									status: "success",
// 								},
// 							],
// 						},
// 					],
// 				},
// 			],
// 		},
// 	],
// };

export default {
	name: "CopyResultModal",
	components: { CopyResultModalList, vCustomDialog },
	props: {
		isLoading: Boolean,
		copyResultItems: {
			type: Array,
			default: () => [],
		},
		copyResultStatus: {
			type: String,
			default: () => undefined,
		},
	},
	data() {
		return {
			mdiInformation,
			mdiCheckCircle,
		};
	},
	computed: {
		items() {
			return this.copyResultItems;
		},
		isOpen() {
			// this is not a smart approach WIP - opens modal on successful processes because isLoading is true nevertheless
			return this.isLoading === true || this.copyResultStatus !== undefined;
		},
		status() {
			return this.copyResultStatus;
		},
		hasNotification() {
			return (
				this.hasFailedGeogebraElement ||
				this.hasFailedEtherpadElement ||
				this.hasFailedFileElement
			);
		},
		hasFailedGeogebraElement() {
			return this.findElementByType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentGeogebra
			);
		},
		hasFailedEtherpadElement() {
			return this.findElementByType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentEtherpad
			);
		},
		hasFailedFileElement() {
			return this.findElementByType(this.items, CopyApiResponseTypeEnum.File);
		},
	},
	methods: {
		findElementByType(items, type) {
			let found = false;
			items.forEach((item) => {
				if (found) return;
				item.elements.find((e) => e.type === type) ? (found = true) : null;
			});
			return found;
		},
		onDialogClosed() {
			// WIP Modal does not close properly
			this.$emit("dialog-closed");
		},
	},
};
</script>

<style scoped>
::v-deep .v-btn__content .v-icon,
.alert_text {
	color: var(--color-black) !important;
}

::v-deep .v-alert__border {
	opacity: 1;
}

.wordbreak-normal {
	word-break: normal;
}
</style>
