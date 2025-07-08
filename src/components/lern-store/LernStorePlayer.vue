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
import { watch, onMounted, toRef } from "vue";
import { $axios } from "@/utils/api";

type Props = {
	nodeId?: string;
	loading?: boolean;
	iframeSrc?: string;
	scriptSrc?: string;
};

const props = withDefaults(defineProps<Props>(), {
	nodeId: "",
	loading: true,
	iframeSrc: "",
	scriptSrc: "",
});

const model = toRef(props, "nodeId");
const loading = toRef(props, "loading");
const iframeSrc = toRef(props, "iframeSrc");
const scriptSrc = toRef(props, "scriptSrc");

watch(
	() => props.nodeId,
	(newValue: string) => {
		model.value = newValue;
	}
);

onMounted(async () => {
	await $axios.get(`/v1/edu-sharing/player/${model.value}`).then((response) => {
		iframeSrc.value = response.data.iframe_src;
		scriptSrc.value = response.data.script_src;
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
