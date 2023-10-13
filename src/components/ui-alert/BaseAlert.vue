<template>
	<v-alert :color="color" :icon="icon" text class="mb-0">
		<div class="black--text" v-if="$slots.default">
			<slot></slot>
		</div>
	</v-alert>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { VuetifyIcon } from "vuetify/types/services/icons";

export default defineComponent({
	name: "BaseAlert",
	props: {
		color: { type: String, required: false },
		icon: { type: String as PropType<VuetifyIcon>, required: false },
	},
});
</script>
