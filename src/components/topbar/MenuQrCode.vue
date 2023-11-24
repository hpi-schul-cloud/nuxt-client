<template>
	<div class="pa-4">
		<base-qr-code ref="qrCode" :url="url" />
		<div class="pb-2">
			{{ $t("global.topbar.MenuQrCode.qrHintText") }}
		</div>
		<v-btn
			variant="outlined"
			:prepend-icon="mdiPrinter"
			color="secondary"
			@click="openPrintMenu"
		>
			{{ $t("global.topbar.MenuQrCode.print") }}
		</v-btn>
	</div>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import { mdiPrinter } from "@mdi/js";

export default defineComponent({
	name: "MenuQrCode",
	props: {
		url: {
			type: String,
			default: window.location.href,
		},
	},
	setup() {
		const qrCode = ref<ComponentPublicInstance<HTMLDivElement>>();

		const openPrintMenu = () => {
			const win = window.open();

			if (qrCode.value) {
				win?.document.write(qrCode.value.$el.innerHTML);
				win?.print();
				win?.close();
			}
		};

		return {
			mdiPrinter,
			qrCode,
			openPrintMenu,
		};
	},
});
</script>
