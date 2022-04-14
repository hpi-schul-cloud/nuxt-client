<template>
	<vCustomDialog
		ref="importDialog"
		:is-open="isOpen"
		class="import-dialog"
		has-buttons
		:buttons="modalButtons"
		:next-btn-title-key="nextButtonName"
		:confirm-btn-title-key="
			isImportError && step === 3
				? this.$t('pages.rooms.importCourse.importErrorButton')
				: nextButtonName
		"
		@dialog-closed="cancel"
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
					<p>
						{{ $t("pages.rooms.importCourse.step_1.info_1") }}
					</p>
					<p>
						{{ $t("pages.rooms.importCourse.step_1.info_2") }}
					</p>
				</div>
				<div v-if="step === 2">
					{{ $t("pages.rooms.importCourse.step_2") }}
					<v-text-field
						v-model="sharedCourseData.code"
						outlined
						dense
						class="mt-1 text-field-course-code"
						:error="businessError.message !== ''"
						:error-messages="
							businessError.message !== ''
								? $t('pages.rooms.importCourse.codeError')
								: ''
						"
					></v-text-field>
				</div>
				<div v-if="step === 3">
					{{ $t("pages.rooms.importCourse.step_3") }}

					<v-text-field
						v-model="sharedCourseData.courseName"
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
		</template>
	</vCustomDialog>
</template>
<script>
import RoomsModule from "@store/rooms";
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
			sharedCourseData: {
				code: "",
				courseName: "",
				status: "",
				message: "",
			},
			mdiCheck,
			isImportError: false,
		};
	},
	computed: {
		nextButtonName() {
			if (this.step < 3)
				return this.$t("pages.rooms.importCourse.btn.continue");
			return this.$t("common.actions.import");
		},
		businessError() {
			return RoomsModule.getBusinessError;
		},
		modalButtons() {
			return this.isImportError && this.step === 3
				? ["confirm"]
				: ["back", "cancel", "next"];
		},
	},
	methods: {
		async nextStep() {
			if (this.step === 2) {
				await RoomsModule.getSharedCourseData(this.sharedCourseData.code);
				if (this.businessError.statusCode != "") return;
				this.sharedCourseData = RoomsModule.getCourseSharingStatus;
			}
			if (this.step === 3) {
				this.confirmImport();
				return;
			}
			this.step++;
		},

		async confirmImport() {
			await RoomsModule.confirmSharedCourseData(this.sharedCourseData);
			if (this.businessError.statusCode !== "") {
				this.isImportError = true;
				this.$emit("update-rooms");
			}

			const importedCourseId = RoomsModule.getImportedCourseId;

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
			RoomsModule.resetBusinessError();
			this.sharedCourseData = {
				code: "",
				courseName: "",
				status: "",
				message: "",
			};
			this.isImportError = false;
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
