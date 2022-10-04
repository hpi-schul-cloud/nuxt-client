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
		<div slot="title" ref="textTitle" class="text-h4 my-2">
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
							<v-icon class="blue--text text--darken-1">{{
								mdiInformation
							}}</v-icon>
						</div>
						<div>
							{{ $t("components.molecules.shareCourse.options.infoText") }}
						</div>
					</div>
					<share-modal-options-form
						@share-options-change="onShareOptionsChange"
					></share-modal-options-form>
				</div>

				<div v-if="step === 2 && isOpen">
					<share-modal-result
						:share-url="shareUrl"
						@done="onDone"
					></share-modal-result>
				</div>
			</v-fade-transition>
		</template>
	</v-custom-dialog>
</template>

<script type="ts">
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@components/share-modal/ShareModalOptionsForm";
import ShareModalResult from "@components/share-modal/ShareModalResult";
import { mdiInformation } from "@mdi/js";
import { computed, defineComponent, inject, ref } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModal",
	components: {
		ShareModalOptionsForm,
		ShareModalResult,
		vCustomDialog,
	},
	inject: ["i18n"],
	setup() {
		const i18n = inject("i18n");

		const t = (key) => {
			const translateResult = i18n?.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

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
			title: t("components.molecules.shareCourse.options.title"),
			actionButtons: ["cancel", "next"],
		});
		modalOptions.value.set(2, {
			title: t("components.molecules.shareCourse.result.title"),
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
		};
	},
});
</script>
