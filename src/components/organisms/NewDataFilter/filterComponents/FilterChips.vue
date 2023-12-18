<template>
	<div class="mt-2">
		<template v-for="item in filter" :key="item">
			<v-chip
				:border="true"
				closable
				variant="text"
				class="ma-1"
				:close-icon="mdiCloseCircle"
				@click:close="onChipClose(item.item)"
				@click="onClick(item.item)"
			>
				{{ item.title }}
			</v-chip>
		</template>
	</div>
</template>
<script setup lang="ts">
import { mdiCloseCircle } from "@mdi/js";
import { ChipTitle } from "@/components/organisms/NewDataFilter/types/filterTypes";

defineProps({
	filter: {
		type: Array<ChipTitle>,
		required: true,
	},
	title: {
		type: String,
		default: "",
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
