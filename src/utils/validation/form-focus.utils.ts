import { TemplateRef } from "vue";
import { VForm } from "vuetify/components";

/**
 * Workaround for Vuetify 3.9.4 fast-fail inputs errors will not be announced to screen readers on submitting,
 * so we are focusing the first invalid input to announce the error.
 * More Information: https://github.com/vuetifyjs/vuetify/issues/21920
 */
export const isValidOrFocusFirstInvalidInput = async (formRef: TemplateRef<VForm>) => {
	if (!formRef.value) return false;
	const { valid, errors } = await formRef.value.validate();

	if (!valid && errors.length > 0) {
		const firstErrorId = errors[0].id as string;
		document.getElementById(firstErrorId)?.focus();
		return false;
	}
	return true;
};
