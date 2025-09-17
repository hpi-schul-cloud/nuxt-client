<template>
	<GroupSelectionDialog
		:is-open="isOpen && step === 0"
		:description="$t('feature-course-sync.StartExistingCourseSyncDialog.text')"
		@confirm="onConfirmGroupSelection"
		@cancel="closeDialog"
	/>
	<vCustomDialog
		ref="start-existing-course-sync-dialog"
		:is-open="isOpen && step === 1"
		has-buttons
		:buttons="['cancel', 'confirm']"
		@dialog-confirmed="onConfirmWarning"
		@dialog-closed="closeDialog"
	>
		<template #title>
			<div class="text-h2 my-2 text-break">Synchronisation bestätigen</div>
		</template>

		<template #content>
			<WarningAlert data-testid="no-teacher-warning">
				<span data-testid="no-teacher-warning-text">
					{{
						$t(
							isUserInGroup
								? "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userInGroupWarning"
								: "feature-course-sync.StartExistingCourseSyncDialog.confirmation.userNotInGroupWarning"
						)
					}}
				</span>
			</WarningAlert>
			<p class="text-md mt-2" data-testid="group-dialog-info-text">
				{{
					$t(
						"feature-course-sync.StartExistingCourseSyncDialog.confirmation.text",
						{
							groupName: selectedGroup?.name || "",
							courseName: courseName,
						}
					)
				}}
			</p>
		</template>
	</vCustomDialog>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import {
	GroupResponse,
	GroupUserResponse,
	MeResponse,
	RoleName,
} from "@/serverApi/v3";
import type AuthModule from "@/store/auth";
import {
	AUTH_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { useCourseApi } from "@data-room";
import { WarningAlert } from "@ui-alert";
import { computed, ModelRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import GroupSelectionDialog from "./GroupSelectionDialog.vue";

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { t } = useI18n();

const props = defineProps({
	courseName: {
		type: String,
		default: "",
	},
	courseId: {
		type: String,
		default: undefined,
	},
	courseTeachers: {
		type: Array,
		default: undefined,
	},
});

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "success"): void;
}>();

const step: Ref<number> = ref(0);
const selectedGroup: Ref<GroupResponse | undefined> = ref();

const onConfirmGroupSelection = async (group: GroupResponse) => {
	selectedGroup.value = group;
	step.value = 1;
};

const { startSynchronization } = useCourseApi();
const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

const isUserInGroup = computed(() => {
	const me: MeResponse | undefined = authModule.getMe;

	if (!me || !selectedGroup.value) {
		return false;
	}

	const isPartOfGroup: boolean = selectedGroup.value.users.some(
		(user: GroupUserResponse) => user.id === me.user.id
	);

	const isAdmin: boolean = me.roles.some(
		(role) => role.name === RoleName.Administrator
	);

	if (isAdmin && !isPartOfGroup) {
		const allCourseTeacherPartOfGroup = props.courseTeachers?.every(
			(teacher) => {
				return selectedGroup.value?.users.some(
					(user) => user.firstName + " " + user.lastName === teacher
				);
			}
		);

		return allCourseTeacherPartOfGroup;
	} else {
		return isPartOfGroup;
	}
});

const onConfirmWarning = async () => {
	if (!selectedGroup.value || !props.courseId) {
		notifierModule.show({
			text: t("common.notification.error"),
			status: "error",
		});

		return;
	}

	try {
		await startSynchronization(props.courseId, selectedGroup.value.id);

		closeDialog();

		notifierModule.show({
			text: t("feature-course-sync.StartExistingCourseSyncDialog.success"),
			status: "success",
		});

		emit("success");
	} catch {
		notifierModule.show({
			text: t("common.notification.error"),
			status: "error",
		});

		return;
	}

	closeDialog();
};

const closeDialog = () => {
	isOpen.value = false;
	step.value = 0;
};
</script>
