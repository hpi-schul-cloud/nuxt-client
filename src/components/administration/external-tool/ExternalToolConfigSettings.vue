<template>
	<div>
		<div v-if="parameters.length > 0">
			<h2 class="text-h4 mb-10">
				Einstellungen
			</h2>
			<v-form v-model="parametersValid">
				<div v-for="(param, index) in parameters" :key="param.name">
					<template v-if="param.type !== toolParameterTypeEnumBoolean">
						<v-text-field :label="getParamLabelText(param)" :rules="validateParameter(param)"
									  @input="updateParameters($event, index)"
						></v-text-field>
					</template>
					<template v-if="param.type === toolParameterTypeEnumBoolean">
						<v-checkbox :rules="validateParameter(param)"
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
import { useExternalToolUtils } from "@pages/administration/external-tool/external-tool-utils.composable";

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
		const { validateParameter } = useExternalToolUtils(t);

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
			validateParameter,
			getParamLabelText,
			parametersValid,
			toolParameterTypeEnumBoolean: ToolParameterTypeEnum.Boolean,
		};
	}
});
</script>

<style scoped>

</style>
