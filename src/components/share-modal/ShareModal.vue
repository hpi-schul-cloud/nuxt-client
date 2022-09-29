<template>
	<v-custom-dialog
		:is-open="openDialog"
		data-testid="copy-dialog"
		:size="480"
		has-buttons
		:buttons="actionButtons"
		@dialog-closed="onCloseDialog"
		@next="onNext"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2">
			{{ modalTitle }}
		</div>

		<template slot="content">
			<div v-if="step === 1">
				<div
					class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
				>
					<div class="mx-2">
						<v-icon class="blue--text text--darken-1">{{
							mdiInformation
						}}</v-icon>
					</div>
					<div>
						Mit dem folgenden Link kann der Kurs als Kopie von anderen
						Lehrkräften importiert werden. Personenbezogene Daten werden dabei
						nicht importiert.
					</div>
				</div>
				<div class="d-flex justify-space-between">
					<div>Link nur schulintern gültig</div>
					<v-switch
						v-model="shareOptions.schoolInternally"
						color="primary"
						value
						input-value="true"
						class="ma-0"
					></v-switch>
				</div>
				<div class="d-flex justify-space-between">
					<div>Link läuft nach 7 Tagen ab</div>
					<v-switch
						v-model="shareOptions.expiresInSevenDays"
						color="primary"
						value
						input-value="true"
						class="ma-0"
					></v-switch>
				</div>
			</div>

			<div v-if="step === 2">
				<div class="grey lighten-3 px-3 py-1">
					<div class="text-xs grey--text text--darken-3">Link Kurskopie</div>
					<div class="black--text">{{ shareUrl }}</div>
				</div>
				<hr class="mb-8" />
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
							</span>
						</v-btn>
					</div>
				</div>
			</div>

			<div v-if="step === 3">
				<div class="d-flex py-6 justify-content-center">
					<base-qr-code :url="shareUrl"> </base-qr-code>
				</div>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import BaseQrCode from "@basecomponents/BaseQrCode";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import {
	mdiContentCopy,
	mdiEmailOutline,
	mdiInformation,
	mdiQrcode,
} from "@mdi/js";

export default {
	name: "ShareModal",
	inject: ["shareCourseModule"],
	components: { BaseQrCode, vCustomDialog },
	data() {
		return {
			mdiInformation,
			mdiEmailOutline,
			mdiContentCopy,
			mdiQrcode,
			shareOptions: {
				schoolInternally: true,
				expiresInSevenDays: true,
			},
			openDialog: false,
		};
	},
	computed: {
		isOpen() {
			return this.shareCourseModule.getIsShareModalOpen;
		},
		step() {
			return this.shareCourseModule.getShareUrl === undefined
				? 1
				: !this.shareCourseModule.getHasQrCode
				? 2
				: 3;
		},
		shareUrl() {
			return this.shareCourseModule.getShareUrl;
		},
		actionButtons() {
			return this.step === 1 ? ["cancel", "next"] : ["close"];
		},
		modalTitle() {
			return this.step === 1
				? "Teilen Einstellungen "
				: this.step === 2
				? "Teilen über"
				: "QR-Code teilen";
		},
	},
	watch: {
		isOpen(newValue) {
			this.openDialog = newValue;
		},
	},
	methods: {
		onCloseDialog() {
			this.shareCourseModule.resetShareFlow();
		},
		onNext() {
			this.shareCourseModule.createShareUrl(this.shareOptions);
		},
		onMailShareUrl(shareUrl) {
			const subject = `Kurs zum Importieren`;
			const body = `Link zum Kurs:${shareUrl}`;
			window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(
				body
			)}`;
		},
		onCopy(shareUrl) {
			navigator.clipboard.writeText(shareUrl);
			this.shareCourseModule.resetShareFlow();
		},
		onGenerateQrCode() {
			this.shareCourseModule.generateQrCode();
		},
	},
};
</script>
