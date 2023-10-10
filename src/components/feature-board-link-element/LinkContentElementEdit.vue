<template>
	<div>
		<v-form @submit.prevent="onSubmit(url)" ref="form" :lazy-validation="true">
			<v-text-field
				v-model="url"
				:rules="[rules.isRequired, rules.isValidUrl]"
				label="Add URL todo-i18n"
				type="text"
				:autofocus="true"
				required
				validate-on="lazy"
			>
				<template v-slot:append>
					<button type="submit">
						<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
						<span class="d-sr-only">Submit todo-i18n</span>
					</button>
				</template>
			</v-text-field>
		</v-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { isRequired, isValidUrl } from "@util-validators";
import { mdiCheck } from "@mdi/js";

type VuetifyFormApi = {
	/**
	 * Runs the validation and returns if all fields are valid
	 * @see https://v2.vuetifyjs.com/en/components/forms/#validation-with-submit-26-clear
	 */
	validate: () => boolean;
};

export default defineComponent({
	name: "LinkContentElementEdit",
	components: {},
	emits: ["create:url"],
	setup(props, { emit }) {
		const url = ref<string>("");
		const form = ref<VuetifyFormApi | null>(null);
		const rules = {
			isRequired: isRequired("Error required"),
			isValidUrl: isValidUrl("Error Url"),
		};

		const onSubmit = (url: string) => {
			if (form.value && form.value.validate()) emit("create:url", url);
		};

		const onKeydownSubmit = (event: KeyboardEvent, url: string) => {
			event.stopPropagation();
			onSubmit(url);
		};

		return {
			onSubmit,
			onKeydownSubmit,
			form,
			url,
			rules,
			mdiCheck,
		};
	},
});
</script>
