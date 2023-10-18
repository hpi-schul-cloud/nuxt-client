<template>
	<DefaultWireframe ref="main" :full-width="true">
		Hello World
	</DefaultWireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: { DefaultWireframe },
	props: {
		groupId: {
			type: String,
			required: true,
		},
	},
});
</script>
