<template>
	<div class="pa-4">
		<BaseQrCode ref="qrCode" :url="url" />
		<div class="pb-2">
			{{ $t("global.topbar.MenuQrCode.qrHintText") }}
		</div>
		<VBtn variant="outlined" :prepend-icon="mdiPrinter" @click="openPrintMenu">
			{{ $t("global.topbar.MenuQrCode.print") }}
		</VBtn>
	</div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, ref } from "vue";
import { mdiPrinter } from "@mdi/js";

defineProps({
	url: {
		type: String,
		default: window.location.href,
	},
});
const qrCode = ref<ComponentPublicInstance<HTMLDivElement>>();

const openPrintMenu = () => {
	const win = window.open();

	if (qrCode.value) {
		win?.document.write(qrCode.value.$el.innerHTML);
		win?.print();
		win?.close();
	}
};
</script>
