<template>
	<div class="d-flex flex-column">
		<p>TLDRAW</p>
		<a :href="newWindowUrl" @click="openNewWindow"> NEW WINDOW </a>
	</div>
</template>

<script>
import { useRoute } from "vue-router/composables";

export default {
	props: {
		buttonText: {
			type: String,
			default: "Tldraw",
		},
	},
	setup() {
		const route = useRoute();
		const boardId = route.params?.id;
		const urlWithRoom = `/tldraw?roomName=${boardId}`;

		const newWindowUrl = `http://localhost:3046${urlWithRoom}`;

		const openNewWindow = () => {
			window.open(newWindowUrl, "_blank");
		};

		return {
			newWindowUrl,
			openNewWindow,
		};
	},
};
</script>
