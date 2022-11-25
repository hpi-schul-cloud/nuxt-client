<template>
	<div ref="qrcode" class="qrcode" />
</template>

<script>
import kjua from "kjua";

export default {
	props: {
		url: {
			type: String,
			default: window.location.href,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	mounted: function () {
		this.createQrCode();
	},
	methods: {
		createQrCode: function () {
			const image = kjua({ text: this.url, render: "image" });
			image.alt = this.url;
			const qrbox = this.$refs.qrcode;
			qrbox.append(image);
		},
	},
};
</script>

<style lang="scss" scoped>
.qrcode {
	min-width: 200px;
	min-height: 200px;

	img {
		max-width: none;
	}
}
</style>
