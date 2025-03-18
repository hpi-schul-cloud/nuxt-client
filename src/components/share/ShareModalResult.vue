<template>
	<div>
		<v-text-field
			variant="filled"
			:model-value="shareUrl"
			readonly
			:label="`${t(`components.molecules.share.${type}.result.linkLabel`)}`"
			data-testid="share-course-result-url"
		/>
		<div class="mb-4">
			<div
				v-if="!isShowQrCode"
				class="d-flex flex-row flex-wrap align-items-center justify-space-around"
			>
				<ExtendedIconBtn
					class="d-sm-none d-flex"
					data-testid="mobilePlatformAction"
					:icon="mdiShareVariantOutline"
					:label="$t('common.actions.share')"
					@click.stop="onShareMobilePlatflorm(shareUrl)"
				/>

				<ExtendedIconBtn
					class="d-sm-flex d-none"
					data-testid="shareMailAction"
					:icon="mdiEmailOutline"
					:label="$t('components.molecules.share.result.mailShare')"
					@click.stop="onMailShareUrl(shareUrl, type)"
				/>

				<ExtendedIconBtn
					class="d-sm-flex d-none"
					data-testid="copyAction"
					:icon="mdiContentCopy"
					:label="$t('common.actions.shareLink')"
					@click.stop="onCopy(shareUrl)"
				/>

				<ExtendedIconBtn
					class="d-flex"
					data-testid="qrCodeAction"
					:icon="mdiQrcode"
					:label="$t('components.molecules.share.result.qrCodeScan')"
					@click.stop="onShowQrCode"
				/>
			</div>
		</div>
		<div
			v-if="isShowQrCode"
			class="d-flex justify-content-center overflow-hidden"
		>
			<QRCode :url="shareUrl" data-testid="qrCode" />
		</div>
	</div>
</template>

<script setup>
import { QRCode } from "@ui-qr-code";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import {
	mdiContentCopy,
	mdiEmailOutline,
	mdiQrcode,
	mdiShareVariantOutline,
} from "@icons/material";
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
	max-width: calc(var(--legacy-topbar-height) * 2);
}

.button-alignment-top {
	align-items: start;
}
</style>
