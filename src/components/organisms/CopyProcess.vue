<template>
	<v-custom-dialog
		v-model="showModal"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="dialogClosed"
	>
		<h2 slot="title" class="text-h4 my-2 word-break">
			{{ $t("components.molecules.copyResult.title") }}
		</h2>
		<template slot="content">
			<v-divider class="mb-4"></v-divider>
			<div v-if="loading">
				<v-skeleton-loader
					type="article, list-item-three-line"
					data-testid="copy-process-skeleton"
				/>
			</div>
			<div v-else>
				<!--				<copy-result-->
				<!--					v-if="copiedItems.elements"-->
				<!--					:items="copiedItems.elements"-->
				<!--				/>-->
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { copyModule } from "@/store";
//
// /**
//  *
//  * @type CopyApiResponse[]
//  */

const mockData = {
	id: "asdklöjfasdklf",
	status: "partial",
	elements: [
		{
			type: "METADATA",
			status: "success",
		},
		{
			type: "USER_GROUP",
			status: "not-doing",
		},
		{
			type: "LTITOOL_GROUP",
			status: "not-doing",
		},
		{
			type: "TIME_GROUP",
			status: "not-doing",
		},
		{
			type: "FILE_GROUP",
			status: "not-implemented",
		},
		{
			type: "COURSEGROUP_GROUP",
			status: "not-implemented",
		},
		{
			title: "taskgroup",
			type: "TASK_GROUP",
			status: "failure",
			id: "62e7a94e2c74e087967d3727",
			elements: [
				{
					type: "METADATA",
					status: "success",
				},
				{
					title: "task in group",
					type: "TASK",
					status: "failure",
					id: "62e7a94e2c74e087967d3237",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
			],
		},
		{
			title: "board",
			type: "BOARD",
			status: "partial",
			id: "62e7a94e2c74e087967d3737",
			elements: [
				{
					title: "Thema (3)",
					type: "LESSON",
					status: "partial",
					id: "62e7a94e2c74e087967d3723",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "LESSON_CONTENT_GROUP",
							status: "partial",
							elements: [
								{
									title: "Text",
									type: "LESSON_CONTENT",
									status: "success",
								},
								{
									title: "Sieb des Blabla",
									type: "LESSON_CONTENT",
									status: "partial",
								},
								{
									title: "Lernmaterial",
									type: "LESSON_CONTENT",
									status: "success",
								},
							],
						},
					],
				},
				{
					title: "Thema (2)",
					type: "LESSON",
					status: "partial",
					id: "62e7a94e2c74e087967d3724",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "LESSON_CONTENT_GROUP",
							status: "partial",
							elements: [
								{
									title: "Text",
									type: "LESSON_CONTENT",
									status: "success",
								},
								{
									title: "Geogebra",
									type: "LESSON_CONTENT",
									status: "partial",
								},
								{
									title: "Lernmaterial",
									type: "LESSON_CONTENT",
									status: "success",
								},
							],
						},
					],
				},
				{
					title: "Thema (1)",
					type: "LESSON",
					status: "partial",
					id: "62e7a94e2c74e087967d3725",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "LESSON_CONTENT_GROUP",
							status: "partial",
							elements: [
								{
									title: "Text",
									type: "LESSON_CONTENT",
									status: "success",
								},
								{
									title: "Geogebra",
									type: "LESSON_CONTENT",
									status: "partial",
								},
								{
									title: "Lernmaterial",
									type: "LESSON_CONTENT",
									status: "success",
								},
							],
						},
					],
				},
				{
					title: "Thema",
					type: "LESSON",
					status: "partial",
					id: "62e7a94e2c74e087967d3726",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "LESSON_CONTENT_GROUP",
							status: "partial",
							elements: [
								{
									title: "Text",
									type: "LESSON_CONTENT",
									status: "success",
								},
								{
									title: "Sieb des Blabla",
									type: "LESSON_CONTENT",
									status: "partial",
								},
								{
									title: "Lernmaterial",
									type: "LESSON_CONTENT",
									status: "success",
								},
							],
						},
					],
				},
				{
					title: "task 20",
					type: "TASK",
					status: "success",
					id: "62e7a94e2c74e087967d3727",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
				{
					title: "task 20 (1)",
					type: "TASK",
					status: "success",
					id: "62e7a94e2c74e087967d3728",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
				{
					title: "task 17",
					type: "TASK",
					status: "success",
					id: "62e7a94e2c74e087967d3729",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
				{
					title: "Not a draft",
					type: "TASK",
					status: "success",
					id: "62e7a94e2c74e087967d372a",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
				{
					title: "Test",
					type: "TASK",
					status: "success",
					id: "62e7a94e2c74e087967d372b",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
				{
					title: "terterte",
					type: "TASK",
					status: "success",
					id: "62e7a94e2c74e087967d372c",
					elements: [
						{
							type: "METADATA",
							status: "success",
						},
						{
							type: "CONTENT",
							status: "success",
						},
						{
							type: "SUBMISSION_GROUP",
							status: "not-doing",
						},
					],
				},
			],
		},
	],
};

export default {
	components: { vCustomDialog },
	props: {
		isOpen: {
			type: Boolean,
		},
		loading: {
			type: Boolean,
		},
	},
	data() {
		return {
			elementIndex: 0,
			showModal: true,
		};
	},
	computed: {
		copiedItems() {
			return copyModule.getFilteredResult;
		},
		copiedItemTitle() {
			return copyModule?.getTitle || "";
		},
		copiedItemId() {
			return copyModule?.getId || "";
		},
		typesEnum() {
			return copyModule.getResponseTypes;
		},
		statusEnum() {
			return copyModule.getResponseStatus;
		},
	},
	watch: {
		isOpen() {
			this.showModal = this.isOpen;
		},
	},
	created() {
		copyModule.setFilteredResult(mockData);
	},
	methods: {
		getItemTitle(item) {
			const titles = {
				BOARD: this.$t("common.words.learnContent"),
				CONTENT: this.$t("components.molecules.copyResult.label.content"),
				COURSE: this.$t("common.labels.room"),
				COURSEGROUP_GROUP: this.$t("common.words.courseGroups"),
				FILE: this.$t("components.molecules.copyResult.label.file"),
				FILE_GROUP: this.$t("components.molecules.copyResult.label.files"),
				LEAF: this.$t("components.molecules.copyResult.label.leaf"),
				LERNSTORE_MATERIAL: item.title,
				LERNSTORE_MATERIAL_GROUP: this.$t(
					"components.molecules.copyResult.label.lernstoreMaterialGroup"
				),
				LESSON: `${this.$t("common.words.topics")} - ${item.title}`,
				LESSON_CONTENT: item.title,
				LESSON_CONTENT_GROUP: this.$t(
					"components.molecules.copyResult.label.lessonContentGroup"
				),
				LTITOOL_GROUP: this.$t(
					"components.molecules.copyResult.label.ltiToolsGroup"
				),
				METADATA: this.$t("components.molecules.copyResult.metadata"),
				SUBMISSION_GROUP: this.$t(
					"components.molecules.copyResult.label.submissions"
				),
				TASK: `${this.$t("common.words.task")} - ${item.title}`,
				TASK_GROUP: this.$t("common.words.tasks"),
				TIME_GROUP: this.$t("components.molecules.copyResult.label.timeGroup"),
				USER_GROUP: this.$t("components.molecules.copyResult.label.userGroup"),
			};

			if (item.type === this.typesEnum.FileGroup) {
				return item.status === this.statusEnum.NotImplemented
					? this.$t("components.molecules.copyResult.fileCopy.error")
					: titles[item.type];
			}

			if (item.type === this.typesEnum.File) {
				return item.title;
			}

			return titles[item.type];
		},
		getItemStatus(status) {
			const feStatus = {
				success: "success",
				partial: "partial",
				failure: "failure",
				"not-doing": "failure",
				"not-implemented": "failure",
			};

			return feStatus[status];
		},
		prepareCopiedElements(items) {
			return items.map(({ elements = [], ...rest }) => {
				const item = { ...rest };
				const title = this.getItemTitle({
					title: item.title,
					status: item.status,
					type: item.type,
				});

				item.index = ++this.elementIndex;
				item.title = title;
				item.feStatus = this.getItemStatus(item.status);

				if (elements.length > 0) {
					const isSuccess = elements.every(
						(ele) => ele.status === this.statusEnum.Success
					);
					item.feStatus = isSuccess
						? this.statusEnum.Success
						: this.getItemStatus(item.status);
					item.elements = this.prepareCopiedElements(elements);
				}
				return item;
			});
		},
		dialogClosed() {
			this.showModal = false;
			this.$emit("dialog-closed", false);
			copyModule.resetCopyResult();
		},
	},
};
</script>

<style lang="scss" scoped>
.word-break {
	word-break: break-word;
}
</style>
