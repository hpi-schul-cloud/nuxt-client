<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="download-dialog"
		:size="480"
		has-buttons
		:buttons="isOpen ? actionButtons : []"
		@dialog-closed="onCloseDialog"
		@next="onNext(radios)"
		@back="onBack"
		@dialog-confirmed="onDownload"
	>
		<template slot="title">
			{{ modalTitle }}
		</template>
		<template slot="content">
			<v-divider />
			<div v-if="step === 1 && isOpen">
				<v-radio-group v-model="radios">
					<v-radio
						label="CC Version 1.1   (z.B kompatibel mit Moodle)"
						id="1.1.0"
						value="1.1.0"
						true-value="true"
					/>
					<br />
					<v-radio label="CC Version 1.3" id="1.3.0" value="1.3.0" />
					<br />
				</v-radio-group>
				<v-divider />
			</div>

			<div v-if="step === 2 && isOpen">
				<div
					class="d-flex flex-row pa-2 mb-4 rounded orange lighten-5 background"
				>
					<div class="mx-2">
						<v-icon color="warning">{{ mdiAlert }}</v-icon>
					</div>
					<div>
						<!-- <p class="black--text mb-0 aligned-with-icon">
							<strong>{{
								$t(`components.molecules.downloadResult.label.geogebra`)
							}}</strong>
							&middot;
							{{
								$t(`components.molecules.downloadResult.geogebraDownload.info`)
							}}
							<br />
						</p>
						<p class="black--text mb-0 aligned-with-icon">
							<strong>{{
								$t(`components.molecules.downloadResult.label.etherpad`)
							}}</strong>
							&middot;
							{{
								$t(`components.molecules.downloadResult.etherpadDownload.info`)
							}}
							<br />
						</p> -->
						<p class="black--text mb-0 aligned-with-icon">
							<strong>{{
								$t(`components.molecules.downloadResult.label.files`)
							}}</strong>
							&middot;
							{{ $t(`components.molecules.downloadResult.courseFiles.info`) }}
						</p>
					</div>
				</div>
				<v-container fluid>
					<v-row>
						<v-col cols="4" sm="">
							<v-checkbox label="Aufgaben" />
						</v-col>
					</v-row>
					<v-divider />
					<v-row>
						<v-col cols="4" sm="">
							<v-checkbox label="Themen:" />
						</v-col>
						<v-col cols="4" sm="">
							<v-checkbox label="Aufgabe" />
							<v-checkbox label="Etherpad" />
							<v-checkbox label="Geogebra" />
							<v-checkbox label="Lern-Material (aus dem Lern-Store)" />
							<v-checkbox label="Textelemente" />
						</v-col>
					</v-row>
					<v-divider />
				</v-container>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiAlert } from "@mdi/js";
import { computed, defineComponent, inject, ref } from "vue";

export default defineComponent({
	name: "DownloadModal",
	components: {
		vCustomDialog,
	},
	props: {},
	setup() {
		const i18n = injectStrict(I18N_KEY);
		const radios = ref("1.1.0");

		const t = (key) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const downloadModule = inject("downloadModule");
		const isOpen = computed({
			get: () => downloadModule.getIsDownloadModalOpen,
			set: () => downloadModule.resetDownloadFlow(),
		});

		const step = computed(() => (downloadModule.getVersion === "" ? 1 : 2));

		const modalOptions = computed(() => new Map([]));
		modalOptions.value.set(1, {
			title: t("pages.room.modal.course.download.header"),
			actionButtons: ["next", "cancel"],
		});
		modalOptions.value.set(2, {
			title: t("pages.room.modal.course.download.header"),
			actionButtons: ["download", "back"],
		});

		const actionButtons = computed(() => {
			return modalOptions.value.get(step.value)?.actionButtons ?? [];
		});

		const modalTitle = computed(
			() => modalOptions.value.get(step.value)?.title ?? ""
		);

		const onCloseDialog = () => {
			downloadModule.resetDownloadFlow();
		};

		const onNext = (newValue) => {
			// choose version then open download options
			downloadModule.setVersion(newValue);
		};

		const onDownload = () => {
			// download
			downloadModule.startDownload();
		};

		const onBack = () => {
			// go back to choose version
			downloadModule.setVersion("");
			downloadModule.setIsDownloadModalOpen(true);
			downloadModule.startDownload();
		};

		return {
			onCloseDialog,
			onNext,
			onBack,
			onDownload,
			step,
			actionButtons,
			modalTitle,
			isOpen,
			mdiAlert,
			radios,
		};
	},
});
</script>
