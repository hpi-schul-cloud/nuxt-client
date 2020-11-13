<template>
	<div class="users-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.users.title") }}
		</h3>
		<p>
			{{ $t("pages.administration.ldap.users.title.info") }}
		</p>

		<base-input
			data-testid="ldapDataUsersUserPfad"
			:vmodel="value.userPfad"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.title')"
			:placeholder="$t('pages.administration.ldap.users.pfad.title')"
			:info="$t('pages.administration.ldap.classes.pfad.info')"
			:validation-model="$v.value.userPfad"
			:validation-messages="userPfadValidationMessage"
			datatest-id="ldapDataUsersUserPfad"
			@update:vmodel="$emit('input', { ...value, userPfad: $event })"
		/>
		<p class="pfad-hint">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			data-testid="ldapDataUsersFirstName"
			:vmodel="value.firstName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.firstname')"
			:validation-model="$v.value.firstName"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersFirstName"
			@update:vmodel="$emit('input', { ...value, firstName: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersFamilyName"
			:vmodel="value.familyName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.lastname')"
			:validation-model="$v.value.familyName"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersFamilyName"
			@update:vmodel="$emit('input', { ...value, familyName: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersEmail"
			:vmodel="value.email"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.email')"
			:validation-model="$v.value.email"
			:validation-messages="emailValidationMessages"
			datatest-id="ldapDataUsersEmail"
			@update:vmodel="$emit('input', { ...value, email: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersUid"
			:vmodel="value.uid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uid.title')"
			:info="$t('pages.administration.ldap.users.uid.info')"
			:validation-model="$v.value.uid"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersUid"
			@update:vmodel="$emit('input', { ...value, uid: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersUuid"
			:vmodel="value.uuid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uuid.title')"
			:info="$t('pages.administration.ldap.users.uuid.info')"
			:validation-model="$v.value.uuid"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersUuid"
			@update:vmodel="$emit('input', { ...value, uuid: $event })"
		/>
	</div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { ldapPathValidationRegex } from "@utils/ldapValidationRegex";

export default {
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
			usersValidationMessage: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			userPfadValidationMessage: [
				{
					key: "ldapPathValidationRegex",
					message: "Please match LDAP path format",
				},
				{ key: "required", message: this.$t("common.validation.required") },
			],
			emailValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
				{ key: "email", message: this.$t("common.validation.email") },
			],
		};
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "users");
		},
	},
	validations() {
		return {
			value: {
				userPfad: { required, ldapPathValidationRegex },
				firstName: { required },
				familyName: { required },
				email: { required, email },
				uid: { required },
				uuid: { required },
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.pfad-hint {
	margin-top: var(--space-xl-3);
	margin-bottom: var(--space-xl-2);
}
.users-container {
	margin-bottom: var(--space-xl-4);
}
.title-class {
	margin-bottom: var(--space-xl-2);
}
</style>
