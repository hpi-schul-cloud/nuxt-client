<template>
	<div class="mb-16">
		<h2 class="mb-8">
			{{ $t("pages.administration.ldap.users.title") }}
		</h2>
		<p>
			{{ $t("pages.administration.ldap.users.title.info") }}
		</p>
		<VTextField
			:model-value="modelValue.userPath"
			data-testid="ldapDataUsersUserPath"
			class="mt-8"
			:label="$t('pages.administration.ldap.users.path.title')"
			:placeholder="$t('pages.administration.ldap.users.path.title')"
			:hint="$t('pages.administration.ldap.classes.path.info')"
			:prepend-inner-icon="mdiFileTreeOutline"
			validate-on="blur"
			:rules="[rules.required, rules.isValidLdapPath]"
			datatest-id="ldapDataUsersUserPath"
			@update:model-value="$emit('update:modelValue', { ...modelValue, userPath: $event })"
		/>
		<p class="my-8">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<VTextField
			:model-value="modelValue.firstName"
			data-testid="ldapDataUsersFirstName"
			class="mt-8"
			:label="$t('pages.administration.ldap.users.path.firstname')"
			:prepend-inner-icon="mdiAccountCircleOutline"
			validate-on="blur"
			:rules="[rules.required]"
			datatest-id="ldapDataUsersFirstName"
			@update:model-value="$emit('update:modelValue', { ...modelValue, firstName: $event })"
		/>
		<VTextField
			:model-value="modelValue.familyName"
			data-testid="ldapDataUsersFamilyName"
			class="mt-8"
			:label="$t('pages.administration.ldap.users.path.lastname')"
			:prepend-inner-icon="mdiAccountCircleOutline"
			validate-on="blur"
			:rules="[rules.required]"
			datatest-id="ldapDataUsersFamilyName"
			@update:model-value="$emit('update:modelValue', { ...modelValue, familyName: $event })"
		/>
		<VTextField
			:model-value="modelValue.email"
			data-testid="ldapDataUsersEmail"
			class="mt-8"
			:label="$t('pages.administration.ldap.users.path.email')"
			:prepend-inner-icon="mdiEmailOutline"
			validate-on="blur"
			:rules="[rules.required]"
			datatest-id="ldapDataUsersEmail"
			@update:model-value="$emit('update:modelValue', { ...modelValue, email: $event })"
		/>
		<VTextField
			:model-value="modelValue.uid"
			data-testid="ldapDataUsersUid"
			class="mt-8"
			:label="$t('pages.administration.ldap.users.uid.title')"
			:info="$t('pages.administration.ldap.users.uid.info')"
			:prepend-inner-icon="mdiCardAccountDetailsOutline"
			validate-on="blur"
			:rules="[rules.required]"
			datatest-id="ldapDataUsersUid"
			@update:model-value="$emit('update:modelValue', { ...modelValue, uid: $event })"
		/>
		<VTextField
			:model-value="modelValue.uuid"
			data-testid="ldapDataUsersUuid"
			class="mt-8"
			:label="$t('pages.administration.ldap.users.uuid.title')"
			:info="$t('pages.administration.ldap.users.uuid.info')"
			:prepend-inner-icon="mdiAccountBoxOutline"
			validate-on="blur"
			:rules="[rules.required]"
			datatest-id="ldapDataUsersUuid"
			@update:model-value="$emit('update:modelValue', { ...modelValue, uuid: $event })"
		/>
	</div>
</template>

<script>
import {
	mdiAccountBoxOutline,
	mdiAccountCircleOutline,
	mdiCardAccountDetailsOutline,
	mdiEmailOutline,
	mdiFileTreeOutline,
} from "@icons/material";
import { isRequired, isValidLdapPath } from "@util-validators";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	props: {
		modelValue: {
			type: Object,
			default() {
				return {};
			},
		},
		validate: {
			type: Boolean,
		},
	},
	emits: ["update:modelValue", "update:errors"],
	setup() {
		const { t } = useI18n();

		const rules = computed(() => ({
			required: isRequired(t("common.validation.required")),
			isValidLdapPath: isValidLdapPath(t("pages.administration.ldapEdit.validation.path")),
		}));

		return { rules };
	},
	data() {
		return {
			mdiAccountBoxOutline,
			mdiAccountCircleOutline,
			mdiCardAccountDetailsOutline,
			mdiEmailOutline,
			mdiFileTreeOutline,
		};
	},
	watch: {
		validate: function () {
			this.$emit("update:errors", this.v$.$invalid, "users");
		},
	},
});
</script>
