<template>
	<hello-world />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import HelloWorld from "@/components/VitestProofOfConcept.vue";

export default defineComponent({
	name: "HelloPage",

	components: {
		HelloWorld,
	},
});
</script>
