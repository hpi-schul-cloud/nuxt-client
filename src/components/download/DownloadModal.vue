<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="export-dialog"
		:size="560"
		has-buttons
		:buttons="isOpen ? actionButtons : []"
		@dialog-closed="onCloseDialog"
		@next="onNext(radios)"
		@back="onBack"
		@dialog-confirmed="onDownload"
	>
		<template slot="title">
			<h4>{{ modalTitle }}</h4>
		</template>
		<template slot="content">
			<div v-if="step === 1 && isOpen">
				<v-radio-group v-model="radios">
					<v-radio
						label="Common Cartridge Version 1.1   (z.B kompatibel mit Moodle)"
						id="1.1.0"
						value="1.1.0"
					/>
					<v-radio
						label="Common Cartridge Version 1.3"
						id="1.3.0"
						value="1.3.0"
					/>
				</v-radio-group>
			</div>

			<div v-if="step === 2 && isOpen">
				<div
					class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
				>
					<div class="mx-2">
						<v-icon color="info">{{ mdiInformation }}</v-icon>
					</div>
					<p>
						<strong>
							{{ $t(`components.molecules.download.options.info`) }}
						</strong>
						<br />
						&middot;
						{{ $t(`components.molecules.download.options.info.points`) }}
						<br />
						&middot;
						{{ $t(`components.molecules.download.options.info.points`) }}
					</p>
				</div>
				<v-container fluid>
					<v-checkbox label="Aufgaben" class="mt-2" />
					<v-checkbox label="Themen:" class="mt-2" />
					<v-checkbox label="Aufgabe" class="mt-2 ml-8" />
					<v-checkbox label="Etherpad" class="mt-2 ml-8" />
					<v-checkbox label="Geogebra" class="mt-2 ml-8" />
					<v-checkbox
						label="Lern-Material (aus dem Lern-Store)"
						class="mt-2 ml-8"
					/>
					<v-checkbox label="Textelemente" class="mt-2 ml-8" />
				</v-container>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiInformation } from "@mdi/js";
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
			title: t("pages.room.modal.course.download.options.header"),
			actionButtons: ["export", "cancel", "back"],
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
			mdiInformation,
			radios,
		};
	},
});
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
</style>
