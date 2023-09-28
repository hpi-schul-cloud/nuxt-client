<template>
	<div>
		<video controls class="video" loading="lazy" :src="src" :alt="name" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VideoDisplay",
	props: {
		src: { type: String, required: true },
		name: { type: String, required: true },
	},
});
</script>
<style scoped>
.video {
	width: 100%;
}
</style>
