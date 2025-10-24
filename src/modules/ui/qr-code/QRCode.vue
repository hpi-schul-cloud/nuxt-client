<template>
	<QrcodeSvg class="pt-2 pb-4 qrcode" :value="url" />
</template>

<script setup lang="ts">
import { QrcodeSvg } from "qrcode.vue";

defineProps({
	url: {
		type: String,
		default: window.location.href,
	},
});
</script>

<style lang="scss" scoped>
.qrcode {
	min-width: 200px;
	min-height: 200px;
}
</style>
