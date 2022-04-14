<template>
	<vCustomDialog
		ref="importDialog"
		:is-open="isOpen"
		class="import-dialog"
		has-buttons
		:buttons="['back', 'cancel', 'next']"
		:next-btn-title-key="nextButtonName"
		:next-btn-disabled="step === 2 && sharedLessonData.code === ''"
		@dialog-closed="cancel"
		@dialog-confirmed.prevent
		@back="stepBack"
		@next="nextStep"
	>
		<template slot="content" class="import-modal-content">
			<v-stepper v-model="step" alt-labels flat class="mb-4 ma-0 pa-0 stepper">
				<v-stepper-header>
					<v-stepper-step
						step="1"
						:complete="step > 1"
						:complete-icon="mdiCheck"
						class="step"
						@click="onClickStepper(1)"
					>
						{{ $t("pages.room.lessonShare.step_1.text") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						step="2"
						:complete="step > 2"
						:complete-icon="mdiCheck"
						class="step"
						@click="onClickStepper(2)"
					>
						{{ $t("pages.room.lessonShare.step_2.text") }}
					</v-stepper-step>
				</v-stepper-header>
			</v-stepper>
			<div class="step-sections">
				<div v-if="step === 1">
					<!-- eslint-disable vue/no-v-html -->
					<p v-html="$t('pages.room.lessonShare.import.step_1.info_2')"></p>
				</div>
				<div v-if="step === 2">
					<p>
						{{ $t("pages.room.lessonShare.import.step_2.text") }}
					</p>
					<v-text-field
						v-model="sharedLessonData.code"
						outlined
						dense
						class="mt-1 text-field-lesson-code"
						:error="businessError.message === 'not-found'"
						:error-messages="
							businessError.message === 'not-found'
								? $t('pages.room.lessonShare.codeError')
								: ''
						"
					></v-text-field>
					<div v-if="businessError.message === 'not-created'">
						<v-alert dense outlined type="error" class="create-error">
							{{ $t("pages.room.lessonShare.importError") }}
						</v-alert>
					</div>
				</div>
			</div>
		</template>
	</vCustomDialog>
</template>
<script>
import RoomModule from "@store/room";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiCheck } from "@mdi/js";

export default {
	components: {
		vCustomDialog,
	},
	model: {
		prop: "isOpen",
		event: "dialog-closed",
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			step: 1,
			sharedLessonData: {
				code: "",
			},
			valid: true,
			mdiCheck,
		};
	},
	computed: {
		nextButtonName() {
			if (this.step < 2) return this.$t("pages.room.lessonShare.btn.continue");
			return this.$t("common.actions.import");
		},
		businessError() {
			return RoomModule.getBusinessError;
		},
	},
	methods: {
		async nextStep() {
			if (this.step === 2 && this.sharedLessonData.code === "") {
				return;
			}
			if (this.step === 2) {
				await RoomModule.confirmImportLesson(this.sharedLessonData.code);
				if (this.businessError.statusCode === "") {
					this.cancel();
				}
				return;
			}

			this.step++;
		},
		cancel() {
			this.clearMessages();
			this.step = 1;
			this.$emit("dialog-closed", false);
		},
		stepBack() {
			this.clearMessages();
			if (this.step === 1) {
				this.cancel();
				return;
			}
			this.step--;
		},
		onClickStepper(step) {
			this.step = step;
		},
		clearMessages() {
			RoomModule.resetBusinessError();
			this.sharedLessonData = {
				code: "",
			};
		},
	},
};
</script>
<style lang="scss" scoped>
.v-dialog--active {
	overflow-y: hidden !important;
}
.cancel-confirm-button {
	text-align: right;
}
.step-sections {
	min-height: var(--sidebar-width);
	font-size: var(--space-md);
	color: var(--color-black);
}
.step {
	cursor: pointer;
}
.v-icon__svg {
	width: 90%;
	height: 90%;
}
</style>
