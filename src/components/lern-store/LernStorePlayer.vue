<template>
	<iframe
		v-if="!loading"
		:src="iframeSrc"
		class="player-iframe"
		allowfullscreen
		frameborder="0"
		scrolling="yes"
	/>
	<div v-else class="d-flex justify-center align-center min-height-screen">
		<v-progress-circular indeterminate size="115" />
	</div>
</template>

<script setup lang="ts">
import { $axios } from "@/utils/api";
import { onMounted, ref } from "vue";

type Props = {
	nodeId?: string;
};

const props = withDefaults(defineProps<Props>(), {
	nodeId: "",
});

const loading = ref(true);
const iframeSrc = ref("");

function loadScript(scriptSrc: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = scriptSrc;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () =>
			reject(new Error(`Failed to load script: ${scriptSrc}`));
		document.body.appendChild(script);
	});
}

onMounted(async () => {
	await $axios
		.get(`/v1/edu-sharing/player/${props.nodeId}`)
		.then((response) => {
			iframeSrc.value = response.data.iframe_src;
			loadScript(response.data.script_src);
		});
	loading.value = false;
});
</script>

<style scoped>
.spinner {
	top: 0 !important;
}

.player-iframe {
	width: 100%;
	border: none;
}
</style>
