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

<script setup lang="ts">
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";

type Props = {
	design?: string;
	title?: string;
	description?: string;
	btn?: string;
};

withDefaults(defineProps<Props>(), {
	design: "info",
	title: "",
	description: "",
	btn: "OK",
});

const emit = defineEmits<{
	(e: "update:active", value: boolean): void;
}>();

const close = () => {
	emit("update:active", false);
};
</script>

<style lang="scss" scoped>
.btn {
	width: 100% !important;
	margin-right: 16px !important;
	margin-left: 16px !important;
}

.modal-mask {
	position: unset !important;
}

.modal-container {
	max-width: calc(0.6 * var(--content-max-width)) !important;
}
</style>
