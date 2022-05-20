<template>
	<v-custom-dialog
		v-model="isOpen"
		data-testid="delete-dialog-item"
		:size="375"
		has-buttons
		confirm-btn-title-key="common.actions.remove"
		@dialog-closed="$emit('dialog-closed', false)"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ $t("pages.room.itemDelete.title") }}
		</h2>
		<template slot="content">
			<p class="text-md mt-2">test</p>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@components/organisms/vCustomDialog.vue";

export default {
	components: { vCustomDialog },
	props: {
		data: {
			type: Object,
			required: true,
			default: () => {},
		},
		isOpen: {
			type: Boolean,
		},
	},
	data() {
		return {};
	},
	methods: {},
};
</script>
