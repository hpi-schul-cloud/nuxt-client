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
		<div slot="title" ref="textTitle" class="text-h4 my-2 wordbreak-normal">
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

			<div v-else>
				<div>
					<v-text-field label="Link Kurskopie" :value="shareUrl" disabled>
					</v-text-field>
				</div>
				<div>
					<div class="share-options">
						<div>
							<v-icon large>{{ mdiEmailOutline }}</v-icon>
						</div>
						<div>Als Mail versenden</div>
					</div>

					<div class="share-options">
						<div>
							<v-icon large>{{ mdiContentCopy }}</v-icon>
						</div>
						<div>Link kopieren</div>
					</div>

					<div class="share-options">
						<div>
							<v-icon large>{{ mdiQrcode }}</v-icon>
						</div>
						<div>QR-Code erstellen</div>
					</div>
				</div>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import {
	mdiInformation,
	mdiEmailOutline,
	mdiContentCopy,
	mdiQrcode,
} from "@mdi/js";

export default {
	name: "ShareModal",
	inject: ["shareCourseModule"],
	components: { vCustomDialog },
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
			return this.shareCourseModule.getShareUrl === undefined ? 1 : 2;
		},
		shareUrl() {
			return this.shareCourseModule.getShareUrl;
		},
		actionButtons() {
			return this.step === 1 ? ["cancel", "next"] : ["close"];
		},
		modalTitle() {
			return this.step === 1 ? "Teilen Einstellungen " : "Teilen über";
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
	},
};
</script>

<style scoped lang="scss">
.wordbreak-normal {
	word-break: normal;
}

.share-options {
	display: inline-block;
	cursor: pointer;
}
</style>
