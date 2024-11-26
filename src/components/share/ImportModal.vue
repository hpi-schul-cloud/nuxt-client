<template>
	<v-custom-dialog
		ref="dialog"
		:is-open="isOpen"
		:size="480"
		has-buttons
		:buttons="['cancel', 'confirm']"
		confirm-btn-title-key="common.actions.import"
		@dialog-confirmed="onConfirm"
		@dialog-canceled="onCancel"
	>
		<template #title>
			<div ref="textTitle" class="text-h4 my-2">
				{{ t(`components.molecules.import.${parentType}.options.title`) }}
			</div>
		</template>

		<template #content>
			<div>
				<div class="d-flex flex-row pa-2 mb-4 rounded bg-blue-lighten-5">
					<div class="mx-2">
						<v-icon color="info" :icon="mdiInformation" />
					</div>
					<RenderHTML
						data-testid="import-modal-external-tools-info"
						v-if="
							ctlToolsEnabled &&
							(parentType === 'courses' || parentType === 'columnBoard')
						"
						:html="t(`components.molecules.import.options.ctlTools.infoText`)"
					/>
					<RenderHTML
						v-else
						data-testid="import-modal-coursefiles-info"
						:html="
							t(`components.molecules.import.${parentType}.options.infoText`)
						"
					/>
				</div>
				<div class="mb-4">
					{{ t(`components.molecules.import.${parentType}.rename`) }}
				</div>
				<v-text-field
					ref="nameInputText"
					v-model="newName"
					:label="t(`components.molecules.import.${parentType}.label`)"
					:rules="[rules.required]"
				/>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script setup>
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { mdiInformation } from "@icons/material";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RenderHTML } from "@feature-render-html";

const emit = defineEmits(["import", "cancel"]);
const props = defineProps({
	isOpen: { type: Boolean },
	parentName: { type: String, required: true },
	parentType: { type: String, required: true },
});

const { t } = useI18n();
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const nameInput = ref(undefined);

const rules = reactive({
	required: (value) => !!value || t("common.validation.required"),
});

const newName = computed({
	get: () => nameInput.value ?? props.parentName,
	set: (value) => (nameInput.value = value),
});

const onConfirm = () => {
	if (rules.required(newName.value) === true) {
		emit("import", newName.value);
	}
};
const onCancel = () => emit("cancel");

const ctlToolsEnabled = computed(() => {
	return envConfigModule.getCtlToolsTabEnabled;
});
</script>
