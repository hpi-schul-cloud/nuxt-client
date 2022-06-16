<template>
	<v-custom-dialog
		v-model="showModal"
		data-testid="delete-dialog-item"
		:size="480"
		has-buttons
		:buttons="['close']"
		@dialog-closed="dialogClosed"
		@dialog-edit="$emit('process-edit', data.id)"
		@dialog-confirmed="$emit('process-delete', data.id)"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ $t("components.molecules.copyResult.title") }}
		</h2>

		<template slot="content">
			<v-divider class="mb-4"></v-divider>
			<template v-if="loading">
				<v-skeleton-loader
					type="article, list-item-three-line"
					data-testid="copy-process-skeleton"
				/>
			</template>
			<label class="text-md mt-2">
				{{ data.title }}
			</label>
			<copy-result v-if="data.elements" :items="copiedItems.elements">
			</copy-result>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import CopyResult from "@components/molecules/CopyResult";

export default {
	components: { vCustomDialog, CopyResult },
	props: {
		data: {
			type: Object,
			required: true,
			default: () => {},
		},
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
			const { data } = this;
			if (!data.id) return [];
			const elements = data.elements.filter(
				(item) => item.status !== "not-doing"
			);
			if (this.checkIfEveryElementsAreSuccess(elements)) {
				return {
					...data,
					index: this.elementIndex,
					completed: true,
					elements: [
						{
							id: data.id,
							status: "success-all",
							title: this.$t(
								"components.molecules.copyResult.successfullyCopied"
							),
							type: data.type,
						},
					],
				};
			}

			return {
				...data,
				index: this.elementIndex,
				elements: data.elements ? this.prepareCopiedElements(elements) : [],
			};
		},
	},
	watch: {
		isOpen() {
			this.showModal = this.isOpen;
		},
	},
	methods: {
		getItemTitleAndStatus(title, status) {
			const titleObj = {
				metadata: this.$t("components.molecules.copyResult.metadata"),
				description: this.$t("common.labels.description"),
				tasks: this.$t("common.words.tasks"),
				lessons: this.$t("common.words.topics"),
				coursegroups: this.$t("common.words.courseGroups"),
				times: this.$t("common.words.times"),
			};
			if (title === "files" && status === "not-implemented") {
				return {
					title: this.$t("components.molecules.copyResult.fileCopy.error"),
					status: "failure",
				};
			}
			if (status === "not-implemented")
				return { title: titleObj[title] || title, status: "failure" };

			return {
				title: titleObj[title],
				status: status,
			};
		},
		prepareCopiedElements(items) {
			return items.map(({ elements = [], ...rest }) => {
				const item = { ...rest };
				const titleAndStatus = this.getItemTitleAndStatus(
					item.title,
					item.status
				);

				item.index = ++this.elementIndex;
				item.title = titleAndStatus.title;
				item.status = titleAndStatus.status;

				if (elements.length > 0) {
					const isSuccess = elements.every((ele) => ele.status === "success");
					item.status = isSuccess ? "success" : titleAndStatus.status;
					item.elements = this.prepareCopiedElements(elements);
				}
				return item;
			});
		},
		checkIfEveryElementsAreSuccess(items) {
			if (this.data.status !== "success") return false;
			return items.every(({ elements = [], ...rest }) => {
				const item = { ...rest };
				if (item.status !== "success") return false;
				if (elements.length > 0) {
					return (item.elements =
						this.checkIfEveryElementsAreSuccess(elements));
				}
				return item.status === "success";
			});
		},
		dialogClosed() {
			this.showModal = false;
			this.$emit("dialog-closed", false);
		},
	},
};
</script>
