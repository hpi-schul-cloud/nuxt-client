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
							status: "success-all",
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
		types() {
			return copyModule.getResponseTypes;
		},
		status() {
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
			const titleObject = {
				metadata: this.$t("components.molecules.copyResult.metadata"),
				description: this.$t("common.labels.description"),
				tasks: this.$t("common.words.tasks"),
				lessons: this.$t("common.words.topics"),
				coursegroups: this.$t("common.words.courseGroups"),
				times: this.$t("common.words.times"),
				submissions: "submissions",
			};
			const typeObject = {
				board: this.$t("common.labels.room"),
				lesson: `${this.$t("common.words.topics")} - ${item.title}`,
				task: `${this.$t("common.words.task")} - ${item.title}`,
			};
			if (
				item.title === "files" &&
				item.status === this.status.NotImplemented
			) {
				return {
					title: this.$t("components.molecules.copyResult.fileCopy.error"),
					status: "failure",
				};
			}
			if (item.status === this.status.NotImplemented) {
				return {
					title:
						item.type === this.types.Leaf
							? titleObject[item.title]
							: typeObject[item.type],
					status: this.status.Failure,
				};
			}

			return {
				title:
					item.type === this.types.Leaf
						? titleObject[item.title]
						: typeObject[item.type],
				status: item.status,
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
				item.status = titleAndStatus.status;

				if (elements.length > 0) {
					const isSuccess = elements.every(
						(ele) => ele.status === this.types.success
					);
					item.status = isSuccess ? this.types.success : titleAndStatus.status;
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
