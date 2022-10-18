<template>
	<div class="pa-4">
		<base-qr-code ref="qrcode" :url="url" />
		<div class="pb-2">
			{{ $t("components.legacy.MenuQrCode.qrHintText") }}
		</div>
		<v-btn outlined color="secondary" @click="openPrintMenu">
			<v-icon left>{{ mdiPrinter }}</v-icon>
			{{ $t("components.legacy.MenuQrCode.print") }}
		</v-btn>
	</div>
</template>

<script>
import { mdiPrinter } from "@mdi/js";

export default {
	props: {
		url: {
			type: String,
			default: window.location.href,
		},
	},
	data() {
		return {
			mdiPrinter,
		};
	},
	methods: {
		openPrintMenu: function () {
			const win = window.open();
			win.document.write(this.$refs.qrcode.$el.innerHTML);
			win.print();
			win.close();
		},
	},
};
</script>
