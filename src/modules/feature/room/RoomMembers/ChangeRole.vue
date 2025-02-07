<template>
	<v-card ref="changeRoleContent">
		<template v-slot:prepend>
			<div ref="textTitle" class="text-h4 mt-2">
				{{ t("pages.rooms.members.changePermission") }}
			</div>
		</template>

		<template v-slot:default>
			<div class="ml-6 mr-6 mt-2">
				<div>
					<div class="mb-4">
						{{ infoText }}
					</div>
					<v-radio-group v-model="selectedRole" class="ml-n2">
						<v-radio
							id="roleChangeViewer"
							:label="t('pages.rooms.members.roomPermissions.viewer')"
							:value="RoleName.Roomviewer"
							color="primary"
						/>
						<label for="roleChangeViewer" class="ml-10 mt-n2 mb-2 radio-label">
							{{ t("pages.rooms.members.roleChange.Roomviewer.subText") }}
						</label>

						<v-radio
							id="roleChangeEditor"
							:label="t('pages.rooms.members.roomPermissions.editor')"
							:value="RoleName.Roomeditor"
							color="primary"
						/>
						<label for="roleChangeEditor" class="ml-10 mt-n2 mb-2 radio-label">
							{{ t("pages.rooms.members.roleChange.Roomeditor.subText") }}
						</label>

						<v-radio
							id="roleChangeAdmin"
							:label="t('pages.rooms.members.roomPermissions.admin')"
							:value="RoleName.Roomadmin"
							color="primary"
						/>
						<label for="roleChangeAdmin" class="ml-10 mt-n2 mb-2 radio-label">
							{{ t("pages.rooms.members.roleChange.Roomadmin.subText") }}
						</label>
					</v-radio-group>
				</div>
			</div>
		</template>

		<template v-slot:actions>
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					ref="cancelButton"
					class="ms-auto mr-2"
					color="primary"
					:text="t('common.actions.cancel')"
					data-testid="change-role-cancel-btn"
					@click="onCancel"
				/>
				<v-btn
					ref="addButton"
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('common.actions.confirm')"
					data-testid="change-role-confirm-btn"
					@click="onConfirm"
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
});
const { t } = useI18n();
const selectedRole = ref<string | null>(null);
const memberToChangeRole = toRef(props, "members")?.value;

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

const infoText = computed(() => {
	if (memberToChangeRole.length === 1) {
		const memberName = `${memberToChangeRole[0]?.firstName} ${memberToChangeRole[0]?.lastName}`;
		return t("pages.rooms.members.roleChange.subTitle", {
			memberName,
			roomName: props.roomName,
		});
	}
	return t("pages.rooms.members.roleChange.multipleUser.subTitle", {
		roomName: props.roomName,
	});
});

const emit = defineEmits<{
	(e: "confirm", selectedRole: RoleEnum, id?: string): void;
	(e: "cancel"): void;
}>();

const onConfirm = () => {
	if (!selectedRole.value) return;
	emit(
		"confirm",
		selectedRole.value as RoleEnum,
		props.members.length === 1 ? memberToChangeRole[0].userId : undefined
	);
};

const onCancel = () => {
	emit("cancel");
};

const changeRoleContent = ref();
useFocusTrap(changeRoleContent, {
	immediate: true,
});
</script>

<style lang="scss" scoped>
.radio-label {
	font-size: 14px;
	line-height: var(--line-height-lg);
	opacity: var(--v-medium-emphasis-opacity);
}
</style>
