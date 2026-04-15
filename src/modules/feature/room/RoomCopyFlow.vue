<template>
	<SvsDialog
		v-model="isOpen"
		title="feature-room.CopyInfoDialog.title"
		confirm-btn-lang-key="common.actions.duplicate"
		data-testid="copy-info-dialog"
		@confirm="onConfirmCopy"
		@cancel="onCancelCopy"
	>
		<template #content>
			<p>
				{{ t("feature-room.CopyInfoDialog.text.nextStep") }}
			</p>
			<InfoAlert class="mb-4" data-testid="copy-info-copyright-data-protection">
				{{ t("components.molecules.share.checkPrivacyAndCopyright") }}
			</InfoAlert>
			<WarningAlert>
				<p class="mb-1">
					{{ t("feature-room.CopyInfoDialog.text.alert.followingContent") }}
				</p>
				<ul class="ml-6">
					<li data-testid="copy-modal-room-member-permission">
						{{ t("feature-room.CopyInfoDialog.text.alert.membersPermissions") }}
					</li>
					<li data-testid="copy-modal-content-etherpad">
						{{ t("feature-room.CopyInfoDialog.text.alert.Etherpad") }}
					</li>
					<li data-testid="copy-modal-content-whiteboard">
						{{ t("feature-room.CopyInfoDialog.text.alert.whiteboard") }}
					</li>
					<li data-testid="copy-modal-protected-external-tool">
						{{ t("feature-room.CopyInfoDialog.text.alert.protectedSettings") }}
					</li>
				</ul>
			</WarningAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { RoomDetails } from "@/types/room/Room";
import { CopyApiResponseStatus } from "@api-server";
import { notifyError, notifySuccess, useLoadingStore } from "@data-app";
import { useRoomStore } from "@data-room";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { nextTick, onMounted, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	room: {
		type: Object as PropType<RoomDetails>,
		required: true,
	},
});

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "copy:cancel"): void;
	(e: "copy:success", id: string): void;
	(e: "copy:error", id?: string): void;
	(e: "copy:ended"): void;
}>();

const { copyRoom } = useRoomStore();
const { t } = useI18n();
const isRoomCopyInfoDialogOpen = ref(false);
const { setLoadingState } = useLoadingStore();

onMounted(() => {
	isRoomCopyInfoDialogOpen.value = true;
	setLoadingState(false);
});

const onCancelCopy = () => {
	isRoomCopyInfoDialogOpen.value = false;
	emit("copy:cancel");
	emit("copy:ended");
};

const onConfirmCopy = async () => {
	isRoomCopyInfoDialogOpen.value = false;
	setLoadingState(true, t("data-room.copy.loading"));

	const { result } = await copyRoom(props.room?.id);

	if (result) {
		const copyResult = result.data;
		if (copyResult.status === CopyApiResponseStatus.FAILURE || copyResult.id === undefined) {
			notifyError(t("data-room.copy.alert.error"), false);
			emit("copy:error", copyResult.id);
		} else {
			notifySuccess(t("data-room.copy.alert.success"));
			emit("copy:success", copyResult.id);
		}
	}

	setLoadingState(false);
	await nextTick();
	emit("copy:ended");
};
</script>
