<template>
	<base-modal :active.sync="active">
		<template v-slot:body>
			<modal-body-info :title="title" :description="description">
				<template v-slot:icon>
					<base-spinner :color="color" size="large" />
				</template>
			</modal-body-info>
		</template>
		<template v-slot:footer>
			<center-slot class="mb--md">
				<base-button design="primary">Abbrechen</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>
<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import CenterSlot from "@components/atoms/CenterSlot";
export default {
	components: {
		ModalBodyInfo,
		CenterSlot,
	},
	props: {
		active: {
			type: Boolean,
			reqired: true,
		},
		color: {
			type: String,
			default: "var(--color-primary)",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
