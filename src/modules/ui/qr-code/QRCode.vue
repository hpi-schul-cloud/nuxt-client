<template>
	<div ref="QRCode" class="qrcode pt-2 pb-4" />
</template>

<script setup lang="ts">
// @ts-expect-error not a typescript package
// TODO - replace with package that supports ts (e.g. qrcode-vue, vue-qrcode,..)
import kjua from "kjua";
import { onMounted, ref } from "vue";

const props = defineProps({
	url: {
		type: String,
		default: window.location.href,
	},
});

const QRCode = ref();

const createQrCode = () => {
	const image = kjua({ text: props.url, render: "image" });

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
}
</style>
