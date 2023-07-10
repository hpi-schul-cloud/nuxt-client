<template>
	<base-modal v-bind="$attrs" v-on="$listeners">
		<template #body>
			<modal-body-info :title="title" :description="description">
				<template #icon>
					<v-progress-circular
						indeterminate
						width="2"
						:color="color"
						size="60"
						class="mb-6"
					/>
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<div class="d-flex justify-center align-items mb-4">
				<v-btn color="primary" depressed @click="$emit('update:active', false)">
					{{ btnText }}
				</v-btn>
			</div>
		</template>
	</base-modal>
</template>
<script>
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo";
export default {
	components: {
		ModalBodyInfo,
	},
	props: {
		color: {
			type: String,
			default: "var(--v-primary-base)",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		btnText: {
			type: String,
			default: function () {
				return this.$t("common.actions.cancel");
			},
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>
