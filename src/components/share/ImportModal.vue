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
		data-testid="import-modal"
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
					<div>
						<div data-testid="import-options-table-header">
							{{
								t(
									"components.molecules.shareImport.options.tableHeader.InfoText"
								)
							}}
							<ul class="ml-6">
								<li data-testid="import-options-personal-data-text">
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.personalData"
										)
									}}
								</li>
								<li
									v-if="showCtlToolsInfo"
									data-testid="import-modal-external-tools-info"
								>
									{{
										t(
											"components.molecules.shareImport.options.ctlTools.infoText.unavailable"
										)
									}}
								</li>
								<li
									v-if="showCtlToolsInfo"
									data-testid="import-modal-external-tools-protected-parameter-info"
								>
									{{
										t(
											"components.molecules.shareImport.options.ctlTools.infoText.protected"
										)
									}}
								</li>
								<li data-testid="import-modal-coursefiles-info">
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.courseFiles"
										)
									}}
								</li>
								<li>
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.etherpad"
										)
									}}
								</li>
								<li>
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.geogebra"
										)
									}}
								</li>
								<li>
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.courseGroups"
										)
									}}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="mb-4">
					{{ t(`components.molecules.import.${parentType}.rename`) }}
				</div>
				<v-text-field
					ref="nameInputText"
					v-model="newName"
					:label="t(`components.molecules.import.${parentType}.label`)"
					:rules="[rules.required]"
					data-testid="import-modal-name-input"
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

const showCtlToolsInfo = computed(() => {
	return (
		envConfigModule.getCtlToolsTabEnabled &&
		(props.parentType === "courses" || props.parentType === "columnBoard")
	);
});
</script>
