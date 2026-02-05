<template>
	<div>
		<h2 class="my-10">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h2>
		<VSwitch v-model="checked" :label="$t('pages.administration.ldap.classes.activate.import')" :true-icon="mdiCheck" />
		<p class="my-10">
			{{ $t("pages.administration.ldap.classes.path.subtitle") }}
		</p>
		<VTextField
			:model-value="classPathValue"
			data-testid="ldapDataClassesPath"
			:disabled="checked === false"
			class="mt-8"
			:placeholder="$t('pages.administration.ldap.classes.path.title')"
			:label="$t('pages.administration.ldap.classes.path.title')"
			:hint="$t('pages.administration.ldap.classes.path.info')"
			:prepend-inner-icon="mdiFileTreeOutline"
			validate-on="blur"
			:validation-messages="classPathValidationMessage"
			datatest-id="ldapDataClassesclassPath"
			@update:model-value="$emit('update:modelValue', { ...modelValue, classPath: $event })"
		/>
		<p class="my-10">
			{{ $t("pages.administration.ldap.classes.hint") }}
		</p>
		<VTextField
			:model-value="modelValue.nameAttribute"
			data-testid="ldapDataClassesNameAttribute"
			:disabled="checked === false"
			class="mt-8"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			:prepend-inner-icon="mdiAccountEye"
			validate-on="blur"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesNameAttribute"
			@update:model-value="$emit('update:modelValue', { ...modelValue, nameAttribute: $event })"
		/>
		<VTextField
			:model-value="modelValue.participantAttribute"
			data-testid="ldapDataClassesNameparticipantAttribute"
			:disabled="checked === false"
			class="mt-8"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			:prepend-inner-icon="mdiAccountGroupOutline"
			validate-on="blur"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesParticipantsAttribute"
			@update:model-value="
				$emit('update:modelValue', {
					...modelValue,
					participantAttribute: $event,
				})
			"
		/>
	</div>
</template>

<script>
import { ldapPathRegexValidator } from "@/utils/ldapConstants";
import { mdiAccountEye, mdiAccountGroupOutline, mdiCheck, mdiFileTreeOutline } from "@icons/material";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineComponent } from "vue";

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
	emits: ["update:modelValue", "update:errors", "update:inputs"],
	setup() {
		return { v$: useVuelidate() };
	},
	data() {
		return {
			checked: false,
			classesValidationMessage: [{ key: "required", message: this.$t("common.validation.required") }],
			classPathValidationMessage: [
				{
					key: "ldapPathRegexValidator",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
				{ key: "required", message: this.$t("common.validation.required") },
			],
			mdiAccountGroupOutline,
			mdiCheck,
			mdiFileTreeOutline,
			mdiAccountEye,
		};
	},
	computed: {
		classPathValue() {
			if (this.checked === false) {
				return "";
			}
			return this.modelValue.classPath;
		},
		classPathChanged() {
			return this.modelValue.classPath;
		},
	},
	watch: {
		validate: function () {
			this.v$.$touch();
			this.$emit("update:errors", this.v$.$invalid, "classes");
		},
		checked: function () {
			this.$emit("update:errors", this.v$.$invalid, "classes");
			if (this.checked === false) {
				this.$emit("update:inputs");
			}
		},
		classPathChanged: function () {
			this.checked = !!this.modelValue.classPath;
		},
	},
	beforeMount() {
		if (this.modelValue.classPath) this.checked = true;
	},
	validations() {
		if (this.checked === true) {
			return {
				modelValue: {
					classPath: {
						required,
						ldapPathRegexValidator: ldapPathRegexValidator,
					},
					nameAttribute: { required },
					participantAttribute: { required },
				},
			};
		}
		return {
			modelValue: {},
		};
	},
});
</script>
