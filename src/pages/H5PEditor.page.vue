<template>
	<iframe
		v-if="!loading"
		:src="iframeSrc"
		class="editor-iframe"
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
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "H5PEditor",
	props: {
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
	mounted() {
		this.iframeSrc =
			window.location.origin +
			`/api/v3/h5p-editor/${this.$route.params.id}/edit`;
		this.loading = false;
	},
	setup(props) {
		const loading = ref(props.loading);
		let iframeSrc = ref(props.iframeSrc);
		const scriptSrc = ref(props.scriptSrc);
		return {
			loading,
			iframeSrc,
			scriptSrc,
		};
	},
});
</script>

<style scoped>
.editor-iframe {
	width: 100%;
	height: 100%;
	border: none;
	background-color: #b1b1b1;
}
</style>
