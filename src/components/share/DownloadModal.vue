<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="title-menu-imscc-download"
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
			<div v-if="step === 1 && isOpen">
				<download-modal-options-form
					:type="type"
					@download-options-change="onDownloadOptionsChange"
				/>
			</div>

			<div v-if="step === 2 && isOpen">Step 2</div>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import DownloadModalOptionsForm from "@/components/share/DownloadModalOptionsForm.vue";
import { roomModule } from "@/store";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	injectStrict,
	// NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { mdiInformation } from "@mdi/js";
import { computed, defineComponent, inject, ref } from "vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "DownloadModal",
	components: {
		DownloadModalOptionsForm,
		// DownloadModalResult,
		vCustomDialog,
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: (type) =>
				Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
		},
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
			set: () => console.log("downloadModule.resetShareFlow()"),
		});

		const step = computed(() =>
			shareModule.getShareUrl === undefined ? 1 : 2
		);

		const modalOptions = computed(() => new Map([]));
		modalOptions.value.set(1, {
			title: t("common.actions.download.v1.1"),
			actionButtons: ["cancel", "next"],
		});
		modalOptions.value.set(2, {
			title: t("common.actions.download.v1.3"),
			actionButtons: ["cancel", "next"],
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
			//shareModule.resetShareFlow();
		};
		const onNext = (newValue) => {
			// open download option
			//roomModule.downloadImsccCourse(newValue),
			//shareModule.createShareUrl(newValue);
		};
		const onDone = () => {
			//shareModule.resetShareFlow();
			if (downloadOptions.value.isV_1_1) {
				roomModule.downloadImsccCourse("1.1.0");
			} else if (downloadOptions.value.isV_1_3) {
				roomModule.downloadImsccCourse("1.3.0");
			}
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
