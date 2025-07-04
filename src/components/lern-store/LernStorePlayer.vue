<template>
	<iframe
		v-if="!loading"
		:src="iframeSrc"
		class="player-iframe"
		allowfullscreen="allowfullscreen"
		frameborder="0"
		scrolling="yes"
	/>
	<div v-else class="d-flex justify-center align-center min-height-screen">
		<v-progress-circular indeterminate size="115" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import { $axios } from "@/utils/api";

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

export default defineComponent({
	name: "LernStorePlayer",
	props: {
		nodeId: {
			type: String,
			default: "",
		},
		loading: {
			type: Boolean,
			default: true,
		},
		iframeSrc: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const model = ref(props.nodeId);
		const loading = ref(props.loading);
		const iframeSrc = ref(props.iframeSrc);

		watch(
			() => props.nodeId,
			(newValue: string) => {
				model.value = newValue;
			}
		);

		onMounted(async () => {
			await $axios
				.get(`/v1/edu-sharing/player/${model.value}`)
				.then((response) => {
					iframeSrc.value = response.data.iframe_src;
					loadScript(response.data.script_src);
				});
			loading.value = false;
		});

		return {
			loading,
			iframeSrc,
		};
	},
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
