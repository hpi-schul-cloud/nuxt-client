<template>
	<DefaultWireframe :headline="headline" :breadcrumbs="breadcrumbs" max-width="short">
		<div class="d-flex justify-end mb-4">
			<VBtn
				variant="outlined"
				size="small"
				:to="{
					name: 'administration-classes-edit',
					params: { classId },
				}"
				data-testid="rename-class-btn"
			>
				<VIcon :icon="mdiPencilOutline" class="me-1" />
				{{ t("pages.administration.classes.rename") }}
			</VBtn>
		</div>

		<VForm ref="formRef" @submit.prevent="onSave">
			<!-- Section 1: Teachers -->
			<VCard variant="outlined" class="pa-4 mb-4 rounded-lg">
				<div class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center">
					<VIcon :icon="mdiAccountGroupOutline" size="small" class="me-2 text-primary" />
					{{ t("pages.administration.classes.manageTeachers") }}
				</div>

				<div data-testid="teacher-selection-on-manage-class">
					<VAutocomplete
						v-model="selectedTeacherIds"
						:items="allTeacherOptions"
						item-title="title"
						item-value="value"
						:label="t('pages.administration.classes.manageTeachers')"
						:placeholder="t('pages.administration.classes.manageTeachersPlaceholder')"
						multiple
						chips
						closable-chips
						clearable
						:rules="teacherRules"
						data-testid="input_manage_teachers"
					/>
				</div>
				<div class="d-none">
					<label for="select-teacher-ids" class="d-none">Teacher IDs</label>
					<select id="select-teacher-ids" name="teacherIds[]" multiple aria-label="Teacher IDs">
						<option v-for="id in selectedTeacherIds" :key="id" :value="id" selected>{{ id }}</option>
					</select>
				</div>
			</VCard>

			<!-- Section 2: Students -->
			<VCard variant="outlined" class="pa-4 mb-4 rounded-lg">
				<div class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center">
					<VIcon :icon="mdiAccountMultipleOutline" size="small" class="me-2 text-primary" />
					{{ t("pages.administration.classes.manageStudents") }}
				</div>

				<div data-testid="student-selection-on-manage-class">
					<VAutocomplete
						v-model="selectedUserIds"
						:items="visibleStudentOptions"
						item-title="title"
						item-value="value"
						:label="t('pages.administration.classes.manageStudents')"
						:placeholder="t('pages.administration.classes.manageStudentsPlaceholder')"
						multiple
						chips
						closable-chips
						clearable
						data-testid="input_manage_students"
					/>
				</div>
				<div class="d-none">
					<label for="select-user-ids" class="d-none">User IDs</label>
					<select id="select-user-ids" name="userIds" multiple aria-label="User IDs">
						<option v-for="id in selectedUserIds" :key="id" :value="id" selected>{{ id }}</option>
					</select>
				</div>
			</VCard>

			<!-- Actions -->
			<div class="d-flex flex-column-reverse flex-sm-row justify-end ga-3 mb-6">
				<VBtn variant="outlined" data-testid="button_manage_cancel" class="btn-cancel px-6" @click="onCancel">
					{{ t("common.actions.cancel") }}
				</VBtn>
				<VBtn color="primary" type="submit" data-testid="manage-confirm" :loading="isMutating" class="px-6">
					{{ t("common.actions.save") }}
				</VBtn>
			</div>
		</VForm>

		<VDivider class="my-6" />

		<!-- Guidance & Registration Links Section -->
		<div class="mb-4">
			<h2 class="text-h6 font-weight-bold mb-2">
				{{ t("pages.administration.classes.studentsNotInSystem") }}
			</h2>
			<div v-if="isConsentNecessary" class="mb-3">
				<p class="text-body-2 mb-2">{{ t("pages.administration.classes.inviteParentsViaLink") }}</p>
				<h3 class="text-subtitle-1 font-weight-bold mt-3 mb-2">
					{{ t("pages.administration.classes.obtainConsent") }}
				</h3>
				<p v-if="isSchoolSynced" class="text-body-2">
					{{ t("pages.administration.classes.ldapLoginPresence") }}
				</p>
				<div v-else>
					<VBtn
						color="secondary"
						variant="tonal"
						:loading="isSendingEmails"
						data-testid="send-registration-links-btn"
						class="btn-send-links-emails my-2"
						:data-class="classId"
						data-role="student"
						@click="onSendRegistrationLinks"
					>
						{{ t("pages.administration.classes.sendRegistrationLinks") }}
					</VBtn>
				</div>
			</div>

			<h2 class="text-h6 font-weight-bold mt-4 mb-2">{{ t("pages.administration.classes.pleaseNote") }}</h2>
			<VExpansionPanels variant="accordion" data-testid="class-manage-expansion-panels">
				<VExpansionPanel v-for="(note, idx) in notes" :key="idx" :title="note.title" :text="note.content" />
			</VExpansionPanels>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission } from "@api-server";
import { useAppStore, useSchoolStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useClassFormOptions, useGroupClasses, UserSelectOption } from "@data-group";
import { mdiAccountGroupOutline, mdiAccountMultipleOutline, mdiPencilOutline } from "@icons/material";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import type { VForm } from "vuetify/components";

const props = defineProps({
	classId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();
const router = useRouter();
const appStore = useAppStore();
const formRef = ref<VForm>();

const { fetchClassById, updateClass, sendRegistrationLinks, isMutating } = useGroupClasses();
const { teacherOptions, studentOptions, loadTeachers, loadStudents, isAdmin } = useClassFormOptions();
const { isSchoolSynced } = useSchoolStoreRefs();

const isConsentNecessary = computed(() => useEnvConfig().value.FEATURE_CONSENT_NECESSARY);
const canListStudents = computed(
	() =>
		isAdmin.value ||
		appStore.userPermissions?.includes(Permission.STUDENT_LIST) ||
		!!appStore.hasPermission?.(Permission.STUDENT_LIST)?.value
);

const currentClassName = ref("");
const selectedTeacherIds = ref<string[]>([]);
const selectedUserIds = ref<string[]>([]);
const extraTeachers = ref<UserSelectOption[]>([]);
const extraStudents = ref<UserSelectOption[]>([]);
const isSendingEmails = ref(false);

const headline = computed(() =>
	currentClassName.value
		? `${t("pages.administration.classes.manage")}: ${currentClassName.value}`
		: t("pages.administration.classes.manage")
);

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{
		title: t("pages.administration.classes.index.title"),
		to: "/administration/groups/classes",
	},
	{
		title: headline.value,
		disabled: true,
	},
]);

document.title = buildPageTitle(t("pages.administration.classes.manage"));

const allTeacherOptions = computed<UserSelectOption[]>(() => {
	const map = new Map<string, UserSelectOption>();
	for (const opt of teacherOptions.value) {
		map.set(opt.value, opt);
	}
	for (const opt of extraTeachers.value) {
		if (!map.has(opt.value)) {
			map.set(opt.value, opt);
		}
	}
	return Array.from(map.values());
});

const allStudentOptions = computed<UserSelectOption[]>(() => {
	const map = new Map<string, UserSelectOption>();
	for (const opt of studentOptions.value) {
		map.set(opt.value, opt);
	}
	for (const opt of extraStudents.value) {
		if (!map.has(opt.value)) {
			map.set(opt.value, opt);
		}
	}
	return Array.from(map.values());
});

const visibleStudentOptions = computed<UserSelectOption[]>(() => {
	if (canListStudents.value) {
		return allStudentOptions.value;
	}
	return allStudentOptions.value.filter((opt) => selectedUserIds.value.includes(opt.value));
});

const teacherRules = [
	(val: string[]) => {
		if (isAdmin.value) return true;
		return (val && val.length > 0) || t("common.validation.required");
	},
];

const notes = computed(() => {
	if (isConsentNecessary.value) {
		return [
			{
				title: t("pages.administration.classes.noteAnalogueConsentTitle"),
				content: t("pages.administration.classes.noteAnalogueConsentText"),
			},
			{
				title: t("pages.administration.classes.noteUnder16Title"),
				content: t("pages.administration.classes.noteUnder16Text"),
			},
			{
				title: t("pages.administration.classes.noteOver16Title"),
				content: t("pages.administration.classes.noteOver16Text"),
			},
			{
				title: t("pages.administration.classes.notePasswordTitle"),
				content: t("pages.administration.classes.notePasswordText"),
			},
		];
	}

	return [
		{
			title: t("pages.administration.classes.notePasswordTitle"),
			content: t("pages.administration.classes.notePasswordText"),
		},
	];
});

const extractIdAndOption = (item: unknown): { id: string; option?: UserSelectOption } => {
	if (typeof item === "string") {
		return { id: item };
	}
	if (item && typeof item === "object") {
		const obj = item as {
			_id?: string;
			id?: string;
			firstName?: string;
			lastName?: string;
			displayName?: string;
			email?: string;
		};
		const id = obj._id ?? obj.id ?? "";
		const title = `${obj.firstName ?? ""} ${obj.lastName ?? ""}`.trim() || obj.displayName || obj.email || id;
		return { id, option: id ? { title, value: id } : undefined };
	}
	return { id: "" };
};

const parseMembers = (items?: unknown[]): { ids: string[]; options: UserSelectOption[] } => {
	const ids: string[] = [];
	const options: UserSelectOption[] = [];
	for (const item of items ?? []) {
		const { id, option } = extractIdAndOption(item);
		if (id) {
			ids.push(id);
			if (option) options.push(option);
		}
	}
	return { ids, options };
};

const loadClassData = async () => {
	const cls = await fetchClassById(props.classId, { $populate: ["teacherIds", "userIds"] });
	if (!cls) return;

	currentClassName.value = cls.name ?? "";
	const teachers = parseMembers(cls.teacherIds);
	selectedTeacherIds.value = teachers.ids;
	extraTeachers.value = teachers.options;

	const students = parseMembers(cls.userIds);
	selectedUserIds.value = students.ids;
	extraStudents.value = students.options;
};

onMounted(async () => {
	await Promise.all([loadTeachers(), loadStudents(), loadClassData()]);
});

const onSave = async () => {
	const validation = await formRef.value?.validate();
	if (validation && !validation.valid) return;

	const { success } = await updateClass(props.classId, {
		teacherIds: selectedTeacherIds.value,
		userIds: selectedUserIds.value,
	});

	if (success) {
		router.push("/administration/groups/classes");
	}
};

const onCancel = () => {
	router.push("/administration/groups/classes");
};

const onSendRegistrationLinks = async () => {
	isSendingEmails.value = true;
	try {
		await sendRegistrationLinks(props.classId, "student");
	} finally {
		isSendingEmails.value = false;
	}
};
</script>
