<template>
	<base-modal v-bind="$attrs">
		<template #body>
			<modal-body-info :title="title" :description="description" />
			<VProgressLinear :model-value="percent" height="15" bg-color="grey-lighten-1" class="rounded" />
		</template>
	</base-modal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/base/BaseModal.vue";
import ModalBodyInfo from "@/components/legacy/ModalBodyInfo.vue";

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
