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
				<div
					class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
				>
					<div class="mx-2">
						<v-icon class="blue--text text--darken-1">{{
							mdiInformation
						}}</v-icon>
					</div>
					<div class="black--text">
						Mit dem folgenden Link kann der Kurs als Kopie von anderen
						Lehrkräften importiert werden. Personenbezogene Daten werden dabei
						nicht importiert.
					</div>
				</div>
				<share-modal-options-form
					@share-options-change="onShareOptionsChange"
				></share-modal-options-form>
			</div>

			<div v-if="step === 2">
				<share-modal-result
					:share-url="shareUrl"
					@done="onDone"
				></share-modal-result>
			</div>

			<!--			<div v-if="step === 3">-->
			<!--				<div class="d-flex py-6 justify-content-center">-->
			<!--					<base-qr-code :url="shareUrl" mirrored> </base-qr-code>-->
			<!--				</div>-->
			<!--			</div>-->
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@components/share-modal/ShareModalOptionsForm";
import ShareModalResult from "@components/share-modal/ShareModalResult";
import { computed, defineComponent, inject, ref } from "@vue/composition-api";
import { mdiInformation } from "@mdi/js";

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
			shareCourseModule.getShareUrl === undefined ? 1 : 2
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

		const onBack = () => {
			shareCourseModule.clearQrCode();
		};

		return {
			onShareOptionsChange,
			onCloseDialog,
			onNext,
			onDone,
			onBack,
			step,
			actionButtons,
			modalTitle,
			shareUrl,
			isOpen,
			shareOptions,
			mdiInformation,
		};
	},
});
</script>
