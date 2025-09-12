<template>
	<div class="mt-2">
		<template v-for="filterItem in filters" :key="filterItem.item">
			<v-chip
				:border="true"
				closable
				variant="text"
				class="ma-1 filter-chip"
				:close-icon="mdiCloseCircle"
				data-testid="filter-chip"
				@click:close="onChipClose(filterItem.item)"
				@click="onClick(filterItem.item)"
			>
				{{ filterItem.title }}
			</v-chip>
		</template>
	</div>
</template>
<script setup lang="ts">
import { mdiCloseCircle } from "@icons/material";
import { ChipTitle } from "@/components/administration/DataFilter/types";

defineProps({
	filters: {
		type: Array<ChipTitle>,
		required: true,
	},
});

const emit = defineEmits(["remove:filter", "click:filter"]);

const onChipClose = (val: string) => {
	emit("remove:filter", val);
};

const onClick = (val: string) => {
	emit("click:filter", val);
};
</script>
