<template>
	<div>
		<v-text-field
			filled
			:value="shareUrl"
			readonly
			:label="`${$t('components.molecules.shareCourse.result.linkLabel')}`"
		></v-text-field>
		<div class="mb-4">
			<div class="d-flex d-sm-flex justify-content-space-between">
				<v-btn plain large :height="84" @click="onMailShareUrl(shareUrl)">
					<span class="d-flex flex-column justify-content-center">
						<span class="mb-2">
							<v-icon large>{{ mdiEmailOutline }}</v-icon></span
						>
						<span>{{
							$t("components.molecules.shareCourse.result.mailShare")
						}}</span>
					</span>
				</v-btn>
				<v-btn plain large :height="84" @click="onCopy(shareUrl)">
					<span class="d-flex flex-column justify-content-center">
						<span class="mb-2">
							<v-icon large>{{ mdiContentCopy }}</v-icon></span
						>
						<span>{{
							$t("components.molecules.shareCourse.result.copyClipboard")
						}}</span>
					</span>
				</v-btn>
				<v-btn plain large :height="84" @click="onGenerateQrCode">
					<span class="d-flex flex-column justify-content-center">
						<span class="mb-2">
							<v-icon large>{{ mdiQrcode }}</v-icon></span
						>
						<span>{{
							$t("components.molecules.shareCourse.result.qrCodeScan")
						}}</span>
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
import BaseQrCode from "@basecomponents/BaseQrCode";
import { mdiContentCopy, mdiEmailOutline, mdiQrcode } from "@mdi/js";
import { defineComponent, inject, ref } from "@vue/composition-api";

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
	inject: ["i18n"],
	setup(props, { emit }) {
		const i18n = inject("i18n");

		const t = (key) => {
			const translateResult = i18n?.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const onMailShareUrl = (shareUrl) => {
			const subject = encodeURIComponent(
				t("components.molecules.shareCourse.mail.subject")
			);
			const body = encodeURIComponent(
				t("components.molecules.shareCourse.mail.body") + shareUrl
			);
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
