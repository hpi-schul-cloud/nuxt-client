<template>
	<div>
		<template
			v-if="
				parameter.type !== ToolParameterType.Number &&
				parameter.type !== ToolParameterType.Boolean
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
		<template v-if="parameter.type === ToolParameterType.Boolean">
			<v-select
				v-model="selectItem"
				:label="getLabelText()"
				:rules="validateParameter(parameter)"
				:data-testId="parameter.name"
				:items="booleanSelectItems"
				item-value="value"
				item-text="text"
				@change:value="$emit('update:value', parameter)"
			></v-select>
		</template>
		<template v-if="parameter.type === ToolParameterType.Number">
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

<script lang="ts">
import { useExternalToolValidation } from "./external-tool-validation.composable";
import VueI18n from "vue-i18n";
import {
	computed,
	defineComponent,
	inject,
	PropType,
	ref,
	Ref,
	watch,
	WritableComputedRef,
} from "vue";
import {
	ToolParameter,
	ToolParameterType as toolParameterType,
} from "@/store/external-tool";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigParameter",
	emits: ["update:value"],
	props: {
		value: {
			type: Object as PropType<ToolParameter>,
			required: true,
		},
	},
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const parameter: WritableComputedRef<ToolParameter> = computed({
			get: (): ToolParameter => props.value as ToolParameter,
			set: (value: ToolParameter): void => emit("update:value", value),
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

		const selectItem: Ref<string | null> = ref(parameter.value.value ?? null);
		watch(selectItem, () => {
			parameter.value.value = selectItem.value ?? undefined;
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
			parameter,
			validateParameter,
			getLabelText,
			ToolParameterType,
			selectItem,
			booleanSelectItems,
		};
	},
});
</script>
