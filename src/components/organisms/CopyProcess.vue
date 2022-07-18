<template>
	<v-custom-dialog
		v-model="showModal"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="dialogClosed"
	>
		<h2 slot="title" class="text-h4 my-2">
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
				<label class="text-md mt-2">
					{{ copiedItemTitle }}
				</label>
				<copy-result
					v-if="copiedItems.elements"
					:items="copiedItems.elements"
				/>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import CopyResult from "@components/molecules/CopyResult";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { copyModule } from "@/store";

export default {
	components: { vCustomDialog, CopyResult },
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
			showModal: false,
		};
	},
	computed: {
		copiedItems() {
			if (this.copiedItemId === "") return [];

			const result = copyModule.getFilteredResult;

			if (copyModule.isSuccess) {
				return {
					...result,
					index: this.elementIndex,
					completed: true,
					elements: [
						{
							id: result.id,
							feStatus: "success-all",
							title: this.$t(
								"components.molecules.copyResult.successfullyCopied"
							),
							type: result.type,
						},
					],
				};
			}

			return {
				...result,
				index: this.elementIndex,
				elements: result.elements
					? this.prepareCopiedElements(result.elements)
					: [],
			};
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
	methods: {
		getItemTitle(item) {
			const titles = {
				BOARD: this.$t("common.labels.room"),
				CONTENT: this.$t("components.molecules.copyResult.label.content"),
				COURSE: this.$t("common.labels.room"),
				COURSEGROUP_GROUP: this.$t("common.words.courseGroups"),
				FILE: this.$t("components.molecules.copyResult.label.file"),
				FILE_GROUP: this.$t("components.molecules.copyResult.label.files"),
				LEAF: this.$t("components.molecules.copyResult.label.leaf"),
				LESSON: `${this.$t("common.words.topics")} - ${item.title}`,
				LESSON_CONTENT: this.$t(
					"components.molecules.copyResult.label.lessonContent"
				),
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
