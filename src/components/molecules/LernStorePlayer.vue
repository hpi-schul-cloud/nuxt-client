<template>
	<iframe
		v-if="!loading"
		:src="iframeSrc"
		class="player-iframe"
		allowfullscreen="allowfullscreen"
		frameborder="0"
		scrolling="yes"
	></iframe>
	<div v-else class="d-flex justify-center align-center min-height-screen">
		<v-progress-circular indeterminate color="secondary" size="115" />
	</div>
</template>

<script :src="scriptSrc" charset="UTF-8"></script>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

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
		scriptSrc: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const model = ref(props.nodeId);
		const loading = ref(props.loading);
		const iframeSrc = ref(props.iframeSrc);
		const scriptSrc = ref(props.scriptSrc);

		watch(
			() => props.nodeId,
			(newValue: string) => {
				model.value = newValue;
			}
		);

		return {
			loading,
			iframeSrc,
			scriptSrc,
		};
	},
	async mounted() {
		await this.getPlayer();
	},
	methods: {
		async getPlayer() {
			await this.$axios
				.get(`/v1/edu-sharing/player/${this.nodeId}`)
				.then(
					(response) => (
						(this.iframeSrc = response.data.iframe_src),
						(this.scriptSrc = response.data.script_src)
					)
				);
			this.loading = false;
		},
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
