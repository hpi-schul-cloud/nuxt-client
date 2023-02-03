<template>
	<div>
		<template v-if="parameter.type !== toolParameterTypeEnumNumber">
			<v-text-field v-model="parameter.value" :label="getLabelText()"
						  :rules="validateParameter(parameter)" validate-on-blur
						  :data-testId="parameter.name"
						  @input:value="$emit('update:value', parameter)"
			></v-text-field>
		</template>
		<!--<template v-if="parameter.type === toolParameterTypeEnumBoolean">
			<v-checkbox v-model="parameter.value" :label="getLabelText()"
						:rules="validateParameter(parameter)" validate-on-blur
						:data-testId="parameter.name"
						@change:value="$emit('update:value', parameter)"
			></v-checkbox>
		</template>-->
		<template v-if="parameter.type === toolParameterTypeEnumNumber">
			<v-text-field v-model="parameter.value" :label="getLabelText()" type="number"
						  :rules="validateParameter(parameter)" validate-on-blur
						  :data-testId="parameter.name"
						  @input:value="$emit('update:value', parameter)"
			></v-text-field>
		</template>
	</div>
</template>

<script lang="ts">
// eslint-disable-next-line vue/require-direct-export
import { defineComponent } from "@vue/composition-api";
import { computed, inject } from "@nuxtjs/composition-api";
import { ToolParameter, ToolParameterTypeEnum } from "@store/external-tool";
import { useExternalToolValidation } from "./external-tool-validation.composable";
import VueI18n from "vue-i18n";

export default defineComponent({
	name: "ExternalToolParameter",
	emits: ["update:value"],
	props: {
		value: {
			type: Object,
			default: () => {
			},
		}
	},
	setup(props: any, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const parameter = computed<ToolParameter>({
			get() {
				return props.value
			},
			set(value: ToolParameter) {
				emit("update:value", value);
			}
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
			return `${parameter.value.name} *`
		};

		return {
			parameter,
			getLabelText,
			validateParameter,
			toolParameterTypeEnumBoolean: ToolParameterTypeEnum.Boolean,
			toolParameterTypeEnumNumber: ToolParameterTypeEnum.Number,
		}
	}
});
</script>
