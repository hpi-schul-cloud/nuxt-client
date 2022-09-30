<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="share-dialog"
		:size="480"
		has-buttons
		:buttons="actionButtons"
		@dialog-closed="onCloseDialog"
		@next="onNext(shareOptions)"
		@back="onBack"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2">
			{{ modalTitle }}
		</div>

		<template slot="content">
			<div v-if="step === 1">
				<share-modal-options-form
					@share-options-change="onShareOptionsChange"
				></share-modal-options-form>
				{{ shareOptions }}
			</div>

			<div v-if="step === 2">
				<share-modal-result
					:share-url="shareUrl"
					@done="onDone"
					@generate-qr-code="onGenerateQrCode(shareOptions)"
				></share-modal-result>
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
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@components/share-modal/ShareModalOptionsForm";
import ShareModalResult from "@components/share-modal/ShareModalResult";
import { computed, defineComponent, inject, ref } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModal",
	components: {
		ShareModalOptionsForm,
		ShareModalResult,
		vCustomDialog,
	},
	setup() {
		const shareCourseModule = inject("shareCourseModule");
		const isOpen = computed({
			get: () => shareCourseModule.getIsShareModalOpen,
			set: () => shareCourseModule.resetShareFlow(),
		});

		const step = computed(() =>
			shareCourseModule.getShareUrl === undefined
				? 1
				: !shareCourseModule.getHasQrCode
				? 2
				: 3
		);

		const modalOptions = computed(() => new Map([]));
		modalOptions.value.set(1, {
			title: "Teilen-Einstellungen",
			actionButtons: ["cancel", "next"],
		});
		modalOptions.value.set(2, {
			title: "Teilen über",
			actionButtons: ["cancel"],
		});
		modalOptions.value.set(3, {
			title: "QR-Code teilen",
			actionButtons: ["back", "close"],
		});

		const shareUrl = computed(() => shareCourseModule.getShareUrl);

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
			shareCourseModule.resetShareFlow();
		};
		const onNext = (newValue) => {
			shareCourseModule.createShareUrl(newValue);
		};
		const onDone = () => {
			shareCourseModule.resetShareFlow();
		};
		const onGenerateQrCode = (newValue) => {
			shareCourseModule.generateQrCode(newValue);
		};

		const onBack = () => {
			shareCourseModule.clearQrCode();
		};

		return {
			onShareOptionsChange,
			onCloseDialog,
			onNext,
			onDone,
			onGenerateQrCode,
			onBack,
			step,
			actionButtons,
			modalTitle,
			shareUrl,
			isOpen,
			shareOptions,
		};
	},
});
</script>
