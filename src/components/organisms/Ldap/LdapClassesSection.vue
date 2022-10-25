<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<base-input
			v-model="checked"
			type="switch"
			datatest-id="ldapDataClassesCheckbox"
			:label="$t('pages.administration.ldap.classes.activate.import')"
		>
		</base-input>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.path.subtitle") }}
		</p>
		<base-input
			data-testid="ldapDataClassesPath"
			:vmodel="classPathValue"
			:disabled="checked === false"
			type="text"
			class="mt--xl"
			:placeholder="$t('pages.administration.ldap.classes.path.title')"
			:label="$t('pages.administration.ldap.classes.path.title')"
			:info="$t('pages.administration.ldap.classes.path.info')"
			:validation-model="$v.value.classPath"
			:validation-messages="classPathValidationMessage"
			datatest-id="ldapDataClassesclassPath"
			@update:vmodel="$emit('input', { ...value, classPath: $event })"
		>
			<template #icon>
				<base-icon source="custom" icon="account_tree" />
			</template>
		</base-input>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.hint") }}
		</p>
		<base-input
			data-testid="ldapDataClassesNameAttribute"
			:vmodel="value.nameAttribute"
			:disabled="checked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			:validation-model="$v.value.nameAttribute"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesNameAttribute"
			@update:vmodel="$emit('input', { ...value, nameAttribute: $event })"
		>
			<template #icon>
				<base-icon source="custom" icon="class" />
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataClassesNameparticipantAttribute"
			:vmodel="value.participantAttribute"
			:disabled="checked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			:validation-model="$v.value.participantAttribute"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesParticipantsAttribute"
			@update:vmodel="
				$emit('input', { ...value, participantAttribute: $event })
			"
		>
			<template #icon>
				<base-icon source="custom" icon="gruppen" />
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
			checked: false,
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
	computed: {
		classPathValue() {
			if (this.checked === false) {
				return "";
			}
			return this.value.classPath;
		},
		classPathChanged() {
			return this.value.classPath;
		},
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "classes");
		},
		checked: function () {
			this.$emit("update:errors", this.$v.$invalid, "classes");
			if (this.checked === false) this.$emit("update:inputs");
		},
		classPathChanged: function () {
			this.checked = !!this.value.classPath;
		},
	},
	beforeMount() {
		if (this.value.classPath) this.checked = true;
	},
	validations() {
		if (this.checked === true) {
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
.title-class {
	margin-top: var(--space-xl-2);
	margin-bottom: var(--space-xl-2);
}
</style>
