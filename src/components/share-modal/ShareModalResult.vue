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
						<!--         WIP   move QR Code component here and remove from state and remove step 3 -->
						<!--            WIP use native share function on smartphones and tables-->
					</span>
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
import { mdiContentCopy, mdiEmailOutline, mdiQrcode } from "@mdi/js";
import { defineComponent } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModalResult",
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

		const onGenerateQrCode = () => {
			emit("generate-qr-code");
		};

		return {
			onMailShareUrl,
			onCopy,
			onGenerateQrCode,
			mdiEmailOutline,
			mdiContentCopy,
			mdiQrcode,
		};
	},
});
</script>
