<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="download-dialog"
		:size="480"
		has-buttons
		:buttons="isOpen ? actionButtons : []"
		@dialog-closed="onCloseDialog"
		@next="onNext(downloadOptions)"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2 text-break">
			{{ modalTitle }}
		</div>
		<template slot="content">
			<!--Fade-out animation ensures that the dialog shows the last visible step while closing-->
			<v-fade-transition>
				<div v-if="step === 1 && isOpen">
					<v-radio-group v-model="dialog.radios">
						<v-radio label="V1.1" id="v1.1" value="1.1.0" />
						<br />
						<v-radio label="V1.3" id="v1.3" value="1.3.0" />
						<br />
					</v-radio-group>
					<v-divider />
					<download-modal-options-form
						@download-options-change="onDownloadOptionsChange"
					/>
				</div>

				<div v-if="step === 2 && isOpen">
					<download-modal-result :download-url="downloadUrl" @done="onDone" />
				</div>
			</v-fade-transition>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
// import DownloadModalOptionsForm from "@/components/share/DownloadModalOptionsForm.vue";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiInformation } from "@mdi/js";
import { computed, defineComponent, inject, ref } from "vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "DownloadModal",
	components: {
		// DownloadModalOptionsForm,
		// DownloadModalResult,
		vCustomDialog,
	},
	props: {
		// type: {
		// 	type: String,
		// 	required: true,
		// 	validator: (type) =>
		// 		Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
		// },
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		// const notifier = injectStrict(NOTIFIER_MODULE_KEY);

		const t = (key) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const downloadModule = inject("downloadModule");
		const isOpen = computed({
			get: () =>
				downloadModule.getIsDownloadModalOpen &&
				downloadModule.getParentType === props.type,
			set: () => downloadModule.resetDownloadFlow(),
		});

		const step = computed(() => (downloadModule.version === "" ? 1 : 2));

		const modalOptions = computed(() => new Map([]));
		modalOptions.value.set(1, {
			title: t("pages.room.modal.course.download.header"),
			actionButtons: ["close", "next"],
		});
		modalOptions.value.set(2, {
			title: t("pages.room.modal.course.download.header"),
			actionButtons: ["back", "confirm", "close"],
		});

		const actionButtons = computed(() => {
			return modalOptions.value.get(step.value)?.actionButtons ?? [];
		});

		const downloadOptions = ref(undefined);

		const modalTitle = computed(
			() => modalOptions.value.get(step.value)?.title ?? ""
		);

		const onDownloadOptionsChange = (newValue) => {
			downloadOptions.value = newValue;
		};
		const onCloseDialog = () => {
			downloadModule.resetDownloadFlow();
		};
		const onNext = (newValue) => {
			// open download options
			downloadOptions.value = newValue;
		};
		const onDone = () => {
			// download
			downloadModule.startDownload(downloadOptions.value);
		};

		const ctlToolsEnabled = computed(() => {
			return envConfigModule.getCtlToolsTabEnabled;
		});

		return {
			onDownloadOptionsChange,
			onCloseDialog,
			onNext,
			onDone,
			step,
			actionButtons,
			modalTitle,
			isOpen,
			downloadOptions,
			mdiInformation,
			ctlToolsEnabled,
		};
	},
});
</script>
