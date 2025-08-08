<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<v-switch
			v-model="checked"
			:label="$t('pages.administration.ldap.classes.activate.import')"
			:true-icon="mdiCheck"
		/>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.path.subtitle") }}
		</p>
		<base-input
			data-testid="ldapDataClassesPath"
			:model-value="classPathValue"
			:disabled="checked === false"
			type="text"
			class="mt-8"
			:placeholder="$t('pages.administration.ldap.classes.path.title')"
			:label="$t('pages.administration.ldap.classes.path.title')"
			:info="$t('pages.administration.ldap.classes.path.info')"
			:validation-model="v$.modelValue.classPath"
			:validation-messages="classPathValidationMessage"
			datatest-id="ldapDataClassesclassPath"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, classPath: $event })
			"
		>
			<template #icon>
				<v-icon :icon="mdiFileTreeOutline" />
			</template>
		</base-input>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.hint") }}
		</p>
		<base-input
			data-testid="ldapDataClassesNameAttribute"
			:model-value="modelValue.nameAttribute"
			:disabled="checked === false"
			type="text"
			class="mt-8"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			:validation-model="v$.modelValue.nameAttribute"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesNameAttribute"
			@update:model-value="
				$emit('update:modelValue', { ...modelValue, nameAttribute: $event })
			"
		>
			<template #icon>
				<v-icon class="custom-icon">$class</v-icon>
			</template>
		</base-input>
		<base-input
			data-testid="ldapDataClassesNameparticipantAttribute"
			:model-value="modelValue.participantAttribute"
			:disabled="checked === false"
			type="text"
			class="mt-8"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			:validation-model="v$.modelValue.participantAttribute"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesParticipantsAttribute"
			@update:model-value="
				$emit('update:modelValue', {
					...modelValue,
					participantAttribute: $event,
				})
			"
		>
			<template #icon>
				<v-icon :icon="mdiAccountGroupOutline" />
			</template>
		</base-input>
	</div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { ldapPathRegexValidator } from "@/utils/ldapConstants";
import { defineComponent } from "vue";
import useVuelidate from "@vuelidate/core";
import {
	mdiAccountGroupOutline,
	mdiCheck,
	mdiFileTreeOutline,
} from "@icons/material";

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
			classesValidationMessage: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
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

<style lang="scss" scoped>
.title-class {
	margin-top: 40px;
	margin-bottom: 40px;
}
</style>
