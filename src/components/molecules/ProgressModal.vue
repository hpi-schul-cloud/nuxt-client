<template>
	<base-modal v-bind="$attrs" v-on="$listeners">
		<template #body>
			<modal-body-info :title="title" :description="description" />
			<v-progress-linear
				:value="percent"
				height="15"
				background-color="grey lighten-1"
				class="rounded"
			/>
		</template>
	</base-modal>
</template>
<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
export default {
	components: {
		ModalBodyInfo,
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
::v-deep .v-progress-linear__determinate {
	border-radius: var(--radius-round) !important;
}
</style>
