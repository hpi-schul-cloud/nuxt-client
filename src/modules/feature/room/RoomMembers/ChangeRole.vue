<template>
	<v-card ref="changeRoleContent">
		<template v-slot:prepend>
			<span ref="textTitle" class="text-h4 mt-2 dialog-title">
				{{ dialogTitle }}
			</span>
		</template>

		<template v-slot:default>
			<div class="ml-6 mr-6 mt-2">
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
							color="primary"
							class="align-start mb-2"
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
										t(
											"pages.rooms.members.handOverAlert.confirm.label.subText",
											{ memberFullName }
										)
									}}
								</p>
							</template>
						</span>
					</WarningAlert>
				</div>
			</div>
		</template>

		<template v-slot:actions>
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					class="ms-auto mr-2"
					color="primary"
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
import { VCard, VRadio } from "vuetify/lib/components/index.mjs";
import { RoomMember } from "@data-room";
import { WarningAlert } from "@ui-alert";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMember[]>,
		required: true,
		default: () => [],
	},
	roomName: {
		type: String,
		required: true,
	},
	currentUser: {
		type: Object as PropType<RoomMember>,
		required: true,
	},
});
const { t } = useI18n();
const selectedRole = ref<string | null>(null);
const memberToChangeRole = toRef(props, "members")?.value;
const isChangeOwnershipOptionVisible = computed(() => {
	return (
		props.currentUser?.roomRoleName === RoleName.Roomowner &&
		memberToChangeRole.length === 1
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
	return `${props.currentUser?.firstName} ${props.currentUser?.lastName}`;
});

const memberFullName = computed(() => {
	return `${memberToChangeRole[0]?.firstName} ${memberToChangeRole[0]?.lastName}`;
});

const infoText = computed(() => {
	if (memberToChangeRole.length === 1) {
		return t("pages.rooms.members.roleChange.subTitle", {
			memberFullName: memberFullName.value,
			roomName: props.roomName,
		});
	}
	return t("pages.rooms.members.roleChange.multipleUser.subTitle", {
		roomName: props.roomName,
	});
});

const emit = defineEmits<{
	(e: "confirm", selectedRole: RoleEnum, id?: string): void;
	(e: "change-room-owner", id: string): void;
	(e: "cancel"): void;
}>();

const onConfirm = () => {
	if (!selectedRole.value) return;
	if (selectedRole.value === RoleName.Roomowner) {
		isOwnershipHandoverMode.value = true;
		return;
	}
	emit(
		"confirm",
		selectedRole.value as RoleEnum,
		props.members.length === 1 ? memberToChangeRole[0].userId : undefined
	);
};

const onChangeOwner = () => {
	emit("change-room-owner", memberToChangeRole[0].userId);
};

const onCancel = () => {
	emit("cancel");
};

const radioOptions = computed(() => {
	const baseRoles = [
		{
			role: RoleName.Roomviewer,
			labelHeader: t("pages.rooms.members.roomPermissions.viewer"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomviewer.label"],
		},
		{
			role: RoleName.Roomeditor,
			labelHeader: t("pages.rooms.members.roomPermissions.editor"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomeditor.label"],
		},
		{
			role: RoleName.Roomadmin,
			labelHeader: t("pages.rooms.members.roomPermissions.admin"),
			labelDescriptions: ["pages.rooms.members.roleChange.Roomadmin.label"],
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
}
</style>
