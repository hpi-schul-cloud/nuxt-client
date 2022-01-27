<template>
	<vCustomDialog
		ref="customDialog"
		:is-open="isOpen"
		class="room-dialog"
		@dialog-closed="$emit('dialog-closed', false)"
	>
		<div slot="title" class="room-title"></div>
		<template slot="content">
			<v-stepper v-model="step" alt-labels flat class="mb-4">
				<v-stepper-header class="pa-0">
					<v-stepper-step step="1">
						{{ $t("pages.rooms.importCourse.step_1.text") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="2">
						{{ $t("pages.rooms.importCourse.step_2.text") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="3">
						{{ $t("pages.rooms.importCourse.step_3.text") }}
					</v-stepper-step>
				</v-stepper-header>
			</v-stepper>
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
					v-model="sharedCode"
					outlined
					dense
					class="mt-1"
				></v-text-field>
			</div>
			<div v-if="step === 3">
				{{ $t("pages.rooms.importCourse.step_3") }}
				<v-text-field
					v-model="courseDataToBeImported.msg"
					outlined
					dense
					class="mt-1"
				></v-text-field>
			</div>
			<div style="text-align: right">
				<v-btn class="dialog-closed" depressed outlined @click="cancel">
					{{ this.$t("common.actions.cancel") }}
				</v-btn>
				<v-btn
					class="dialog-confirmed"
					color="primary"
					depressed
					@click="nextStep"
				>
					{{ nextButtonName }}
				</v-btn>
			</div>
		</template>
	</vCustomDialog>
</template>
<script lang="ts">
import Vue from "vue";
import RoomsModule from "@store/rooms";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";

export default Vue.extend({
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
			sharedCode: "",
			courseDataToBeImported: {},
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
			// @ts-ignore
			this.step++;
			// @ts-ignore
			if (this.step == 3) {
				this.getSharingStatus(this.sharedCode);
			}
			// @ts-ignore
			if (this.step == 4) {
				this.$emit("dialog-closed", false);
				// @ts-ignore
				this.step = 1;
			}
		},
		async getSharingStatus(sharingCode: string) {
			await RoomsModule.checkSharingStatus(sharingCode);
			this.courseDataToBeImported = RoomsModule.getCourseSharingStatus;

			console.log(RoomsModule.getCourseSharingStatus);
		},
		confirm() {
			// server call
		},
		cancel() {
			this.$emit("dialog-closed", false);
			// @ts-ignore
			this.step = 1;
		},
	},
});
</script>
