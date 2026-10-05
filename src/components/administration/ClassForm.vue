<template>
	<VForm ref="formRef" @submit.prevent="onSubmit">
		<!-- Section 1: Core Details -->
		<VCard variant="outlined" class="pa-4 mb-4 rounded-lg">
			<div class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center">
				<VIcon :icon="mdiSchoolOutline" size="small" class="me-2 text-primary" />
				{{ t("pages.administration.classes.form.sectionGeneral") }}
			</div>

			<!-- School Year -->
			<div data-testid="class-school-year-selection">
				<VSelect
					v-model="formData.year"
					:items="schoolYearOptions"
					item-title="title"
					item-value="value"
					:label="t('pages.administration.classes.form.schoolYear')"
					:placeholder="t('pages.administration.classes.form.chooseSchoolYear')"
					:disabled="formData.isCustom && !formData.keepYear"
					:rules="[isRequired()]"
					data-testid="input_class_school_year"
					class="mb-4"
				/>
			</div>

			<!-- Mode Segmented Control (Toggle) -->
			<div class="mb-3">
				<VBtnToggle
					:model-value="formData.isCustom"
					mandatory
					density="compact"
					color="primary"
					variant="outlined"
					class="w-100"
					data-testid="toggle_class_mode"
					@update:model-value="onModeChange"
				>
					<VBtn :value="false" class="flex-grow-1" data-testid="toggle_mode_standard">
						{{ t("pages.administration.classes.form.modeStandard") }}
					</VBtn>
					<VBtn :value="true" class="flex-grow-1" data-testid="toggle_mode_custom">
						{{ t("pages.administration.classes.form.modeCustom") }}
					</VBtn>
				</VBtnToggle>
				<a
					href="#"
					class="d-none"
					data-testid="classCreationExtraOptions"
					@click.prevent="formData.isCustom = !formData.isCustom"
				/>
			</div>

			<!-- Standard Mode (Grade + Suffix) -->
			<div v-if="!formData.isCustom" class="d-flex flex-column flex-sm-row gap-4">
				<VSelect
					v-model="formData.gradeLevel"
					:items="gradeLevels"
					:label="t('pages.administration.classes.form.grade')"
					:placeholder="t('pages.administration.classes.form.selectGrade')"
					:rules="[!formData.isCustom ? isRequired() : true]"
					data-testid="input_class_grade"
					class="flex-grow-1"
				/>
				<VTextField
					v-model="formData.classSuffix"
					:label="t('pages.administration.classes.form.classSuffix')"
					:placeholder="t('pages.administration.classes.form.classSuffixPlaceholder')"
					data-testid="input_class_suffix"
					class="flex-grow-1"
				/>
			</div>

			<!-- Custom Mode -->
			<div v-else>
				<VTextField
					v-model="formData.customName"
					:label="t('pages.administration.classes.form.customName')"
					:placeholder="t('pages.administration.classes.form.customNamePlaceholder')"
					:rules="[formData.isCustom ? isRequired() : true]"
					data-testid="input_class_custom_name"
					class="mb-2"
				/>
				<div class="d-none">
					<input v-model="formData.customName" type="text" data-testid="Klassenbezeichnung" name="classcustom" />
				</div>
				<VCheckbox
					v-model="formData.keepYear"
					:label="t('pages.administration.classes.form.keepYear')"
					density="compact"
					hide-details
					data-testid="checkbox_class_keep_year"
				/>
				<div class="d-none">
					<input
						v-model="formData.keepYear"
						type="checkbox"
						data-testid="maintain-school-year-in-class"
						name="keepyear"
					/>
				</div>
			</div>
		</VCard>

		<!-- Section 2: Teachers -->
		<VCard variant="outlined" class="pa-4 mb-4 rounded-lg">
			<div class="text-subtitle-1 font-weight-bold mb-1 d-flex align-center">
				<VIcon :icon="mdiAccountGroupOutline" size="small" class="me-2 text-primary" />
				{{ t("pages.administration.classes.form.sectionTeachers") }}
			</div>
			<div class="text-caption text-medium-emphasis mb-3">
				{{ t("pages.administration.classes.form.teachersHint") }}
			</div>

			<div data-testid="class-teacher-selection">
				<VAutocomplete
					v-model="formData.teacherIds"
					:items="teacherOptions"
					item-title="title"
					item-value="value"
					:label="t('pages.administration.classes.form.teachers')"
					:placeholder="t('pages.administration.classes.form.selectTeacher')"
					multiple
					chips
					closable-chips
					clearable
					data-testid="input_class_teachers"
				/>
			</div>
		</VCard>

		<!-- Preview Banner Card -->
		<VCard variant="tonal" color="primary" class="pa-4 mb-6 rounded-lg" data-testid="class_preview_card">
			<div class="d-flex align-center justify-space-between flex-wrap gap-2">
				<div class="d-flex align-center gap-2">
					<VIcon :icon="mdiCheckCircleOutline" size="small" />
					<span class="text-caption text-medium-emphasis text-uppercase font-weight-bold">
						{{ t("pages.administration.classes.form.previewTitle") }}
					</span>
				</div>
				<VChip
					color="primary"
					size="small"
					variant="flat"
					class="font-weight-bold"
					data-testid="class_preview_year_chip"
				>
					{{ selectedYearTitle || "-" }}
				</VChip>
			</div>
			<div class="d-flex align-center gap-2 mt-2">
				<span class="text-body-2 font-weight-medium">{{
					t("pages.administration.classes.form.previewClassName")
				}}</span>
				<span data-testid="class_preview_name" class="text-h6 font-weight-bold">
					{{ computedClassName || "-" }}
				</span>
			</div>
		</VCard>

		<!-- Actions -->
		<div class="d-flex flex-column-reverse flex-sm-row justify-end ga-3">
			<VBtn variant="outlined" data-testid="button_class_cancel" class="px-6" @click="onCancel">
				{{ t("common.actions.cancel") }}
			</VBtn>
			<VBtn
				v-if="!isEdit"
				color="primary"
				type="submit"
				:loading="loading"
				data-testid="button_class_submit"
				data-test-id="confirmClassCreate"
				class="px-8"
			>
				{{ t("common.actions.add") }}
			</VBtn>
			<VBtn
				v-else
				color="primary"
				type="submit"
				:loading="loading"
				data-testid="button_class_submit"
				data-test-id="confirm-class-edit"
				class="px-8"
			>
				{{ t("common.actions.save") }}
			</VBtn>
		</div>
	</VForm>
</template>

<script setup lang="ts">
import { mdiAccountGroupOutline, mdiCheckCircleOutline, mdiSchoolOutline } from "@icons/material";
import { isRequired } from "@util-validators";
import { computed, PropType, reactive, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { VForm } from "vuetify/components";

export interface ClassFormData {
	year: string;
	teacherIds: string[];
	isCustom: boolean;
	gradeLevel?: number;
	classSuffix: string;
	customName: string;
	keepYear: boolean;
}

export interface SchoolYearOption {
	title: string;
	value: string;
}

export interface TeacherOption {
	title: string;
	value: string;
}

const props = defineProps({
	isEdit: {
		type: Boolean,
		default: false,
	},
	initialData: {
		type: Object as PropType<Partial<ClassFormData>>,
		default: () => ({}),
	},
	schoolYearOptions: {
		type: Array as PropType<SchoolYearOption[]>,
		default: () => [],
	},
	teacherOptions: {
		type: Array as PropType<TeacherOption[]>,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(
		e: "submit",
		payload: {
			name: string;
			gradeLevel?: number;
			year?: string;
			teacherIds?: string[];
		}
	): void;
}>();

const { t } = useI18n();
const router = useRouter();

const formRef = useTemplateRef<InstanceType<typeof VForm>>("formRef");

const gradeLevels = Array.from({ length: 13 }, (_, i) => i + 1);

const formData = reactive<ClassFormData>({
	year: "",
	teacherIds: [],
	isCustom: false,
	gradeLevel: undefined,
	classSuffix: "",
	customName: "",
	keepYear: true,
});

watch(
	() => props.initialData,
	(val) => {
		if (val) {
			if (val.year !== undefined) formData.year = val.year;
			if (val.teacherIds !== undefined) formData.teacherIds = [...val.teacherIds];
			if (val.isCustom !== undefined) formData.isCustom = val.isCustom;
			if (val.gradeLevel !== undefined) formData.gradeLevel = val.gradeLevel;
			if (val.classSuffix !== undefined) formData.classSuffix = val.classSuffix;
			if (val.customName !== undefined) formData.customName = val.customName;
			if (val.keepYear !== undefined) formData.keepYear = val.keepYear;
		}
	},
	{ immediate: true, deep: true }
);

const computedClassName = computed(() => {
	if (formData.isCustom) {
		return formData.customName.trim();
	}
	const grade = formData.gradeLevel ? `${formData.gradeLevel}` : "";
	return `${grade}${formData.classSuffix}`.trim();
});

const selectedYearTitle = computed(() => {
	if (formData.isCustom && !formData.keepYear) {
		return t("pages.administration.classes.form.isCustom");
	}
	const match = props.schoolYearOptions.find((opt) => opt.value === formData.year);
	return match?.title || formData.year;
});

const onModeChange = (isCustomVal: unknown) => {
	formData.isCustom = Boolean(isCustomVal);
};

const onSubmit = async () => {
	const valid = await formRef.value?.validate();
	if (!valid?.valid) return;

	let name: string;
	let gradeLevel: number | undefined = undefined;
	let year: string | undefined = undefined;

	if (formData.isCustom) {
		name = formData.customName.trim();
		if (formData.keepYear) {
			year = formData.year;
		}
	} else {
		name = formData.classSuffix.trim();
		gradeLevel = formData.gradeLevel;
		year = formData.year;
	}

	emit("submit", {
		name,
		gradeLevel,
		year,
		teacherIds: formData.teacherIds,
	});
};

const onCancel = () => {
	router.push("/administration/groups/classes");
};
</script>
