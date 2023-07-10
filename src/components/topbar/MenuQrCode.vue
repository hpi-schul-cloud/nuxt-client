<template>
	<div class="pa-4">
		<base-qr-code ref="qrCode" :url="url" />
		<div class="pb-2">
			{{ $t("components.legacy.MenuQrCode.qrHintText") }}
		</div>
		<v-btn outlined color="secondary" @click="openPrintMenu">
			<v-icon left>{{ mdiPrinter }}</v-icon>
			{{ $t("components.legacy.MenuQrCode.print") }}
		</v-btn>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
		const qrCode = ref<HTMLDivElement | null>(null);

		const openPrintMenu = () => {
			const win = window.open();

			if (qrCode.value !== null) {
				win?.document.write(qrCode.value.innerHTML);
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
