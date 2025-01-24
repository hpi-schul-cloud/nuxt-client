<template>
	<base-modal v-bind="$attrs">
		<template #body>
			<modal-body-info :title="title" :description="description" />
			<v-progress-linear
				:model-value="percent"
				height="15"
				bg-color="grey-lighten-1"
				class="rounded"
			/>
		</template>
	</base-modal>
</template>
<script>
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";
import BaseModal from "../base/BaseModal.vue";

export default {
	components: {
		ModalBodyInfo,
		BaseModal,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		percent: {
			type: Number,
			required: true,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
.rounded,
:deep(.v-progress-linear__determinate) {
	border-radius: var(--radius-round) !important;
}
</style>
