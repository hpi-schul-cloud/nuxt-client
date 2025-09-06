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
<script setup lang="ts">
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";
import BaseModal from "../base/BaseModal.vue";

type Props = {
	title: string;
	description: string;
	percent: number;
};

defineProps<Props>();
</script>

<style lang="scss" scoped>
.rounded,
:deep(.v-progress-linear__determinate) {
	border-radius: 100vmax !important;
}
</style>
