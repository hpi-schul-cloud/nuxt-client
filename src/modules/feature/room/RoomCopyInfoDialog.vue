<template>
	<v-dialog v-model="isOpen" max-width="520">
		<v-card data-testid="copy-info-dialog">
			<v-card-title class="text-h2 text-break px-6 pt-4" data-testid="copy-info-dialog-title">
				{{ $t("feature-room.CopyInfoDialog.title") }}
			</v-card-title>

			<v-card-text class="pt-2">
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
			</v-card-text>
			<v-card-actions class="px-6 pb-4">
				<v-spacer />
				<v-btn variant="text" data-testid="copy-info-dialog-cancel" @click="$emit('copy:cancel')">
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn variant="flat" color="primary" data-testid="copy-info-dialog-confirm" @click="$emit('copy:confirm')">
					{{ $t("common.actions.duplicate") }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { InfoAlert, WarningAlert } from "@ui-alert";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isOpen = ref(true);

defineEmits(["copy:cancel", "copy:confirm"]);
</script>
