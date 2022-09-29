<template>
	<default-layout>
		<router-view />
	</default-layout>
</template>

<script>
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default defineComponent({
	components: {
		DefaultLayout,
	},
});
</script>
