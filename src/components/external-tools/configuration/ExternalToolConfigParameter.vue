<template>
	<div>
		<template
			v-if="
				parameter.type !== ToolParameterType.Number &&
				parameter.type !== ToolParameterType.Boolean
			"
		>
			<v-text-field
				v-model="inputValue"
				:label="getLabelText()"
				:hint="parameter.description"
				persistent-hint
				:rules="validateParameter(parameter, inputValue)"
				validate-on-blur
				:data-testId="parameter.name"
			></v-text-field>
		</template>
		<template v-if="parameter.type === ToolParameterType.Boolean">
			<v-select
				v-model="selectedBooleanItem"
				:label="getLabelText()"
				:hint="parameter.description"
				persistent-hint
				:rules="validateParameter(parameter, inputValue)"
				:data-testId="parameter.name"
				:items="booleanSelectItems"
				item-value="value"
				item-text="text"
			></v-select>
		</template>
		<template v-if="parameter.type === ToolParameterType.Number">
			<v-text-field
				v-model="inputValue"
				:label="getLabelText()"
				:hint="parameter.description"
				persistent-hint
				type="number"
				:rules="validateParameter(parameter, inputValue)"
				validate-on-blur
				:data-testId="parameter.name"
			></v-text-field>
		</template>
	</div>
</template>

<script lang="ts">
import {
	ToolParameter,
	ToolParameterType as toolParameterType,
} from "@/store/external-tool";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import {
	computed,
	defineComponent,
	PropType,
	ref,
	Ref,
	WritableComputedRef,
} from "vue";
import VueI18n from "vue-i18n";
import { useExternalToolValidation } from "./external-tool-validation.composable";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigParameter",
	props: {
		parameter: {
			type: Object as PropType<ToolParameter>,
			required: true,
		},
		value: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const inputValue: WritableComputedRef<string | undefined> = computed({
			get() {
				return props.value;
			},
			set(value: string | undefined) {
				emit("input", value);
			},
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values | undefined) => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const { validateParameter } = useExternalToolValidation(t);

		const getLabelText = (): string => {
			if (props.parameter.isOptional) {
				return props.parameter.displayName;
			}
			return `${props.parameter.displayName} *`;
		};

		const selectedBooleanItem: WritableComputedRef<string | null> = computed({
			get() {
				return inputValue.value ?? null;
			},
			set(value: string | null) {
				inputValue.value = value ?? undefined;
			},
		});

		const booleanSelectItems: Ref = ref([
			{
				text: t("common.words.noChoice"),
				value: null,
			},
			{
				text: t("common.words.yes"),
				value: "true",
			},
			{
				text: t("common.words.no"),
				value: "false",
			},
		]);

		const ToolParameterType = toolParameterType;

		return {
			inputValue,
			validateParameter,
			getLabelText,
			ToolParameterType,
			selectedBooleanItem,
			booleanSelectItems,
		};
	},
});
</script>
