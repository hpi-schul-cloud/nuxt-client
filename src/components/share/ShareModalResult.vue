<template>
	<div>
		<v-text-field
			autofocus
			variant="filled"
			:model-value="shareUrl"
			readonly
			:label="`${t(`components.molecules.share.${type}.result.linkLabel`)}`"
			data-testid="share-course-result-url"
		/>

		<div
			v-if="isShowQrCode"
			class="d-flex justify-content-center overflow-hidden mt-4"
		>
			<QRCode :url="shareUrl" data-testid="qrCode" />
		</div>

		<div
			v-else
			class="d-flex flex-row flex-wrap align-items-center justify-space-around"
		>
			<ExtendedIconBtn
				v-if="isExtraSmallDisplay"
				data-testid="mobilePlatformAction"
				:icon="mdiShareVariantOutline"
				:label="t('common.actions.share')"
				@click.stop="onShareMobilePlatform"
			/>

			<template v-else>
				<ExtendedIconBtn
					data-testid="shareMailAction"
					:icon="mdiEmailOutline"
					:label="t('components.molecules.share.result.mailShare')"
					@click.stop="onMailShareUrl"
				/>

				<ExtendedIconBtn
					data-testid="copyAction"
					:icon="mdiContentCopy"
					:label="t('common.actions.shareLink')"
					@click.stop="onCopy"
				/>
			</template>

			<ExtendedIconBtn
				data-testid="qrCodeAction"
				:icon="mdiQrcode"
				:label="$t('components.molecules.share.result.qrCodeScan')"
				@click.stop="onShowQrCode"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { QRCode } from "@ui-qr-code";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";
import {
	mdiContentCopy,
	mdiEmailOutline,
	mdiQrcode,
	mdiShareVariantOutline,
} from "@icons/material";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps({
	shareUrl: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});
const emit = defineEmits(["copied", "done"]);
const { t } = useI18n();
const { xs: isExtraSmallDisplay } = useDisplay();

const onMailShareUrl = () => {
	const subject = encodeURIComponent(
		t(`components.molecules.share.${props.type}.mail.subject`)
	);
	const body = encodeURIComponent(
		t(`components.molecules.share.${props.type}.mail.body`) + props.shareUrl
	);
	window.location.assign(`mailto:?subject=${subject}&body=${body}`);
	emit("done");
};

const onCopy = () => {
	navigator.clipboard.writeText(props.shareUrl);
	emit("done");
	emit("copied");
};

const onShareMobilePlatform = () => {
	if (navigator.share) {
		navigator
			.share({
				url: props.shareUrl,
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
