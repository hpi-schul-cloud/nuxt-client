<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<base-input
			v-model="unchecked"
			type="switch"
			datatest-id="ldapDataClassesCheckbox"
			:label="$t('pages.administration.ldap.classes.sctivate.import')"
		>
		</base-input>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.path.subtitle") }}
		</p>
		<base-input
			data-testid="ldapDataClassesPath"
			:vmodel="value.classPath"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:placeholder="$t('pages.administration.ldap.classes.path.title')"
			:label="$t('pages.administration.ldap.classes.path.title')"
			:info="$t('pages.administration.ldap.classes.path.info')"
			:validation-model="$v.value.classPath"
			:validation-messages="classPathValidationMessage"
			datatest-id="ldapDataClassesclassPath"
			@update:vmodel="$emit('input', { ...value, classPath: $event })"
		/>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.hint") }}
		</p>
		<base-input
			data-testid="ldapDataClassesNameAttribute"
			:vmodel="value.nameAttribute"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			:validation-model="$v.value.nameAttribute"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesNameAttribute"
			@update:vmodel="$emit('input', { ...value, nameAttribute: $event })"
		/>
		<base-input
			data-testid="ldapDataClassesNameparticipantAttribute"
			:vmodel="value.participantAttribute"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			:validation-model="$v.value.nameAttribute"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesParticipantsAttribute"
			@update:vmodel="
				$emit('input', { ...value, participantAttribute: $event })
			"
		/>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { ldapPathValidationRegex } from "@utils/ldapValidationRegex";

export default {
	// eslint-disable-next-line vue/require-prop-types
	props: {
		value: {
			type: Object,
			default() {
				return {};
			},
		},
		validate: {
			type: Boolean,
		},
	},
	data() {
		return {
			unchecked: false,
			classesValidationMessage: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			classPathValidationMessage: [
				{
					key: "ldapPathValidationRegex",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
				{ key: "required", message: this.$t("common.validation.required") },
			],
		};
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "classes");
		},
	},
	validations() {
		if (this.unchecked === true) {
			return {
				value: {
					classPath: { required, ldapPathValidationRegex },
					nameAttribute: { required },
					participantAttribute: { required },
				},
			};
		}
		return {
			value: {},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.title-class {
	margin-top: var(--space-xl-2);
	margin-bottom: var(--space-xl-2);
}
</style>
