<template>
	<base-modal v-bind="$attrs" v-on="$listeners">
		<template #body>
			<modal-body-info :title="title" :description="description">
				<template #icon>
					<base-spinner :color="color" size="large" />
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<center-slot class="mb--md">
				<base-button design="primary" @click="$emit('update:active', false)">
					{{ btnText }}
				</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>
<script>
import CenterSlot from "@/components/atoms/CenterSlot";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo";
export default {
	components: {
		ModalBodyInfo,
		CenterSlot,
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

<style lang="scss" scoped>
@import "@styles";
</style>
