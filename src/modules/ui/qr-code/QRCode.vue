<template>
	<div ref="QRCode" class="qrcode" tabindex="0" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// @ts-expect-error not a typescript package
// TODO - replace with package that supports ts (e.g. qrcode-vue, vue-qrcode,..)
import kjua from "kjua";

const props = defineProps({
	url: {
		type: String,
		default: window.location.href,
	},
});

const QRCode = ref();

const createQrCode = () => {
	const image = kjua({ text: props.url, render: "image" });

	// TODO - better alt text
	image.alt = props.url;
	const qrbox = QRCode.value;
	qrbox.append(image);
};

onMounted(() => {
	createQrCode();
});
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
