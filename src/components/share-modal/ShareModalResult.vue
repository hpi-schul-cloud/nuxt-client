<template>
	<div>
		<v-text-field
			filled
			:value="shareUrl"
			readonly
			label="Link Kurskopie"
		></v-text-field>
		<div class="mb-4">
			<div class="d-flex d-sm-flex justify-content-space-between">
				<v-btn plain large :height="84" @click="onMailShareUrl(shareUrl)">
					<span class="d-flex flex-column justify-content-center">
						<span class="mb-2">
							<v-icon large>{{ mdiEmailOutline }}</v-icon></span
						>
						<span>Als Mail versenden</span>
					</span>
				</v-btn>
				<v-btn plain large :height="84" @click="onCopy(shareUrl)">
					<span class="d-flex flex-column justify-content-center">
						<span class="mb-2">
							<v-icon large>{{ mdiContentCopy }}</v-icon></span
						>
						<span>Link kopieren</span>
					</span>
				</v-btn>
				<v-btn plain large :height="84" @click="onGenerateQrCode">
					<span class="d-flex flex-column justify-content-center">
						<span class="mb-2">
							<v-icon large>{{ mdiQrcode }}</v-icon></span
						>
						<span>QR-Code scannen</span>
						<!--            WIP use native share function on smartphones and tables-->
					</span>
				</v-btn>
			</div>
		</div>
		<v-expand-transition>
			<div
				v-if="isShowQrCode"
				class="d-flex justify-content-center overflow-hidden"
			>
				<base-qr-code :url="shareUrl"></base-qr-code>
			</div>
		</v-expand-transition>
	</div>
</template>

<script>
import { mdiContentCopy, mdiEmailOutline, mdiQrcode } from "@mdi/js";
import { defineComponent, ref } from "@vue/composition-api";
import BaseQrCode from "@basecomponents/BaseQrCode";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModalResult",
	components: {
		BaseQrCode,
	},
	props: {
		shareUrl: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }) {
		const onMailShareUrl = (shareUrl) => {
			const subject = `Kurs zum Importieren`;
			const body = encodeURIComponent(`Link zum Kurs: ${shareUrl}`);
			window.location.assign(`mailto:?subject=${subject}&body=${body}`);
			emit("done");
		};

		const onCopy = (shareUrl) => {
			navigator.clipboard.writeText(shareUrl);
			emit("done");
		};

		const isShowQrCode = ref(false);
		const onGenerateQrCode = () => {
			isShowQrCode.value = true;
		};

		return {
			onMailShareUrl,
			onCopy,
			onGenerateQrCode,
			isShowQrCode,
			mdiEmailOutline,
			mdiContentCopy,
			mdiQrcode,
		};
	},
});
</script>
