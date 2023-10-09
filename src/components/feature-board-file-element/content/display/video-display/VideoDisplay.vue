<template>
	<div>
		<video
			v-if="!formatError"
			ref="videoRef"
			controls
			class="video"
			loading="lazy"
			:src="src"
			:alt="name"
		/>
		<div v-else class="pa-8">
			<img src="../../../../../assets/img/pc_repair.png" />
			Vorschau nicht möglich. Das Videoformat wird von Deinem Browser oder
			Betriebssystem nicht unterstützt.
		</div>

		<v-app-bar flat color="transparent" class="menu">
			<v-spacer></v-spacer>
			<slot></slot>
		</v-app-bar>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
	name: "VideoDisplay",
	props: {
		src: { type: String, required: true },
		name: { type: String, required: true },
	},
	setup(props) {
		const formatError = ref(false);
		const videoRef = ref<HTMLVideoElement | null>(null);

		onMounted(() => {
			videoRef.value?.addEventListener("error", () => {
				formatError.value = true;
			});
		});

		return {
			formatError,
			videoRef,
		};
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
