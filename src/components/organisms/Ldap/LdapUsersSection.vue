<template>
	<div class="users-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.users.title") }}
		</h3>
		<p>
			{{ $t("pages.administration.ldap.users.title.info") }}
		</p>

		<base-input
			data-testid="ldapDataUsersUserPath"
			:vmodel="value.userPath"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.title')"
			:placeholder="$t('pages.administration.ldap.users.path.title')"
			:info="$t('pages.administration.ldap.classes.path.info')"
			:validation-model="$v.value.userPath"
			:validation-messages="userPathValidationMessage"
			datatest-id="ldapDataUsersUserPath"
			@update:vmodel="$emit('input', { ...value, userPath: $event })"
		>
			<template #icon>
				<base-icon source="custom" icon="account_tree" />
			</template>
		</base-input>
		<p class="path-hint">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			data-testid="ldapDataUsersFirstName"
			:vmodel="value.firstName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.firstname')"
			:validation-model="$v.value.firstName"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersFirstName"
			@update:vmodel="$emit('input', { ...value, firstName: $event })"
		>
			<template #icon>
				<base-icon source="custom" icon="user" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataUsersFamilyName"
			:vmodel="value.familyName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.lastname')"
			:validation-model="$v.value.familyName"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersFamilyName"
			@update:vmodel="$emit('input', { ...value, familyName: $event })"
		>
			<template #icon>
				<base-icon source="custom" icon="user" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataUsersEmail"
			:vmodel="value.email"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.email')"
			:validation-model="$v.value.email"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersEmail"
			@update:vmodel="$emit('input', { ...value, email: $event })"
		>
			<template #icon>
				<base-icon source="material" icon="email" />
			</template>
		</base-input>
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
		>
			<template #icon>
				<base-icon source="custom" icon="uid" />
			</template>
		</base-input>
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
		>
			<template #icon>
				<base-icon source="custom" icon="uuid" />
			</template>
		</base-input>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { ldapPathValidationRegex } from "@/utils/ldapConstants";

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
			userPathValidationMessage: [
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
			this.$emit("update:errors", this.$v.$invalid, "users");
		},
	},
	validations() {
		return {
			value: {
				userPath: { required, ldapPathValidationRegex },
				firstName: { required },
				familyName: { required },
				email: { required },
				uid: { required },
				uuid: { required },
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.path-hint {
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
