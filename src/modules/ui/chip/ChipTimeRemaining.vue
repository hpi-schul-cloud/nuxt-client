<template>
	<WarningChip :icon="mdiTimerSandComplete" size="small" variant="tonal">
		{{ dueDateDayjs }}
	</WarningChip>
</template>

<script setup lang="ts">
import WarningChip from "./WarningChip.vue";
import { fromNowUtc } from "@/utils/date-time.utils";
import { mdiTimerSandComplete } from "@icons/material";
import { computed } from "vue";

const props = defineProps({
	dueDate: {
		type: String,
		required: true,
	},
});

const dueDateDayjs = computed(() => fromNowUtc(props.dueDate));
</script>
