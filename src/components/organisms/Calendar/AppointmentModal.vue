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
					v-model="inputText"
					type="text"
					:label="$t('components.organisms.Calendar.inputText')"
					@update:vmodel="$emit('update:inputText', inputText)"
				/>
				<base-input
					v-model="startDay"
					type="date"
					:label="$t('components.organisms.Calendar.startDay')"
					@update:vmodel="$emit('update:startDay', startDay)"
				/>
				<base-input
					v-model="startTime"
					type="time"
					:label="$t('components.organisms.Calendar.startTime')"
					@update:vmodel="$emit('update:startTime', startTime)"
				/>
				<base-input
					v-model="fullDay"
					type="checkbox"
					:label="$t('components.organisms.Calendar.fullDay')"
					@change="onChange"
				/>
				<base-input
					v-if="!fullDay"
					v-model="endDay"
					type="date"
					:label="$t('components.organisms.Calendar.endDay')"
					@update:vmodel="$emit('update:endDay', endDay)"
				/>
				<base-input
					v-if="!fullDay"
					v-model="endTime"
					type="time"
					:label="$t('components.organisms.Calendar.endTime')"
					@update:vmodel="$emit('update:endTime', endTime)"
				/>
				<base-input
					v-model="place"
					type="text"
					:label="$t('components.organisms.Calendar.place')"
					@update:vmodel="$emit('update:place', place)"
				/>
			</template>
			<template v-slot:footerRight>
				<base-button design="primary text" @click="$emit('cancel', $event)">
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
	data() {
		return {
			fullDay: false,
		};
	},
	methods: {
		onChange() {
			this.fullDay = !this.fullDay;
			this.startTime = "00:00";
			this.endTime = "00:00";
		},
	},
};
</script>
