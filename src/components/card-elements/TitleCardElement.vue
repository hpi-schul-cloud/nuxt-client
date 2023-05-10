<template>
	<div>
		<h2 v-if="!editable">
			{{ title }}
		</h2>
		<v-textarea
			v-if="editable"
			v-model="title"
			rows="1"
			auto-grow
			solo
			flat
			:rules="[rules.required, rules.maxLength]"
			validate-on-blur
			:aria-label="t('components.cardElement.titleElement')"
			:placeholder="placeholder"
			@input="handleInput"
		/>
	</div>
</template>

<script lang="ts">
import { injectStrict } from "@/utils/inject";
import { defineComponent, ref, watch, inject } from "vue";
import VueI18n from "vue-i18n";

export default defineComponent({
	name: "TitleCardElement",
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		editable: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const i18n: VueI18n = injectStrict<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string, values?: Array<string> | object) => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const title = ref(props.value);

		watch(
			() => props.value,
			(newValue) => {
				title.value = newValue;
			}
		);

		const handleInput = () => emit("input", title.value);

		const TITLE_MAX_LENGTH = 400;
		const rules = {
			required: (value: string) =>
				!!value.trim() ||
				t("components.cardElement.titleElement.validation.required"),
			maxLength: (value: string) =>
				value.length <= TITLE_MAX_LENGTH ||
				t("components.cardElement.titleElement.validation.maxLength", {
					maxLength: TITLE_MAX_LENGTH.toString(),
				}),
		};

		return {
			title,
			handleInput,
			rules,
			t,
		};
	},
});
</script>
<style lang="scss" scoped>
::v-deep .v-textarea .v-input__slot {
	padding: 0 0 0 var(--ck-spacing-standard) !important;
	margin-bottom: 0;
}

::v-deep .v-textarea textarea {
	height: auto;
	max-height: none;
	padding: 0;
	margin-bottom: var(--space-sm);
	font-family: var(--font-accent);
	font-size: var(--heading-2);
	font-weight: var(--font-weight-normal);
	line-height: var(--line-height-sm);
	color: var(--v-black-base);
}

::v-deep .v-textarea.error--text textarea {
	border-bottom: 2px solid var(--v-error-base);
}
</style>
