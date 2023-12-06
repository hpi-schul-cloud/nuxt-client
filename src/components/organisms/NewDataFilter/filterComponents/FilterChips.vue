<template>
	<div class="mt-2">
		<template v-for="item in filter" :key="item">
			<v-chip
				:border="true"
				closable
				variant="text"
				class="mx-1 filter-chip"
				:close-icon="mdiCloseCircle"
				@click:close="onChipClose(item)"
			>
				{{ item }}
			</v-chip>
		</template>
	</div>
</template>
<script setup lang="ts">
import { mdiCloseCircle } from "@mdi/js";

defineProps({
	filter: {
		type: Array<string>,
		required: true,
	},
});

const emit = defineEmits(["remove:filter"]);

const onChipClose = (val: string) => {
	emit("remove:filter", val);
};
</script>
