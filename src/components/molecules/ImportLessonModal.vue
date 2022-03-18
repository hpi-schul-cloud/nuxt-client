<template>
	<vCustomDialog
		ref="importDialog"
		:is-open="isOpen"
		class="import-dialog"
		@dialog-closed="$emit('dialog-closed', false)"
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
						{{ $t("pages.rooms.importCourse.step_1.text") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						step="2"
						:complete="step > 2"
						:complete-icon="mdiCheck"
						class="step"
						@click="onClickStepper(2)"
					>
						{{ $t("pages.rooms.importCourse.step_2.text") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="3" class="step">
						{{ $t("pages.rooms.importCourse.step_3.text") }}
					</v-stepper-step>
				</v-stepper-header>
			</v-stepper>

			<div class="step-sections">
				<div v-if="step === 1">
					<!-- <p>
						{{ $t("pages.room.lessonShare.import.step_2.text") }}
					</p> -->

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
						class="mt-1 text-field-course-code"
						:rules="[textFieldValidation.checkEmpty]"
					></v-text-field>
					<div v-if="businessError.message !== 'not-found'">
						<v-alert dense outlined type="error" class="code-error">
							{{ $t("pages.rooms.importCourse.codeError") }}
						</v-alert>
					</div>
					<div v-if="businessError.message === 'not-created'">
						<v-alert dense outlined type="error" class="code-error">
							{{ $t("pages.rooms.importCourse.importError") }}
						</v-alert>
					</div>
				</div>
				<div v-if="step === 3">
					{{ $t("pages.rooms.importCourse.step_3") }}

					<v-text-field
						v-model="sharedLessonData.lessonName"
						outlined
						dense
						class="mt-1 text-field-course-name"
						:disabled="isImportError"
					></v-text-field>
					<div v-if="businessError.message !== ''">
						<v-alert dense outlined type="error" class="import-error">
							{{ $t("pages.rooms.importCourse.importError") }}
						</v-alert>
					</div>
				</div>
			</div>
			<div class="button-section mt-8">
				<v-row v-if="isImportError && step === 3">
					<v-col class="ml-auto cancel-confirm-button">
						<v-btn
							class="dialog-confirmed"
							color="primary"
							depressed
							@click="cancel"
						>
							{{ this.$t("pages.rooms.importCourse.importErrorButton") }}
						</v-btn>
					</v-col>
				</v-row>
				<v-row v-else>
					<v-col md="4">
						<v-btn
							class="dialog-back-button"
							depressed
							outlined
							@click="stepBack"
						>
							{{ $t("common.actions.back") }}
						</v-btn>
					</v-col>
					<v-col md="8" class="ml-auto cancel-confirm-button">
						<v-btn
							class="dialog-closed"
							depressed
							style="background: transparent"
							@click="cancel"
						>
							{{ this.$t("common.actions.cancel") }}
						</v-btn>
						<v-btn
							class="dialog-next"
							color="primary"
							depressed
							@click="nextStep"
						>
							{{ nextButtonName }}
						</v-btn>
						<v-btn class="dialog-next" color="primary" depressed @click="fetch">
							fetch
						</v-btn>
					</v-col>
				</v-row>
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
				code: "EKhaiO2bZ",
				lessonName: "",
				status: "",
				message: "",
			},
			mdiCheck,
			isImportError: false,
			textFieldValidation: {
				checkEmpty: () => "This field can not be empty.",
			},
		};
	},
	computed: {
		nextButtonName() {
			if (this.step < 3)
				return this.$t("pages.rooms.importCourse.btn.continue");
			return this.$t("pages.rooms.importCourse.btn.confirm");
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
				await RoomModule.getSharedCourseData(this.sharedLessonData.code);
				if (this.businessError.statusCode != "") return;
				this.sharedLessonData = RoomModule.getCourseSharingStatus;
			}

			this.step++;
		},

		async confirmImport() {
			await RoomModule.confirmSharedCourseData(this.sharedLessonData);
			if (this.businessError.statusCode !== "") {
				this.isImportError = true;
			}

			const importedCourseId = RoomModule.getImportedCourseId;

			if (importedCourseId) {
				this.clearMessages();
				this.step = 1;
				this.$emit("dialog-closed", false);
				window.location = `/courses/${importedCourseId}/edit/`;
			}
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
			this.isImportError = false;
			this.step--;
		},
		onClickStepper(step) {
			if (this.isImportError) return;
			this.step = step;
		},
		clearMessages() {
			RoomModule.resetBusinessError();
			this.sharedLessonData = {
				code: "",
				courseName: "",
				status: "",
				message: "",
			};
			this.isImportError = false;
		},
		async fetch() {
			await RoomModule.confirmImportLesson(this.sharedLessonData.code);
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
