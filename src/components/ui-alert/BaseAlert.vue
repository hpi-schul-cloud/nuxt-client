<template>
	<v-alert :color="color" :icon="icon" text class="mb-0">
		<div class="black--text" v-if="$slots.default">
			<slot />
		</div>
	</v-alert>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IconProps } from "vuetify/lib/framework.mjs";

export default defineComponent({
	name: "BaseAlert",
	props: {
		color: { type: String },
		icon: { type: String as PropType<IconProps["icon"]> },
	},
});
</script>
