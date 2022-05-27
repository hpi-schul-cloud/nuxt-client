<template>
	<v-custom-dialog
		v-model="isOpen"
		data-testid="delete-dialog-item"
		:size="480"
		has-buttons
		:buttons="['close']"
		confirm-btn-title-key="common.actions.remove"
		@dialog-closed="$emit('dialog-closed', false)"
		@dialog-edit="$emit('process-edit', data.id)"
		@dialog-confirmed="$emit('process-delete', data.id)"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ $t("components.molecules.copyResult.title") }}
		</h2>
		<template slot="content">
			<v-divider class="mb-4"></v-divider>
			<label class="text-md mt-2">
				{{ data.title }}
			</label>
			<copy-result
				v-if="data.elements"
				:items="copiedItems.elements"
				:show-spinner="loading"
			>
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
		};
	},
	computed: {
		copiedItems() {
			const { data } = this;
			if (this.checkIfEveryElementsAreSuccess(this.data.elements)) {
				return {
					id: data.id,
					status: data.status,
					title: data.title,
					type: data.type,
					index: this.elementIndex,
					completed: true,
					elements: [
						{
							id: data.id,
							status: "success",
							title: this.$t(
								"components.molecules.copyResult.successfullyCopied"
							),
							type: data.type,
						},
					],
				};
			}

			return {
				id: data.id,
				status: data.status,
				title: data.title,
				type: data.type,
				index: this.elementIndex,
				elements: data.elements
					? this.prepareCopiedElements(
							data.elements.filter((item) => item.status !== "not-doing")
					  )
					: [],
			};
		},
	},
	methods: {
		prepareCopiedElements(items) {
			return items.map(({ elements = [], ...rest }) => {
				const item = { ...rest };
				item.index = ++this.elementIndex;
				if (item.title === "files" && item.status === "not-implemented") {
					item.title = this.$t(
						"components.molecules.copyResult.fileCopy.error"
					);
				}
				item.title =
					item.title === "metadata"
						? this.$t("components.molecules.copyResult.metadata")
						: item.title;
				item.title =
					item.title === "description"
						? this.$t("common.labels.description")
						: item.title;
				if (item.status === "not-implemented") item.status = "failure";
				if (elements.length > 0) {
					const isSuccess = elements.every((ele) => ele.status === "success");
					item.status = isSuccess ? "success" : item.status;
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
	},
};
</script>
