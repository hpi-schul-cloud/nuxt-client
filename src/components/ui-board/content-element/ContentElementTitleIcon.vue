<template>
	<div>
		<v-icon color="black" size="18" data-testid="content-element-title-icon">{{
			icon
		}}</v-icon>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { VuetifyIcon } from "vuetify/types/services/icons";

export default defineComponent({
	name: "ContentElementTitleIcon",
	props: {
		icon: { type: String as PropType<VuetifyIcon>, required: true },
	},
});
</script>
