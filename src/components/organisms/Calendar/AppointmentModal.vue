<!-- eslint-disable max-lines -->

<template>
	<div ref="appointmentModal" data-testid="appointmentModal">
		<base-modal :active.sync="modalActive">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info
					v-if="!editMode"
					:title="$t('components.organisms.Calendar.addAppointment')"
				/>
				<modal-body-info
					v-if="editMode"
					:title="$t('components.organisms.Calendar.changeAppointment')"
				/>
				<template>
					<user-has-role role="TEACHER">
						<input-radio
							:value="radioValue"
							label=""
							:options="[
								{ value: 'privat', label: 'Privater Termin', selected: true },
								{ value: 'teams', label: 'Teamtermin' },
								{ value: 'courses', label: 'Kurstermin' },
							]"
							@input="$emit('input', $event)"
						/>
					</user-has-role>
				</template>
				<base-select
					v-if="isTeamsDDVisible"
					v-model="contentTeams"
					label="Teams"
					:close-on-select="true"
					:options="usersTeams"
					@input="$emit('setTeamScopeId', contentTeams)"
				/>
				<base-select
					v-if="isCoursesDDVisible"
					v-model="contentCourses"
					label="Courses"
					:options="usersCourses"
					:close-on-select="true"
					@input="$emit('setCourseScopeId', contentCourses)"
				/>
				<base-input
					v-model="inputTextLocal"
					type="text"
					:placeholder="
						$t('components.organisms.Calendar.inputTextPlaceholder')
					"
					:label="$t('components.organisms.Calendar.inputText')"
				/>
				<base-input
					v-model="startDayLocal"
					type="date"
					:label="$t('components.organisms.Calendar.startDay')"
				/>
				<base-input
					v-model="startTimeLocal"
					type="time"
					:label="$t('components.organisms.Calendar.startTime')"
				/>
				<base-input
					v-model="fullDay"
					type="checkbox"
					:label="$t('components.organisms.Calendar.fullDay')"
					@update:vmodel="changeToFullDay"
				/>
				<base-input
					v-if="!fullDay"
					v-model="endDayLocal"
					type="date"
					:label="$t('components.organisms.Calendar.endDay')"
				/>
				<base-input
					v-if="!fullDay"
					v-model="endTimeLocal"
					type="time"
					:label="$t('components.organisms.Calendar.endTime')"
				/>
				<base-input
					v-model="placeLocal"
					type="text"
					:label="$t('components.organisms.Calendar.place')"
					:placeholder="$t('components.organisms.Calendar.placePlaceholder')"
				/>
			</template>
			<template v-slot:footerRight>
				<base-button
					id="button"
					design="primary text"
					@click="$emit('cancel', $event)"
				>
					Abbrechen
				</base-button>
				<base-button
					v-if="!dateEditable"
					design="primary"
					@click="$emit('prepareSubmit', $event)"
				>
					Hinzufügen
				</base-button>
				<base-button
					v-if="dateEditable"
					design="primary"
					@click="$emit('prepareRemove', $event)"
				>
					Löschen
				</base-button>
				<base-button
					v-if="dateEditable"
					design="primary"
					@click="$emit('prepareSave', $event)"
				>
					Speichern
				</base-button>
			</template>
		</base-modal>
		<base-modal :active.sync="confirmActive">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info
					:title="$t('components.organisms.Calendar.confirmation')"
				>
				</modal-body-info>
			</template>
			<template v-slot:footerRight>
				<base-button
					id="button"
					design="primary text"
					@click="$emit('cancelConfirm', $event)"
				>
					Abbrechen
				</base-button>
				<base-button
					v-if="isSubmit"
					design="primary"
					@click="$emit('submit', $event)"
				>
					Bestätigen
				</base-button>
				<base-button
					v-if="isRemove"
					design="primary"
					@click="$emit('removeDate', $event)"
				>
					Bestätigen
				</base-button>
				<base-button
					v-if="isSave"
					design="primary"
					@click="$emit('saveDate', $event)"
				>
					Bestätigen
				</base-button>
			</template>
		</base-modal>
	</div>
</template>
<script>
import BaseModal from "@components/base/BaseModal";
import BaseSelect from "@components/base/BaseSelect";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import InputRadio from "@components/organisms/DataFilter/inputs/Radio";
import UserHasRole from "@components/helpers/UserHasRole";

export default {
	components: { BaseModal, ModalBodyInfo, InputRadio, BaseSelect, UserHasRole },
	props: {
		inputText: {
			type: String,
			default: "",
		},
		startDay: {
			type: String,
			default: "",
		},
		startTime: {
			type: String,
			default: "",
		},
		endDay: {
			type: String,
			default: "",
		},
		endTime: {
			type: String,
			default: "",
		},
		place: {
			type: String,
			default: "",
		},
		radioValue: {
			type: String,
			default: "",
		},
		modalActive: {
			type: Boolean,
		},
		isTeamsDDVisible: {
			type: Boolean,
		},
		isCoursesDDVisible: {
			type: Boolean,
		},
		dateEditable: {
			type: Boolean,
		},
		confirmActive: {
			type: Boolean,
		},
		isSave: {
			type: Boolean,
		},
		isRemove: {
			type: Boolean,
		},
		isSubmit: {
			type: Boolean,
		},
		editMode: {
			type: Boolean,
		},
		usersTeams: {
			type: Array,
			default: () => {
				return [];
			},
		},
		usersCourses: {
			type: Array,
			default: () => {
				return [];
			},
		},
		contentTeams: {
			type: Object,
			default: undefined,
		},
		contentCourses: {
			type: Object,
			default: undefined,
		},
	},
	data: function () {
		return {
			fullDay: false,
		};
	},
	computed: {
		editModeLocal: {
			get: function () {
				return this.editMode;
			},
			set: function (value) {
				this.$emit("update:editMode", value);
			},
		},
		inputTextLocal: {
			get: function () {
				return this.inputText;
			},
			set: function (value) {
				this.$emit("update:inputText", value);
			},
		},
		startDayLocal: {
			get: function () {
				return this.startDay;
			},
			set: function (value) {
				this.$emit("update:startDay", value);
			},
		},
		startTimeLocal: {
			get: function () {
				return this.startTime;
			},
			set: function (value) {
				this.$emit("update:startTime", value);
			},
		},
		endDayLocal: {
			get: function () {
				return this.endDay;
			},
			set: function (value) {
				this.$emit("update:endDay", value);
			},
		},
		endTimeLocal: {
			get: function () {
				return this.endTime;
			},
			set: function (value) {
				this.$emit("update:endTime", value);
			},
		},
		placeLocal: {
			get: function () {
				return this.place;
			},
			set: function (value) {
				this.$emit("update:place", value);
			},
		},
	},
	methods: {
		changeToFullDay() {
			this.$emit("update:startTime", "00:00");
			this.$emit("update:endTime", "00:00");
		},
	},
};
</script>
