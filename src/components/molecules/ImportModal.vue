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
					></v-text-field>
				</div>
				<div v-if="step === 3">
					{{ $t("pages.rooms.importCourse.step_3") }}
					{{ $t("pages.rooms.importCourse.error") }}
					<v-text-field
						v-model="sharedCourseData.courseName"
						outlined
						dense
						class="mt-1 text-field-course-name"
					></v-text-field>
				</div>
				<div v-if="sharedCourseData.status === 'error' && step === 3">
					<v-alert dense outlined type="error">
						{{ $t("pages.rooms.importCourse.error") }}
					</v-alert>
				</div>
			</div>
			<div class="button-section mt-8">
				<v-row>
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
							class="dialog-confirmed"
							color="primary"
							depressed
							:disabled="sharedCourseData.status === 'error' && step === 3"
							@click="nextStep"
						>
							{{ nextButtonName }}
						</v-btn>
					</v-col>
				</v-row>
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
		};
	},
	computed: {
		nextButtonName() {
			if (this.step < 3)
				return this.$t("pages.rooms.importCourse.btn.continue");
			return this.$t("pages.rooms.importCourse.btn.confirm");
		},
	},
	methods: {
		nextStep() {
			if (this.step == 2) {
				if (this.sharedCourseData.code === "") return;
				this.getSharingStatus(this.sharedCourseData.code);
			}
			if (this.step == 3) {
				this.confirmImport();
				return;
			}
			this.step++;
		},
		async getSharingStatus(sharingCode) {
			await RoomsModule.getSharedCourseData(sharingCode);
			this.sharedCourseData = RoomsModule.getCourseSharingStatus;
		},
		async confirmImport() {
			await RoomsModule.confirmSharedCourseData(this.sharedCourseData);

			const importedCourseId = RoomsModule.getImportedCourseId;

			if (importedCourseId) {
				this.step = 1;
				this.$emit("dialog-closed", false);
				window.location = `/courses/${importedCourseId}/edit/`;
			}
		},
		cancel() {
			this.$emit("dialog-closed", false);
			this.step = 1;
		},
		stepBack() {
			if (this.step == 1) {
				this.$emit("dialog-closed", false);
			}
			this.step--;
		},
		onClickStepper(step) {
			this.step = step;
		},
	},
};
</script>
<style lang="scss">
.v-dialog--active {
	overflow-y: hidden !important;
}
.cancel-confirm-button {
	text-align: right;
}
.step-sections {
	min-height: var(--sidebar-width);
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 1rem;
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
