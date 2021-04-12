<template>
	<div ref="appointmentModal" data-testid="appointmentModal">
		<base-modal :active.sync="modalActive">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info title="Termin Hinzufügen" />
				<base-input
					v-model="inputText"
					type="text"
					label="Termin Bezeichnung"
					@update:vmodel="$emit('update:inputText', inputText)"
				/>
				<base-input
					v-model="startDay"
					type="date"
					label="Start Tag"
					@update:vmodel="$emit('update:startDay', startDay)"
				/>
				<base-input
					v-model="startTime"
					type="time"
					label="Start Zeit"
					@update:vmodel="$emit('update:startTime', startTime)"
				/>
				<base-input
					v-model="endDay"
					type="date"
					label="End Tag"
					@update:vmodel="$emit('update:endDay', endDay)"
				/>
				<base-input
					v-model="endTime"
					type="time"
					label="End Zeit"
					@update:vmodel="$emit('update:endTime', endTime)"
				/>
				<div>
					<input-radio
						:value="radioValue"
						label=""
						:options="[
							{ value: 'teams', label: 'Teams ?' },
							{ value: 'courses', label: 'Kurse ?' },
						]"
						@input="$emit('input', $event)"
					/>
				</div>
				<base-select
					v-if="isTeamsDDVisible"
					v-model="contentTeams"
					label="Teams"
					:close-on-select="true"
					:options="usersTeams"
					@input="$emit('setScopeId', contentTeams)"
				/>
				<base-select
					v-if="isCoursesDDVisible"
					v-model="contentCourses"
					label="Courses"
					:options="usersCourses"
					:close-on-select="true"
					@input="$emit('setScopeId', contentCourses)"
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
				<modal-body-info title="Bist du sicher?"> </modal-body-info>
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

export default {
	components: { BaseModal, ModalBodyInfo, InputRadio, BaseSelect },
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
};
</script>
