<template>
	<div>
		<v-text-field
			filled
			:value="shareUrl"
			readonly
			:label="`${$t(`components.molecules.share.${type}.result.linkLabel`)}`"
		></v-text-field>
		<div class="mb-4">
			<div
				v-if="!isShowQrCode"
				class="d-flex flex-sm-row flex-column justify-content-space-between align-items-center"
			>
				<v-btn
					plain
					large
					class="d-sm-none d-flex button-alignment-top mb-2"
					:height="84"
					data-testid="mobilePlatformAction"
					@click="onShareMobilePlatflorm(shareUrl)"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon large>{{ mdiShareVariantOutline }}</v-icon></span
						>
						<span class="subtitle">{{ $t("common.actions.share") }}</span>
					</span>
				</v-btn>
				<v-btn
					plain
					large
					:height="84"
					class="d-sm-flex d-none button-alignment-top"
					data-testid="shareMailAction"
					@click="onMailShareUrl(shareUrl, type)"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon large>{{ mdiEmailOutline }}</v-icon></span
						>
						<span class="subtitle">{{
							$t("components.molecules.share.result.mailShare")
						}}</span>
					</span>
				</v-btn>

				<v-btn
					plain
					large
					:height="84"
					class="d-sm-flex d-none button-alignment-top"
					data-testid="copyAction"
					@click="onCopy(shareUrl)"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon large>{{ mdiContentCopy }}</v-icon></span
						>
						<span class="subtitle">{{
							$t("components.molecules.share.result.copyClipboard")
						}}</span>
					</span>
				</v-btn>

				<v-btn
					plain
					large
					:height="84"
					data-testid="qrCodeAction"
					class="button-alignment-top"
					@click="onShowQrCode"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon large>{{ mdiQrcode }}</v-icon></span
						>
						<span class="subtitle">{{
							$t("components.molecules.share.result.qrCodeScan")
						}}</span>
					</span>
				</v-btn>
			</div>
		</div>
		<div
			v-if="isShowQrCode"
			class="d-flex justify-content-center overflow-hidden"
		>
			<base-qr-code :url="shareUrl" data-testid="qrCode"></base-qr-code>
		</div>
	</div>
</template>

<script>
import BaseQrCode from "@/components/base/BaseQrCode";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import {
	mdiContentCopy,
	mdiEmailOutline,
	mdiQrcode,
	mdiShareVariantOutline,
} from "@mdi/js";
import { defineComponent, ref } from "vue";

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
		type: {
			type: String,
			required: true,
			validator: (type) =>
				Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const t = (key) => {
			const translateResult = i18n?.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const onMailShareUrl = (shareUrl, type) => {
			const subject = encodeURIComponent(
				t(`components.molecules.share.${type}.mail.subject`)
			);
			const body = encodeURIComponent(
				t(`components.molecules.share.${type}.mail.body`) + shareUrl
			);
			window.location.assign(`mailto:?subject=${subject}&body=${body}`);
			emit("done");
		};

		const onCopy = (shareUrl) => {
			navigator.clipboard.writeText(shareUrl);
			emit("done");
			emit("copied");
		};

		const onShareMobilePlatflorm = (shareUrl) => {
			if (navigator.share) {
				navigator
					.share({
						url: shareUrl,
					})
					.then(() => emit("done"))
					.catch();
			}
		};

		const isShowQrCode = ref(false);
		const onShowQrCode = () => {
			isShowQrCode.value = true;
		};

		return {
			onMailShareUrl,
			onCopy,
			onShowQrCode,
			onShareMobilePlatflorm,
			isShowQrCode,
			mdiEmailOutline,
			mdiContentCopy,
			mdiQrcode,
			mdiShareVariantOutline,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/utils/multiline-ellipsis.scss";
@import "~vuetify/src/styles/styles.sass";

.subtitle {
	overflow-wrap: break-word;
	white-space: normal;
}

.button-max-width {
	max-width: calc(var(--topbar-height) * 2);
}

.button-alignment-top {
	align-items: start;
}
</style>
