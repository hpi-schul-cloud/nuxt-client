<template>
	<Dialog v-model="isOpen" data-testid="dialog-leave-room-owner" title="pages.rooms.leaveRoom.menu">
		<template #content>
			<WarningAlert class="warning-text">
				{{ t("pages.rooms.leaveRoom.RoomOwner.warning") }}
			</WarningAlert>
		</template>
		<template #actions>
			<DialogBtnClose @click="$emit('update:modelValue', false)" />
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { WarningAlert } from "@ui-alert";
import { Dialog, DialogBtnClose } from "@ui-dialog";
import { useI18n } from "vue-i18n";

defineEmits(["update:modelValue"]);

const { t } = useI18n();

const isOpen = defineModel({
	type: Boolean,
	required: true,
});
</script>

<style lang="scss" scoped>
.warning-text {
	font-size: 16px;
}
</style>
