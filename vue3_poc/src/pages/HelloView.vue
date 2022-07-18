<template>
	<hello-world />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
	name: "HelloView",

	components: {
		HelloWorld,
	},
});
</script>
