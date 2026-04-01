<template>
	<SvsDialog
		v-model="isOpen"
		:is-loading="isLoading"
		:title="dialogTitle"
		data-testid="dialog-change-role-participants"
		@cancel="onClose"
	>
		<template #content>
			<div v-if="!isOwnershipHandoverMode" class="mb-4">
				{{ infoText }}
			</div>
			<div>
				<VRadioGroup v-if="!isOwnershipHandoverMode" ref="radioGroup" v-model="selectedRole" hide-details>
					<VRadio
						v-for="option in radioOptions"
						:key="option.role"
						:value="option.role"
						class="align-start mb-2"
						:data-testid="option.dataTestid"
					>
						<template #label>
							<div class="d-flex flex-column mt-2">
								{{ option.labelHeader }}
								<span v-for="labelDescription in option.labelDescriptions" :key="labelDescription" class="radio-label">
									{{ t(labelDescription) }}
								</span>
							</div>
						</template>
					</VRadio>
				</VRadioGroup>
				<WarningAlert
					v-if="selectedRole === RoleName.ROOMOWNER && currentOwnerFullName"
					:class="isOwnershipHandoverMode ? 'ml-0' : 'ml-8'"
				>
					<span class="alert-text">
						<template v-if="!isOwnershipHandoverMode">
							<i18n-t keypath="pages.rooms.members.handOverAlert.label" scope="global">
								<template #memberFullName>{{ memberFullName }}</template>
							</i18n-t>
							<p class="mb-0">
								{{
									t("pages.rooms.members.handOverAlert.label.subText", {
										roomOwner: currentOwnerFullName,
									})
								}}
							</p>
						</template>
						<template v-else>
							<i18n-t keypath="pages.rooms.members.handOverAlert.confirm.label" scope="global">
								<template #roomOwner>
									{{ currentOwnerFullName }}
								</template>
								<template #memberFullName>{{ memberFullName }}</template>
							</i18n-t>
							<p class="mb-0">
								{{
									t("pages.rooms.members.handOverAlert.confirm.label.subText", {
										memberFullName,
									})
								}}
							</p>
						</template>
					</span>
				</WarningAlert>
			</div>
		</template>

		<template #actions>
			<SvsDialogBtnCancel :disabled="isLoading" data-testid="change-role-cancel-btn" @click="onClose" />
			<SvsDialogBtnConfirm
				v-if="!isOwnershipHandoverMode"
				:disabled="isLoading || !selectedRole"
				data-testid="change-role-confirm-btn"
				text-lang-key="common.actions.confirm"
				@click="withLoading(() => onConfirm())"
			/>
			<SvsDialogBtnConfirm
				v-else
				:disabled="isLoading || !selectedRole"
				data-testid="change-owner-confirm-btn"
				text-lang-key="pages.rooms.members.roleChange.handOverBtn.text"
				@click="withLoading(() => onChangeOwner())"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { ChangeRoomRoleBodyParamsRoleName as RoleEnum, RoleName } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { RoomMember, useRoomDetailsStore, useRoomMembersStore } from "@data-room";
import { WarningAlert } from "@ui-alert";
import { SvsDialog, SvsDialogBtnCancel, SvsDialogBtnConfirm } from "@ui-dialog";
import { storeToRefs } from "pinia";
import { computed, ModelRef, PropType, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMember[]>,
		required: true,
	},
	isAdminMode: {
		type: Boolean,
		default: false,
	},
});

const isOpen: ModelRef<boolean> = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const isLoading = ref(false);
const withLoading = async (fn: () => Promise<void>) => {
	isLoading.value = true;
	try {
		await fn();
	} finally {
		isLoading.value = false;
	}
};

const { t } = useI18n();
const { room } = storeToRefs(useRoomDetailsStore());

const roomMembersStore = useRoomMembersStore();
const { selectedIds } = storeToRefs(roomMembersStore);
const { updateMembersRole, changeRoomOwner } = roomMembersStore;

const selectedRole = ref<string | null>(null);
const memberToChangeRole = toRef(props, "members");

const { user } = useAppStoreRefs();

const isChangeOwnershipOptionVisible = computed(() => {
	if (props.isAdminMode) {
		return memberToChangeRole.value.length === 1 && isMemberStudent.value === false;
	}

	const currentUserId = user.value?.id;
	return (
		currentUserId &&
		roomMembersStore.isRoomOwner(currentUserId) &&
		memberToChangeRole.value.length === 1 &&
		isMemberStudent.value === false
	);
});
const isOwnershipHandoverMode = ref(false);
const dialogTitle = computed(() =>
	isOwnershipHandoverMode.value
		? t("pages.rooms.members.roleChange.dialogTitle.handOver")
		: t("pages.rooms.members.changePermission")
);

watch(
	memberToChangeRole,
	() => {
		if (memberToChangeRole.value.length > 1) {
			const roleNamesInProp = memberToChangeRole.value.map((member) => member.roomRoleName);

			if (roleNamesInProp.every((roleName) => roleNamesInProp[0] === roleName)) {
				selectedRole.value = roleNamesInProp[0];
			}
		} else {
			selectedRole.value = memberToChangeRole.value[0]?.roomRoleName;
		}
	},
	{ immediate: true }
);

if (memberToChangeRole.value.length > 1) {
	const roleNamesInProp = memberToChangeRole.value.map((member) => member.roomRoleName);

	if (roleNamesInProp.every((roleName) => roleNamesInProp[0] === roleName)) {
		selectedRole.value = roleNamesInProp[0];
	}
} else {
	selectedRole.value = memberToChangeRole.value[0]?.roomRoleName;
}

const currentOwnerFullName = computed(() => roomMembersStore.getRoomOwnerFullName());

const memberFullName = computed(
	() => `${memberToChangeRole.value[0]?.firstName} ${memberToChangeRole.value[0]?.lastName}`
);

const memberSchoolRoles = computed(() => memberToChangeRole.value[0]?.schoolRoleNames);

const isMemberStudent = computed(() => memberSchoolRoles.value.includes(RoleName.STUDENT));

const infoText = computed(() => {
	const roomName = room.value?.name ?? "";
	if (memberToChangeRole.value.length === 1) {
		return t("pages.rooms.members.roleChange.subTitle", {
			memberFullName: memberFullName.value,
			roomName,
		});
	}
	return t("pages.rooms.members.roleChange.multipleUser.subTitle", {
		roomName,
	});
});

const onConfirm = async () => {
	if (!selectedRole.value) return;
	if (selectedRole.value === RoleName.ROOMOWNER) {
		isOwnershipHandoverMode.value = true;
		return;
	}
	await updateMembersRole(
		selectedRole.value as RoleEnum,
		props.members.length === 1 ? memberToChangeRole.value[0].userId : undefined
	);
	selectedIds.value = [];
	emit("close");
};

const onChangeOwner = async () => {
	await changeRoomOwner(memberToChangeRole.value[0].userId);
	resetComponentState();
	emit("close");
};

const onClose = () => {
	resetComponentState();
	emit("close");
};

const resetComponentState = () => {
	selectedIds.value = [];
	isOwnershipHandoverMode.value = false;
	selectedRole.value = null;
};

const radioOptions = computed(() => {
	const roomOwnerOption = {
		role: RoleName.ROOMOWNER,
		labelHeader: t("pages.rooms.members.roomPermissions.owner"),
		labelDescriptions: [
			"pages.rooms.members.roleChange.Roomowner.label",
			"pages.rooms.members.roleChange.Roomowner.label.subText",
		],
		dataTestid: "change-role-option-owner",
	};

	const baseRoles = [
		{
			role: RoleName.ROOMVIEWER,
			labelHeader: t("pages.rooms.members.roomPermissions.viewer"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomviewer.label"],
			dataTestid: "change-role-option-viewer",
		},
		{
			role: RoleName.ROOMEDITOR,
			labelHeader: t("pages.rooms.members.roomPermissions.editor"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomeditor.label"],
			dataTestid: "change-role-option-editor",
		},
		{
			role: RoleName.ROOMADMIN,
			labelHeader: t("pages.rooms.members.roomPermissions.admin"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomadmin.label"],
			dataTestid: "change-role-option-admin",
		},
	];

	if (props.isAdminMode) {
		return [roomOwnerOption];
	}

	const isExternalPersonMember = memberToChangeRole?.value.some((member) =>
		member.schoolRoleNames.includes(RoleName.EXTERNAL_PERSON)
	);
	if (isExternalPersonMember) {
		return baseRoles.filter((r) => r.role === RoleName.ROOMVIEWER || r.role === RoleName.ROOMEDITOR);
	}

	if (isChangeOwnershipOptionVisible.value) {
		return [...baseRoles, roomOwnerOption];
	}

	return baseRoles;
});

const changeRoleContent = ref();
const radioGroup = ref();
</script>

<style lang="scss" scoped>
.dialog-title {
	max-width: 460px;
	white-space: normal;
}
.radio-label {
	font-size: 14px;
	line-height: var(--line-height-lg);
	opacity: var(--v-medium-emphasis-opacity);
}
.alert-text {
	line-height: var(--line-height-lg);
	letter-spacing: normal;
}
</style>
