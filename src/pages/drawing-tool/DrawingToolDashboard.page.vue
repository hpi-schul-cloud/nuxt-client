<template>
	<div class="d-flex flex-column">
		<p>TLDRAW iajdfhoihsdf</p>
		<button @click="sendEvent()">CREATE TLDRAW</button>
	</div>
</template>

<script>
import axios from "axios";

export default {
	render() {
		return h("div", "elo");
	},
	methods: {
		async sendEvent() {
			axios.post("http://localhost:8080/paintings").then((response) => {
				if (response.status === 200) {
					this.$router.push(`/tldraw/${response.data.id}`);
				}
			});
		},
	},
};
</script>
<style lang="scss" scoped></style>
