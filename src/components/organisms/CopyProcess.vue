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
export const StatusEnum = {
	SUCCESS: "success",
	FAILURE: "failure",
	NOT_DOING: "not-doing",
	NOT_IMPLEMENTED: "not-implemented",
	PARTIAL: "partial",
};

export const TypesEnum = {
	BOARD: "board",
	COURSE: "course",
	FILE: "file",
	LEAF: "leaf",
	LESSON: "lesson",
	TASK: "task",
	FILE_GROUP: "file-group",
	LESSON_CONTENT: "lesson-content",
	LESSON_CONTENT_GROUP: "lesson-content-group",
};
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
		getItemTitleAndStatus(item) {
			const titles = {
				metadata: this.$t("components.molecules.copyResult.metadata"),
				description: this.$t("common.labels.description"),
				coursegroups: this.$t("common.words.courseGroups"),
				submissions: "submissions", // TODO: add lang key here
				times: this.$t("common.words.times"), // TODO: add correct translations here

				tasks: this.$t("common.words.tasks"), // group folder - not used yet
				lessons: this.$t("common.words.topics"), // group folder - not used yet

				board: this.$t("common.labels.room"),
				course: this.$t("common.labels.room"),
				lesson: `${this.$t("common.words.topics")} - ${item.title}`,
				task: `${this.$t("common.words.task")} - ${item.title}`,
				"lesson-content": "Lesson Content", // TODO: add lang key here
				"lesson-content-group": "Lesson Content Group", // TODO: add lang key here
				"file-group": "Files", // TODO: add lang key here
			};

			const feStatus = {
				success: "success",
				partial: "partial",
				failure: "failure",
				"not-doing": "failure",
				"not-implemented": "failure",
			};

			if (item.type === TypesEnum.FILE_GROUP) {
				return {
					title:
						item.status === StatusEnum.NOT_IMPLEMENTED
							? this.$t("components.molecules.copyResult.fileCopy.error")
							: titles[item.type],
					feStatus: feStatus[item.status],
				};
			}

			if (item.type === TypesEnum.FILE) {
				return {
					title: item.title,
					feStatus: feStatus[item.status],
				};
			}

			return {
				title: titles[item.type === TypesEnum.LEAF ? item.title : item.type],
				feStatus: feStatus[item.status],
			};
		},
		prepareCopiedElements(items) {
			return items.map(({ elements = [], ...rest }) => {
				const item = { ...rest };
				const titleAndStatus = this.getItemTitleAndStatus({
					title: item.title,
					status: item.status,
					type: item.type,
				});

				item.index = ++this.elementIndex;
				item.title = titleAndStatus.title;
				item.feStatus = titleAndStatus.feStatus;

				if (elements.length > 0) {
					const isSuccess = elements.every(
						(ele) => ele.status === StatusEnum.SUCCESS
					);
					item.feStatus = isSuccess
						? StatusEnum.SUCCESS
						: titleAndStatus.feStatus;
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
