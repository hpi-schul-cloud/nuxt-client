<template>
	<div>
		<video controls class="video" loading="lazy" :src="src" :alt="name" />
		<ContentElementBar class="menu">
			<template #menu><slot></slot></template>
		</ContentElementBar>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ContentElementBar } from "@ui-board";

export default defineComponent({
	name: "VideoDisplay",
	props: {
		src: { type: String, required: true },
		name: { type: String, required: true },
	},
	components: { ContentElementBar },
});
</script>
<style scoped>
.video {
	width: 100%;
}

.menu {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
