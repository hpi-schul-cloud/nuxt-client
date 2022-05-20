<template>
	<v-custom-dialog
		v-model="isOpen"
		data-testid="delete-dialog-item"
		:size="375"
		has-buttons
		:buttons="['edit', 'close', 'confirm']"
		confirm-btn-title-key="common.actions.remove"
		@dialog-closed="$emit('dialog-closed', false)"
		@dialog-edit="$emit('process-edit', data.id)"
		@dialog-confirmed="$emit('process-delete', data.id)"
	>
		<h2 slot="title" class="text-h4 my-2">Copying result of task</h2>
		<template slot="content">
			<v-divider class="mb-4"></v-divider>
			<copy-result
				v-if="data.elements"
				:items="copiedItems"
				:show-spinner="!data.elements"
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
			return [
				{
					id: data.id,
					status: data.status,
					title: data.title,
					type: data.type,
					index: this.elementIndex,
					elements: data.elements
						? this.prepareCopiedElements(data.elements)
						: [],
				},
			];
		},
	},
	methods: {
		prepareCopiedElements(items) {
			return items.map(({ elements = [], ...rest }) => {
				const item = { ...rest };
				item.index = ++this.elementIndex;
				if (item.status === "not-doing" || item.status === "not-implemented")
					item.status = "failure";
				if (elements.length) {
					const isSuccess = elements.every((ele) => ele.status === "success");
					item.status = isSuccess ? "success" : item.status;
					item.elements = this.prepareCopiedElements(elements);
				}
				return item;
			});
		},
	},
};
</script>
