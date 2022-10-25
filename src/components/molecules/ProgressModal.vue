<template>
	<base-modal v-bind="$attrs" v-on="$listeners">
		<template #body>
			<modal-body-info :title="title" :description="description" />
			<base-progressbar :value="percent" :max="100" style="width: 100%" />
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
