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
				<copy-result-modal-list :items="items"></copy-result-modal-list>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { copyModule } from "@/store";
import CopyResultModalList from "@components/copy-result-modal/CopyResultModalList";

export default {
	components: { vCustomDialog, CopyResultModalList },
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
		items() {
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
	// created() {
	// 	// WIP
	// 	copyModule.setFilteredResult(mockData);
	// },
	methods: {
		// getItemTitle(item) {
		// 	const titles = {
		// 		BOARD: this.$t("common.words.learnContent"),
		// 		CONTENT: this.$t("components.molecules.copyResult.label.content"),
		// 		COURSE: this.$t("common.labels.room"),
		// 		COURSEGROUP_GROUP: this.$t("common.words.courseGroups"),
		// 		FILE: this.$t("components.molecules.copyResult.label.file"),
		// 		FILE_GROUP: this.$t("components.molecules.copyResult.label.files"),
		// 		LEAF: this.$t("components.molecules.copyResult.label.leaf"),
		// 		LERNSTORE_MATERIAL: item.title,
		// 		LERNSTORE_MATERIAL_GROUP: this.$t(
		// 			"components.molecules.copyResult.label.lernstoreMaterialGroup"
		// 		),
		// 		LESSON: `${this.$t("common.words.topics")} - ${item.title}`,
		// 		LESSON_CONTENT: item.title,
		// 		LESSON_CONTENT_GROUP: this.$t(
		// 			"components.molecules.copyResult.label.lessonContentGroup"
		// 		),
		// 		LTITOOL_GROUP: this.$t(
		// 			"components.molecules.copyResult.label.ltiToolsGroup"
		// 		),
		// 		METADATA: this.$t("components.molecules.copyResult.metadata"),
		// 		SUBMISSION_GROUP: this.$t(
		// 			"components.molecules.copyResult.label.submissions"
		// 		),
		// 		TASK: `${this.$t("common.words.task")} - ${item.title}`,
		// 		TASK_GROUP: this.$t("common.words.tasks"),
		// 		TIME_GROUP: this.$t("components.molecules.copyResult.label.timeGroup"),
		// 		USER_GROUP: this.$t("components.molecules.copyResult.label.userGroup"),
		// 	};
		//
		// 	if (item.type === this.typesEnum.FileGroup) {
		// 		return item.status === this.statusEnum.NotImplemented
		// 			? this.$t("components.molecules.copyResult.fileCopy.error")
		// 			: titles[item.type];
		// 	}
		//
		// 	// return titles[item.type];
		// 	return "";
		// },

		dialogClosed() {
			// this.showModal = false;
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
