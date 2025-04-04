<template>
	<base-modal v-bind="$attrs" class="modal-container">
		<template #header />
		<template #body>
			<modal-body-info :title="title" :description="description">
				<template #icon>
					<slot name="icon" />
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<div class="d-flex justify-center align-center mb-4 px-4">
				<v-btn variant="flat" block :color="design" @click="close">{{
					btn
				}}</v-btn>
			</div>
		</template>
	</base-modal>
</template>

<script>
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";

export default {
	components: {
		ModalBodyInfo,
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
	emits: ["update:active"],
	methods: {
		close() {
			this.$emit("update:active", false);
		},
	},
};
</script>

<style lang="scss" scoped>
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
