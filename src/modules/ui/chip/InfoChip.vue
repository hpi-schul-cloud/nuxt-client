<template>
	<BaseChip color="info" :icon="icon"> <slot /> </BaseChip>
</template>

<script setup lang="ts">
import BaseChip from "./BaseChip.vue";
import { mdiInformation } from "@icons/material";
import { PropType } from "vue";
import { IconProps } from "vuetify";

defineProps({
	icon: {
		type: String as PropType<IconProps["icon"]>,
		required: false,
		default: mdiInformation,
	},
});
</script>
