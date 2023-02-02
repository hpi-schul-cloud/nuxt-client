<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ $t("pages.tool.settings") }}
		</h2>
		<v-form v-model="parametersValid">
			<div v-for="(param, index) in template.parameters" :key="param.name">
				<template v-if="param.type !== toolParameterTypeEnumBoolean">
					<v-text-field v-model="param.value" :label="getParamLabelText(param)"
								  :rules="validateParameter(param)"
								  @input:value="updateParameter(template, $event, index)"
					></v-text-field>
				</template>
				<template v-if="param.type === toolParameterTypeEnumBoolean">
					<v-checkbox v-model="param.value" :rules="validateParameter(param)"
								:label="getParamLabelText(param)"
								@input:value="updateParameter(template, $event, index)"
					></v-checkbox>
				</template>
			</div>
		</v-form>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { computed, ComputedRef, inject, Ref, watch } from "@nuxtjs/composition-api";
import { ToolConfigurationTemplate, ToolParameter, ToolParameterTypeEnum } from "@store/external-tool";
import VueI18n from "vue-i18n";
import ExternalToolsModule from "@store/external-tools";
import { useExternalToolValidation } from "./external-tool-validation.composable";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	emits: ["update:value", "parametersValid"],
	props: {
		value: {
			type: Object,
			default: () => new ToolConfigurationTemplate(),
		}
	},
	setup(props: any, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const externalToolsModule: ExternalToolsModule | undefined = inject<ExternalToolsModule>("externalToolsModule");
		if (!i18n || !externalToolsModule) {
			throw new Error("Injection of dependencies failed");
		}

		const template = computed<ToolConfigurationTemplate>({
			get() {
				return props.value
			},
			set(value: ToolConfigurationTemplate) {
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

		const loading: ComputedRef<boolean> = computed(() => externalToolsModule.getLoading);

		const updateParameter = (model: ToolConfigurationTemplate, newValue: string, index: number) => {
			const newModel: ToolConfigurationTemplate = { ...model };
			newModel.parameters[index] = { ...newModel.parameters[index], value: newValue };
			emit("update:value", newModel);
		};

		const { validateParameter } = useExternalToolValidation(t);

		const parametersValid: Ref<boolean> = ref(true);
		watch(parametersValid, () => {
			emit("parametersValid", parametersValid.value);
		});

		const getParamLabelText = (param: ToolParameter): string => {
			if (param.isOptional) {
				return param.name;
			}
			return `${param.name} *`
		};

		return {
			t,
			template,
			updateParameter,
			loading,
			validateParameter,
			getParamLabelText,
			parametersValid,
			toolParameterTypeEnumBoolean: ToolParameterTypeEnum.Boolean,
		};
	}
});
</script>
