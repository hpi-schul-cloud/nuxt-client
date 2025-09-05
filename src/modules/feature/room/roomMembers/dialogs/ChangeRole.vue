<template>
	<v-card ref="changeRoleContent">
		<template #title>
			<h2 ref="textTitle" class="mt-2 dialog-title">
				{{ dialogTitle }}
			</h2>
		</template>

		<template #text>
			<div v-if="!isOwnershipHandoverMode" class="mb-4">
				{{ infoText }}
			</div>
			<div>
				<v-radio-group
					v-if="!isOwnershipHandoverMode"
					v-model="selectedRole"
					hide-details
					class="ml-n2"
				>
					<v-radio
						v-for="option in radioOptions"
						:key="option.role"
						:value="option.role"
						class="align-start mb-2"
						:data-testid="option.dataTestid"
					>
						<template #label>
							<div class="d-flex flex-column mt-2">
								{{ option.labelHeader }}
								<span
									v-for="labelDescription in option.labelDescriptions"
									:key="labelDescription"
									class="radio-label"
								>
									{{ t(labelDescription) }}
								</span>
							</div>
						</template>
					</v-radio>
				</v-radio-group>

				<WarningAlert
					v-if="selectedRole === RoleName.Roomowner"
					:class="isOwnershipHandoverMode ? 'ml-0' : 'ml-8'"
				>
					<span class="alert-text">
						<template v-if="!isOwnershipHandoverMode">
							<i18n-t
								keypath="pages.rooms.members.handOverAlert.label"
								scope="global"
							>
								<template #memberFullName>{{ memberFullName }}</template>
							</i18n-t>
							<p class="mb-0">
								{{
									t("pages.rooms.members.handOverAlert.label.subText", {
										currentUserFullName,
									})
								}}
							</p>
						</template>
						<template v-else>
							<i18n-t
								keypath="pages.rooms.members.handOverAlert.confirm.label"
								scope="global"
							>
								<template #currentUserFullName>
									{{ currentUserFullName }}
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
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					class="ms-auto mr-2"
					:text="t('common.actions.cancel')"
					data-testid="change-role-cancel-btn"
					@click="onCancel"
				/>
				<v-btn
					v-if="!isOwnershipHandoverMode"
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('common.actions.confirm')"
					data-testid="change-role-confirm-btn"
					@click="onConfirm"
				/>
				<v-btn
					v-else
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('pages.rooms.members.roleChange.handOverBtn.text')"
					data-testid="change-owner-confirm-btn"
					@click="onChangeOwner"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import {
	ChangeRoomRoleBodyParamsRoleNameEnum as RoleEnum,
	RoleName,
} from "@/serverApi/v3";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import {
	RoomMember,
	useRoomDetailsStore,
	useRoomMembersStore,
} from "@data-room";
import { WarningAlert } from "@ui-alert";
import { storeToRefs } from "pinia";
import { authModule } from "@/store";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMember[]>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();
const { room } = storeToRefs(useRoomDetailsStore());

const roomMembersStore = useRoomMembersStore();
const { selectedIds } = storeToRefs(roomMembersStore);
const { updateMembersRole, changeRoomOwner } = roomMembersStore;

const selectedRole = ref<string | null>(null);
const memberToChangeRole = toRef(props, "members")?.value;

const isChangeOwnershipOptionVisible = computed(() => {
	const currentUserId = authModule.getUser?.id;
	return (
		currentUserId &&
		roomMembersStore.isRoomOwner(currentUserId) &&
		memberToChangeRole.length === 1 &&
		isMemberStudent.value === false
	);
});
const isOwnershipHandoverMode = ref(false);
const dialogTitle = computed(() =>
	isOwnershipHandoverMode.value
		? t("pages.rooms.members.roleChange.dialogTitle.handOver")
		: t("pages.rooms.members.changePermission")
);

if (memberToChangeRole.length > 1) {
	const roleNamesInProp = memberToChangeRole.map(
		(member) => member.roomRoleName
	);

	if (roleNamesInProp.every((roleName) => roleNamesInProp[0] === roleName)) {
		selectedRole.value = roleNamesInProp[0];
	}
} else {
	selectedRole.value = memberToChangeRole[0]?.roomRoleName;
}

const currentUserFullName = computed(() => {
	return roomMembersStore.getMemberFullName(authModule.getUser?.id);
});

const memberFullName = computed(() => {
	return `${memberToChangeRole[0]?.firstName} ${memberToChangeRole[0]?.lastName}`;
});

const memberSchoolRoles = computed(() => {
	return memberToChangeRole[0]?.schoolRoleNames;
});

const isMemberStudent = computed(() => {
	return memberSchoolRoles.value.includes(RoleName.Student);
});

const infoText = computed(() => {
	const roomName = room.value?.name ?? "";
	if (memberToChangeRole.length === 1) {
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
	if (selectedRole.value === RoleName.Roomowner) {
		isOwnershipHandoverMode.value = true;
		return;
	}
	await updateMembersRole(
		selectedRole.value as RoleEnum,
		props.members.length === 1 ? memberToChangeRole[0].userId : undefined
	);
	selectedIds.value = [];
	emit("close");
};

const onChangeOwner = async () => {
	await changeRoomOwner(memberToChangeRole[0].userId);
	selectedIds.value = [];
	emit("close");
};

const onCancel = () => {
	emit("close");
};

const radioOptions = computed(() => {
	const baseRoles = [
		{
			role: RoleName.Roomviewer,
			labelHeader: t("pages.rooms.members.roomPermissions.viewer"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomviewer.label"],
			dataTestid: "change-role-option-viewer",
		},
		{
			role: RoleName.Roomeditor,
			labelHeader: t("pages.rooms.members.roomPermissions.editor"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomeditor.label"],
			dataTestid: "change-role-option-editor",
		},
		{
			role: RoleName.Roomadmin,
			labelHeader: t("pages.rooms.members.roomPermissions.admin"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomadmin.label"],
			dataTestid: "change-role-option-admin",
		},
	];

	if (isChangeOwnershipOptionVisible.value) {
		baseRoles.push({
			role: RoleName.Roomowner,
			labelHeader: t("pages.rooms.members.roomPermissions.owner"),
			labelDescriptions: [
				"pages.rooms.members.roleChange.Roomowner.label",
				"pages.rooms.members.roleChange.Roomowner.label.subText",
			],
			dataTestid: "change-role-option-owner",
		});
	}

	return baseRoles;
});

const changeRoleContent = ref();
useFocusTrap(changeRoleContent, {
	immediate: true,
});
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
