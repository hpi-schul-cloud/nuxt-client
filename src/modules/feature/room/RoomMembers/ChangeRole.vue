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
					<v-radio-group v-model="selection" class="ml-n2">
						<v-radio
							id="roleChangeViewer"
							:label="t('pages.rooms.members.roomPermissions.viewer')"
							:value="RoleName.Roomviewer"
							color="primary"
						/>
						<label for="roleChangeViewer" class="ml-10 mt-n2 mb-2 text-sm">
							{{ t("pages.rooms.members.roleChange.Roomviewer.subText") }}
						</label>

						<v-radio
							id="roleChangeEditor"
							:label="t('pages.rooms.members.roomPermissions.editor')"
							:value="RoleName.Roomeditor"
							color="primary"
						/>
						<label for="roleChangeEditor" class="ml-10 mt-n2 mb-2 text-sm">
							{{ t("pages.rooms.members.roleChange.Roomeditor.subText") }}
						</label>

						<v-radio
							id="roleChangeAdmin"
							:label="t('pages.rooms.members.roomPermissions.admin')"
							:value="RoleName.Roomadmin"
							color="primary"
						/>
						<label for="roleChangeAdmin" class="ml-10 mt-n2 mb-2 text-sm">
							{{ t("pages.rooms.members.roleChange.Roomadmin.subText") }}
						</label>

						<v-radio
							v-if="isVisibleOwnerOption"
							id="roleChangeOwner"
							:label="t('pages.rooms.members.roomPermissions.owner')"
							:value="RoleName.Roomowner"
							color="primary"
						/>
						<label
							v-if="isVisibleOwnerOption"
							for="roleChangeOwner"
							class="ml-10 mt-n2 mb-2 text-sm"
						>
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
import { ChangeRoomRoleBodyParamsRoleNameEnum, RoleName } from "@/serverApi/v3";
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
	currentUser: {
		type: Object as PropType<RoomMember>,
		required: true,
	},
});
const { t } = useI18n();
const selection = ref<string | null>(null);
const memberToChangeRole = toRef(props, "members")?.value;
const currentUser = computed(() => props.currentUser);

const isVisibleOwnerOption = ref(false);

if (memberToChangeRole.length > 1) {
	const roleNamesInProp = memberToChangeRole.map(
		(member) => member.roomRoleName
	);

	if (roleNamesInProp.every((roleName) => roleNamesInProp[0] === roleName)) {
		selection.value = roleNamesInProp[0];
	}
} else {
	selection.value = memberToChangeRole[0]?.roomRoleName;
	if (currentUser.value.roomRoleName === RoleName.Roomowner) {
		isVisibleOwnerOption.value = true;
	}
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
	(e: "confirm", selection: ChangeRoomRoleBodyParamsRoleNameEnum): void;
	(e: "cancel"): void;
}>();

const onConfirm = () => {
	if (selection.value) {
		emit("confirm", selection.value as ChangeRoomRoleBodyParamsRoleNameEnum);
	}
};
const onCancel = () => emit("cancel");

const changeRoleContent = ref();
useFocusTrap(changeRoleContent, {
	immediate: true,
});
</script>
