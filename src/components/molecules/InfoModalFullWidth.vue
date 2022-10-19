<template>
	<base-modal
		v-bind="$attrs"
		design="white"
		class="modal-container"
		v-on="$listeners"
	>
		<template #header></template>
		<template #body>
			<modal-body-info :title="title" :description="description">
				<template #icon>
					<slot name="icon" />
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<center-slot class="mb--md">
				<base-button class="btn" :design="design" @click="close">{{
					btn
				}}</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>

<script>
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo";
import CenterSlot from "@/components/atoms/CenterSlot";

export default {
	components: {
		ModalBodyInfo,
		CenterSlot,
	},
	props: {
		design: {
			type: String,
			default: "info",
		},
		title: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			default: "",
		},
		btn: {
			type: String,
			default: "OK",
		},
	},
	methods: {
		close() {
			this.$emit("update:active", false);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.btn {
	width: 100% !important;
	margin-right: var(--space-md) !important;
	margin-left: var(--space-md) !important;
}

.modal-mask {
	position: unset !important;
}

.modal-container {
	max-width: calc(0.6 * var(--size-content-width-max)) !important;
}
</style>
