import { Ref } from "vue";
import { VForm } from "vuetify/components";

export const getFirstInvalidElement = async (form: Ref<VForm>): Promise<HTMLElement | null> => {
	if (!form.value) return null;
	const { valid, errors } = await form.value.validate();
	if (!valid && errors.length > 0) {
		const firstErrorId = errors[0].id as string;
		return document.getElementById(firstErrorId);
	}
	return null;
};
