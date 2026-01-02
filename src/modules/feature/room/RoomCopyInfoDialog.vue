<template>
	<Dialog
		v-model="isOpen"
		:title="t('feature-room.CopyInfoDialog.title')"
		:confirm-btn-lang-key="'common.actions.duplicate'"
		identifier="copy-info"
		data-testid="copy-info-dialog"
		@cancel="emit('copy:cancel')"
		@confirm="emit('copy:confirm')"
	>
		<template #content>
			<p>
				{{ $t("feature-room.CopyInfoDialog.text.nextStep") }}
			</p>
			<InfoAlert class="mb-4" data-testid="copy-info-copyright-data-protection">
				{{ $t("components.molecules.share.checkPrivacyAndCopyright") }}
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
	</Dialog>
</template>

<script setup lang="ts">
import { InfoAlert, WarningAlert } from "@ui-alert";
import { Dialog } from "@ui-dialog";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["copy:cancel", "copy:confirm"]);
const { t } = useI18n();

const isOpen = ref(true);
</script>
