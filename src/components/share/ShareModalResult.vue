<template>
	<div>
		<v-text-field
			variant="filled"
			:model-value="shareUrl"
			readonly
			:label="`${t(`components.molecules.share.${type}.result.linkLabel`)}`"
		/>
		<div class="mb-4">
			<div
				v-if="!isShowQrCode"
				class="d-flex flex-sm-row flex-column justify-content-space-between align-items-center"
			>
				<v-btn
					variant="plain"
					size="large"
					class="d-sm-none d-flex button-alignment-top mb-2"
					:height="84"
					data-testid="mobilePlatformAction"
					@click="onShareMobilePlatflorm(shareUrl)"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon size="large">{{ mdiShareVariantOutline }}</v-icon></span
						>
						<span class="subtitle">{{ t("common.actions.share") }}</span>
					</span>
				</v-btn>
				<v-btn
					variant="plain"
					size="large"
					:height="84"
					class="d-sm-flex d-none button-alignment-top"
					data-testid="shareMailAction"
					@click="onMailShareUrl(shareUrl, type)"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon size="large">{{ mdiEmailOutline }}</v-icon></span
						>
						<span class="subtitle">{{
							t("components.molecules.share.result.mailShare")
						}}</span>
					</span>
				</v-btn>

				<v-btn
					variant="plain"
					size="large"
					:height="84"
					class="d-sm-flex d-none button-alignment-top"
					data-testid="copyAction"
					@click="onCopy(shareUrl)"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon size="large">{{ mdiContentCopy }}</v-icon></span
						>
						<span class="subtitle">{{
							t("components.molecules.share.result.copyClipboard")
						}}</span>
					</span>
				</v-btn>

				<v-btn
					variant="plain"
					size="large"
					:height="84"
					data-testid="qrCodeAction"
					class="button-alignment-top"
					@click="onShowQrCode"
				>
					<span
						class="d-flex flex-column justify-content-center button-max-width"
					>
						<span class="mb-2">
							<v-icon size="large">{{ mdiQrcode }}</v-icon></span
						>
						<span class="subtitle">{{
							t("components.molecules.share.result.qrCodeScan")
						}}</span>
					</span>
				</v-btn>
			</div>
		</div>
		<div
			v-if="isShowQrCode"
			class="d-flex justify-content-center overflow-hidden"
		>
			<base-qr-code :url="shareUrl" data-testid="qrCode" />
		</div>
	</div>
</template>

<script setup>
import BaseQrCode from "@/components/base/BaseQrCode";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import {
	mdiContentCopy,
	mdiEmailOutline,
	mdiQrcode,
	mdiShareVariantOutline,
} from "@/components/icons/material";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
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
});
const emit = defineEmits(["copied", "done"]);
const { t } = useI18n();

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
</script>

<style lang="scss" scoped>
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
