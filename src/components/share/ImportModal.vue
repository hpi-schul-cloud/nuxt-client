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
				<div
					class="d-flex flex-row pa-2 mb-4 rounded bg-blue-lighten-5"
					v-if="showAlertInfo"
				>
					<div class="mx-2">
						<v-icon color="info" :icon="mdiInformation" />
					</div>
					<div data-testid="import-options-table-header">
						{{ t("components.molecules.import.options.tableHeader.InfoText") }}
						<ul class="ml-6">
							<li
								data-testid="import-options-personal-data-text"
								v-if="showCourseInfo"
							>
								{{
									t(
										"components.molecules.shareImport.options.restrictions.infoText.personalData"
									)
								}}
							</li>
							<li v-if="showCourseInfo || showLessonInfo">
								{{
									t(
										"components.molecules.shareImport.options.restrictions.infoText.geogebra"
									)
								}}
							</li>
							<li v-if="showCourseInfo || showBoardInfo || showLessonInfo">
								{{
									t(
										"components.molecules.shareImport.options.restrictions.infoText.etherpad"
									)
								}}
							</li>
							<li v-if="showCourseInfo || showBoardInfo">
								{{
									t(
										"components.molecules.shareImport.options.restrictions.infoText.whiteboard"
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
							<li
								data-testid="import-modal-coursefiles-info"
								v-if="showCourseInfo"
							>
								{{
									t(
										"components.molecules.shareImport.options.restrictions.infoText.courseFiles"
									)
								}}
							</li>

							<li v-if="showCourseInfo">
								{{
									t(
										"components.molecules.shareImport.options.restrictions.infoText.courseGroups"
									)
								}}
							</li>
						</ul>
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
	return props.parentType === "courses" || props.parentType === "columnBoard";
});

const showAlertInfo = computed(() => {
	return (
		props.parentType === "courses" ||
		props.parentType === "columnBoard" ||
		props.parentType === "lessons"
	);
});

const showCourseInfo = computed(() => {
	return props.parentType === "courses";
});

const showBoardInfo = computed(() => {
	return props.parentType === "columnBoard";
});

const showLessonInfo = computed(() => {
	return props.parentType === "lessons";
});
</script>
