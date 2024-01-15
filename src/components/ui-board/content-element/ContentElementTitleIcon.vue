<template>
	<v-icon color="black" size="20" data-testid="content-element-title-icon">{{
		icon
	}}</v-icon>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IconProps } from "vuetify";

export default defineComponent({
	name: "ContentElementTitleIcon",
	props: {
		icon: { type: String as PropType<IconProps["icon"]>, required: true },
	},
});
</script>
