<template>
	<VForm ref="formRef" @submit.prevent="onSubmit">
		<!-- School Year -->
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

		<!-- Teachers -->
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
			class="mb-4"
		/>

		<!-- Custom vs Standard Switch -->
		<VSwitch
			v-model="formData.isCustom"
			color="primary"
			:label="t('pages.administration.classes.form.isCustom')"
			data-testid="switch_class_is_custom"
			class="mb-4"
		/>

		<!-- Standard Mode (Grade + Suffix) -->
		<div v-if="!formData.isCustom" class="d-flex flex-column flex-sm-row gap-4 mb-4">
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
		<div v-else class="mb-4">
			<VTextField
				v-model="formData.customName"
				:label="t('pages.administration.classes.form.customName')"
				:placeholder="t('pages.administration.classes.form.customNamePlaceholder')"
				:rules="[formData.isCustom ? isRequired() : true]"
				data-testid="input_class_custom_name"
				class="mb-2"
			/>
			<VCheckbox
				v-model="formData.keepYear"
				:label="t('pages.administration.classes.form.keepYear')"
				data-testid="checkbox_class_keep_year"
			/>
		</div>

		<!-- Preview Card -->
		<VCard variant="tonal" class="pa-4 mb-6" data-testid="class_preview_card">
			<div class="text-subtitle-2 mb-1 text-medium-emphasis">
				{{ t("pages.administration.classes.form.previewTitle") }}
			</div>
			<div class="d-flex align-center gap-2">
				<strong>{{ t("pages.administration.classes.form.previewClassName") }}</strong>
				<span data-testid="class_preview_name" class="text-primary font-weight-bold">
					{{ computedClassName || "-" }}
				</span>
			</div>
		</VCard>

		<!-- Actions -->
		<VBtn
			color="primary"
			type="submit"
			:loading="loading"
			block
			data-testid="button_class_submit"
			class="mb-3"
		>
			{{ isEdit ? t("common.actions.save") : t("common.actions.add") }}
		</VBtn>

		<VBtn
			variant="text"
			block
			data-testid="button_class_cancel"
			@click="onCancel"
		>
			{{ t("common.actions.cancel") }}
		</VBtn>
	</VForm>
</template>

<script setup lang="ts">
import { isRequired } from "@util-validators";
import { computed, PropType, reactive, ref, useTemplateRef, watch } from "vue";
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
	(e: "submit", payload: {
		name: string;
		gradeLevel?: number;
		year?: string;
		teacherIds?: string[];
	}): void;
}>();

const { t } = useI18n();
const router = useRouter();

const formRef = useTemplateRef<InstanceType<typeof VForm>>("formRef");

const gradeLevels = Array.from({ length: 13 }, (_, i) => i + 1);

const formData = reactive<ClassFormData>({
	year: props.initialData.year ?? "",
	teacherIds: props.initialData.teacherIds ? [...props.initialData.teacherIds] : [],
	isCustom: props.initialData.isCustom ?? false,
	gradeLevel: props.initialData.gradeLevel,
	classSuffix: props.initialData.classSuffix ?? "",
	customName: props.initialData.customName ?? "",
	keepYear: props.initialData.keepYear ?? true,
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
	{ deep: true }
);

const computedClassName = computed(() => {
	if (formData.isCustom) {
		return formData.customName.trim();
	}
	const grade = formData.gradeLevel ? `${formData.gradeLevel}` : "";
	return `${grade}${formData.classSuffix}`.trim();
});

const onSubmit = async () => {
	const valid = await formRef.value?.validate();
	if (!valid?.valid) return;

	let name = "";
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
