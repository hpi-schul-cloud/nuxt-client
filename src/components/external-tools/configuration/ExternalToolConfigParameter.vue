<template>
	<div>
		<template
			v-if="
				parameter.type !== ToolParameterType.Number &&
				parameter.type !== ToolParameterType.Boolean
			"
		>
			<v-text-field
				v-model="modelValue"
				:label="getLabelText()"
				:hint="parameter.description"
				persistent-hint
				:rules="validateParameter(parameter, modelValue)"
				validate-on="blur"
				:data-testId="parameter.name"
			/>
		</template>
		<template v-if="parameter.type === ToolParameterType.Boolean">
			<v-select
				v-model="selectedBooleanItem"
				:label="getLabelText()"
				:hint="parameter.description"
				persistent-hint
				:rules="validateParameter(parameter, modelValue)"
				:data-testId="parameter.name"
				:items="booleanSelectItems"
				item-value="value"
				item-title="text"
			/>
		</template>
		<template v-if="parameter.type === ToolParameterType.Number">
			<v-text-field
				v-model="modelValue"
				:label="getLabelText()"
				:hint="parameter.description"
				persistent-hint
				type="number"
				:rules="validateParameter(parameter, modelValue)"
				validate-on="blur"
				:data-testId="parameter.name"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ToolParameter, ToolParameterType } from "@/store/external-tool";
import {
	computed,
	ModelRef,
	PropType,
	ref,
	Ref,
	WritableComputedRef,
} from "vue";
import { useI18n } from "vue-i18n";
import { useExternalToolValidation } from "./external-tool-validation.composable";

const props = defineProps({
	parameter: {
		type: Object as PropType<ToolParameter>,
		required: true,
	},
});

const modelValue: ModelRef<string | undefined> = defineModel({
	type: String,
});

const { t } = useI18n();

const { validateParameter } = useExternalToolValidation();

const getLabelText = (): string => {
	if (props.parameter.isOptional) {
		return props.parameter.displayName;
	}
	return `${props.parameter.displayName} *`;
};

const selectedBooleanItem: WritableComputedRef<string | null> = computed({
	get() {
		return modelValue.value ?? null;
	},
	set(value: string | null) {
		modelValue.value = value ?? undefined;
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
</script>
