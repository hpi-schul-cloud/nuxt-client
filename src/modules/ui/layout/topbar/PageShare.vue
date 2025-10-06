<template>
	<div class="pa-4 d-flex flex-column align-center max-width">
		<div class="pb-2">
			{{ $t("global.topbar.MenuQrCode.qrHintText") }}
		</div>
		<QRCode ref="qrCode" :url="url" />
		<div>
			<VBtn
				variant="outlined"
				:prepend-icon="mdiPrinter"
				data-testid="qr-code-print"
				:aria-label="$t('ui-layout.topbar.pageShare.printQRCode')"
				@click="openPrintMenu"
			>
				{{ $t("global.topbar.MenuQrCode.print") }}
			</VBtn>
			<VBtn variant="outlined" :prepend-icon="mdiContentCopy" class="ml-2" data-testid="qr-code-copy" @click="onCopy">
				{{ $t("common.actions.shareLink") }}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { mdiContentCopy, mdiPrinter } from "@icons/material";
import { QRCode } from "@ui-qr-code";
import { ComponentPublicInstance, ref } from "vue";

const props = defineProps({
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

const onCopy = () => navigator.clipboard.writeText(props.url);
</script>

<style scoped>
.max-width {
	max-width: 300px;
}
</style>
