<template>
	<div>
		<button class="tldraw-button" @click="openLink" target="_blank">
			<tldrawIcon class="svg-icon" />
			<span class="button-text">{{ buttonText }}</span>
		</button>
	</div>
</template>
<script>
import tldrawIcon from "../../../icons/custom/tldraw-icon.vue";

export default {
	props: {
		buttonText: {
			type: String,
			default: "Tldraw",
		},
	},
	components: {
		tldrawIcon,
	},
	data() {
		return {
			tldrawServerURL: null,
		};
	},
	created() {
		this.fetchTldrawServerURL();
	},
	methods: {
		async fetchTldrawServerURL() {
			try {
				const response = await fetch(`${window.location.origin}/tldraw`);
				const data = await response.json();
				if (data.tldrawServerURL) {
					this.tldrawServerURL = data.tldrawServerURL;
				}
			} catch (error) {
				console.error("Error fetching tldrawServerURL:", error);
			}
		},
		openLink() {
			if (this.tldrawServerURL) {
				window.open(this.tldrawServerURL, "_blank");
			} else {
				console.error("tldrawServerURL is not available.");
			}
		},
	},
};
</script>
<style>
.tldraw-button {
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 10px 20px;
	color: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	cursor: pointer;
	height: 70px;
	width: 330px;
	margin: 8px;
}

.tldraw-button:hover {
	background-color: #54616e1a;
}
.button-text {
	color: #1b1b1b;
	margin-left: 10px;
}
.svg-icon {
	width: 20px;
	height: 20px;
}
</style>
