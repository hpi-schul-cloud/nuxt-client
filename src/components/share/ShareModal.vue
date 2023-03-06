<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="share-dialog"
		:size="480"
		has-buttons
		:buttons="isOpen ? actionButtons : []"
		@dialog-closed="onCloseDialog"
		@next="onNext(shareOptions)"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2 text-break">
			{{ modalTitle }}
		</div>

		<template slot="content">
			<!--Fade-out animation ensures that the dialog shows the last visible step while closing-->
			<v-fade-transition>
				<div v-if="step === 1 && isOpen">
					<div
						class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
					>
						<div class="mx-2">
							<v-icon color="info">{{ mdiInformation }}</v-icon>
						</div>
						<div>
							{{ $t(`components.molecules.share.${type}.options.infoText`) }}
							<br />
							{{ $t("components.molecules.copyResult.courseFiles.info") }}
						</div>
					</div>
					<share-modal-options-form
						:type="type"
						@share-options-change="onShareOptionsChange"
					></share-modal-options-form>
				</div>

				<div v-if="step === 2 && isOpen">
					<share-modal-result
						:share-url="shareUrl"
						:type="type"
						@done="onDone"
						@copied="onCopy"
					></share-modal-result>
				</div>
			</v-fade-transition>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { mdiInformation } from "@mdi/js";
import { computed, defineComponent, inject, ref } from "vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModal",
	components: {
		ShareModalOptionsForm,
		ShareModalResult,
		vCustomDialog,
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: (type) => ["course", "lesson", "task"].includes(type),
		},
	},
	setup(props) {
		const i18n = inject("i18n");
		const notifier = inject("notifierModule");

		const t = (key) => {
			const translateResult = i18n?.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		let shareModule;
		switch (props.type) {
			case "course":
				shareModule = inject("shareCourseModule");
				break;
			case "lesson":
				shareModule = inject("shareLessonModule");
				break;
		}
		const isOpen = computed({
			get: () => shareModule.getIsShareModalOpen,
			set: () => shareModule.resetShareFlow(),
		});

		const step = computed(() =>
			shareModule.getShareUrl === undefined ? 1 : 2
		);

		const modalOptions = computed(() => new Map([]));
		modalOptions.value.set(1, {
			title: t("components.molecules.share.options.title"),
			actionButtons: ["cancel", "next"],
		});
		modalOptions.value.set(2, {
			title: t("components.molecules.share.result.title"),
			actionButtons: ["close"],
		});

		const shareUrl = computed(() => shareModule.getShareUrl);

		const actionButtons = computed(() => {
			return modalOptions.value.get(step.value)?.actionButtons ?? [];
		});

		const shareOptions = ref(undefined);

		const modalTitle = computed(
			() => modalOptions.value.get(step.value)?.title ?? ""
		);

		const onShareOptionsChange = (newValue) => {
			shareOptions.value = newValue;
		};
		const onCloseDialog = () => {
			shareModule.resetShareFlow();
		};
		const onNext = (newValue) => {
			shareModule.createShareUrl(newValue);
		};
		const onDone = () => {
			shareModule.resetShareFlow();
		};
		const onCopy = () => {
			notifier?.show({
				text: t("common.words.copiedToClipboard"),
				status: "success",
				timeout: 10000,
			});
		};

		return {
			onShareOptionsChange,
			onCloseDialog,
			onNext,
			onDone,
			step,
			actionButtons,
			modalTitle,
			shareUrl,
			isOpen,
			shareOptions,
			mdiInformation,
			onCopy,
		};
	},
});
</script>
