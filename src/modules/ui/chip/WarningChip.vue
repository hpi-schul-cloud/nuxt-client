<template>
	<BaseChip color="warning" :icon="icon"> <slot /> </BaseChip>
</template>

<script setup lang="ts">
import BaseChip from "./BaseChip.vue";
import { mdiAlertCircle } from "@icons/material";
import { PropType } from "vue";
import { IconProps } from "vuetify";

defineProps({
	icon: {
		type: String as PropType<IconProps["icon"]>,
		required: false,
		default: mdiAlertCircle,
	},
});
</script>
