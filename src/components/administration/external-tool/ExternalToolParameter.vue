<template>
	<div>
		<template
			v-if="
				parameter.type !== toolParameterTypeEnumNumber &&
				parameter.type !== toolParameterTypeEnumBoolean
			"
		>
			<v-text-field
				v-model="parameter.value"
				:label="getLabelText()"
				:rules="validateParameter(parameter)"
				validate-on-blur
				:data-testId="parameter.name"
				@input:value="$emit('update:value', parameter)"
			></v-text-field>
		</template>
		<template v-if="parameter.type === toolParameterTypeEnumBoolean">
			<v-checkbox
				v-model="parameter.value"
				:label="getLabelText()"
				:rules="validateParameter(parameter)"
				validate-on-blur
				:data-testId="parameter.name"
				@change:value="$emit('update:value', parameter)"
			></v-checkbox>
		</template>
		<template v-if="parameter.type === toolParameterTypeEnumNumber">
			<v-text-field
				v-model="parameter.value"
				:label="getLabelText()"
				type="number"
				:rules="validateParameter(parameter)"
				validate-on-blur
				:data-testId="parameter.name"
				@input:value="$emit('update:value', parameter)"
			></v-text-field>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useExternalToolValidation } from "./external-tool-validation.composable";
import VueI18n from "vue-i18n";
import { computed, inject, WritableComputedRef } from "vue";
import { ToolParameter, ToolParameterTypeEnum } from "@/store/external-tool";

const emit = defineEmits(["update:value"]);
const props = defineProps({
	value: {
		type: Object,
	},
});

const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
if (!i18n) {
	throw new Error("Injection of dependencies failed");
}

const parameter: WritableComputedRef<ToolParameter> = computed({
	get(): any {
		return props.value;
	},
	set(value: ToolParameter): void {
		emit("update:value", value);
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
	if (parameter.value.isOptional) {
		return parameter.value.name;
	}
	return `${parameter.value.name} *`;
};

const toolParameterTypeEnumBoolean: ToolParameterTypeEnum =
	ToolParameterTypeEnum.Boolean;
const toolParameterTypeEnumNumber: ToolParameterTypeEnum =
	ToolParameterTypeEnum.Number;
</script>
