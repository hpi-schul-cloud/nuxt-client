<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="onDialogClosed"
	>
		<h2 slot="title" class="text-h4 my-2 wordbreak-normal">
			{{ title }}
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
								<strong>Geogebra</strong> &middot;
								{{ $t("components.molecules.copyResult.geogebraCopy.error") }}
							</div>
							<div v-if="hasFailedEtherpadElement">
								<strong>Etherpad</strong> &middot;
								{{ $t("components.molecules.copyResult.etherpadCopy.error") }}
							</div>
							<div v-if="hasFailedCourseGroup">
								<strong>{{ $t("common.words.courseGroups") }}</strong> &middot;
								{{
									$t("components.molecules.copyResult.courseGroupCopy.error")
								}}
							</div>
							<div v-if="hasFailedFileElement">
								<strong>{{
									$t("components.molecules.copyResult.label.files")
								}}</strong>
								&middot;
								{{ $t("components.molecules.copyResult.fileCopy.error") }}
							</div>
						</div>
					</v-alert>
				</div>

				<div v-if="isLoading">
					<v-skeleton-loader
						type="article, list-item-three-line"
						data-testid="copy-process-skeleton"
					/>
				</div>
				<div v-else>
					<copy-result-modal-list
						:items="items"
						:base-url="baseUrl"
					></copy-result-modal-list>
				</div>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import CopyResultModalList from "@components/copy-result-modal/CopyResultModalList";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
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
		baseUrl: {
			type: String,
			default: () => "",
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
			return this.isLoading === true || this.copyResultStatus !== undefined;
		},
		status() {
			return this.copyResultStatus;
		},
		hasNotification() {
			return (
				this.hasFailedGeogebraElement ||
				this.hasFailedEtherpadElement ||
				this.hasFailedFileElement ||
				this.hasFailedCourseGroup
			);
		},
		hasFailedGeogebraElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentGeogebra
			);
		},
		hasFailedEtherpadElement() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.LessonContentEtherpad
			);
		},
		hasFailedFileElement() {
			return this.hasElementOfType(this.items, CopyApiResponseTypeEnum.File);
		},
		hasFailedCourseGroup() {
			return this.hasElementOfType(
				this.items,
				CopyApiResponseTypeEnum.CoursegroupGroup
			);
		},
		title() {
			if (this.isLoading) {
				return this.$t("components.molecules.copyResult.title.loading");
			} else if (this.copyResultStatus !== undefined) {
				switch (this.copyResultStatus) {
					case "success":
						return this.$t("components.molecules.copyResult.title.success");

					case "partial":
						return this.$t("components.molecules.copyResult.title.partial");

					case "failure":
					default:
						return this.$t("components.molecules.copyResult.title.failure");
				}
			} else {
				return this.$t("components.molecules.copyResult.title.failure");
			}
		},
	},
	methods: {
		hasElementOfType(items, type) {
			let found = false;
			items.forEach((item) => {
				if (found) return;
				item.elements.find((e) => e.type === type) ? (found = true) : null;
			});
			return found;
		},
		onDialogClosed() {
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
