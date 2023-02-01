<template>
	<div>
		<div v-if="parameters.length > 0">
			<h2 class="text-h4 mb-10">
				Einstellungen
			</h2>
			<v-form v-model="parametersValid">
				<!-- :rules="parameterValidations(param)" -->
				<div v-for="(param, index) in parameters" :key="param.name">
					<template v-if="param.type !== toolParameterTypeEnumBoolean">
						<v-text-field :label="getParamLabelText(param)" @input="updateParameters($event, index)"
						></v-text-field>
					</template>
					<template v-if="param.type === toolParameterTypeEnumBoolean">
						<v-checkbox
							:label="getParamLabelText(param)"
							@change="updateParameters($event, index)"
						></v-checkbox>
					</template>
				</div>
			</v-form>
		</div>
		<v-progress-linear :active="loading" indeterminate></v-progress-linear>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { externalToolsModule } from "@utils/store-accessor";
import { computed, ComputedRef, inject, Ref, toRef, watch } from "@nuxtjs/composition-api";
import { ToolParameter, ToolParameterTypeEnum } from "@store/external-tool";
import VueI18n from "vue-i18n";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigSettings",
	emits: ["parametersUpdated", "parametersValid"],
	props: {
		toolParameters: {
			type: Array,
			required: true,
		}
	},
	setup(props: any, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values | undefined) => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const parameters: Ref<ToolParameter[]> = toRef(props, "toolParameters");

		const loading: ComputedRef<boolean> = computed(() => externalToolsModule.getLoading);

		const updateParameters = (paramValue: string, index: number) => {
			// vue change detection for arrays does not work very well, so we have to set the value manually
			parameters.value[index] = { ...parameters.value[index], value: paramValue };
			emit("parametersUpdated", parameters.value);
		};

		const parametersValid: Ref<boolean> = ref(true);
		watch(parametersValid, () => {
			emit("parametersValid", parametersValid.value);
		});

		const parameterValidations = (param: ToolParameter): Array<() => boolean | string> => {
			const rules = []
			if (!param.isOptional && !param.value) {
				rules.push(() => t('common.validation.required'));
			}
			if (param.regex) {
				const regex = new RegExp(param.regex);
				rules.push(() => {
					if (param.value) {
						return regex.test(param.value) || t('common.validation.regex', { comment: param.regexComment });
					}
					return true;
				})
			}
			if (param.value && param.type) {
				switch (param.type) {
					case ToolParameterTypeEnum.String:
						rules.push(() => (typeof param.value == 'string') || t('common.validation.string'));
						break;
					case ToolParameterTypeEnum.Number:
						rules.push(() => !isNaN(Number(param.value)) || t('common.validation.number'))
						break;
					case ToolParameterTypeEnum.Boolean:
						rules.push(() => (param.value === 'true' || param.value === 'false') || t('common.validation.boolean'))
						break;
					default:
						break;
				}
			}
			return rules;
		};

		const getParamLabelText = (param: ToolParameter): string => {
			if (param.isOptional) {
				return param.name;
			}
			return `${param.name} *`
		};

		return {
			parameters,
			loading,
			updateParameters,
			parameterValidations,
			getParamLabelText,
			parametersValid,
			toolParameterTypeEnumBoolean: ToolParameterTypeEnum.Boolean,
		};
	}
});
</script>

<style scoped>

</style>
