<template>
	<div>
		<video
			ref="videoRef"
			controls
			class="video"
			loading="lazy"
			:src="src"
			:alt="name"
		/>
		<v-app-bar flat color="transparent" class="menu">
			<v-spacer></v-spacer>
			<slot></slot>
		</v-app-bar>
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

.menu {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
