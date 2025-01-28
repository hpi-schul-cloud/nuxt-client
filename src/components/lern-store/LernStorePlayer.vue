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

<script :src="scriptSrc" charset="UTF-8"></script>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import { $axios } from "@/utils/api";

const props = defineProps({
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
	scriptSrc: {
		type: String,
		default: "",
	},
});

const model = ref("");
const isLoading = ref(true);
const iFrameSrc = ref("");
const scriptSrcString = ref("");

watchEffect(() => {
	model.value = props.nodeId;
	isLoading.value = props.loading;
	iFrameSrc.value = props.iframeSrc;
	scriptSrcString.value = props.scriptSrc;
});

onMounted(async () => {
	await $axios.get(`/v1/edu-sharing/player/${model.value}`).then((response) => {
		iFrameSrc.value = response.data.iframe_src;
		scriptSrcString.value = response.data.script_src;
	});
	isLoading.value = false;
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
