<template>
	<v-dialog v-model="isOpen" max-width="520" @after-leave="$emit('copy:close')">
		<v-card data-testid="copy-info-dialog">
			<UseFocusTrap>
				<v-card-title
					class="text-h4 text-break px-6 pt-4"
					data-testid="copy-info-dialog-title"
				>
					{{ t("feature-room.CopyInfoDialog.title") }}
				</v-card-title>
				<v-card-text class="pt-2">
					<p>
						{{ t("feature-room.CopyInfoDialog.text.nextStep") }}
					</p>
					<InfoAlert>
						<p class="mb-1">
							{{ t("feature-room.CopyInfoDialog.text.alert.followingContent") }}
						</p>
						<ul class="ml-6">
							<li v-for="bulletPoint in infoListItems" :key="bulletPoint">
								{{ bulletPoint }}
							</li>
						</ul>
					</InfoAlert>
				</v-card-text>
				<v-card-actions class="px-6 pb-4">
					<v-spacer />
					<v-btn
						variant="text"
						data-testid="copy-info-dialog-cancel"
						@click="$emit('copy:cancel')"
					>
						{{ t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						variant="flat"
						color="primary"
						data-testid="copy-info-dialog-confirm"
						@click="$emit('copy:confirm')"
					>
						{{ t("common.actions.duplicate") }}
					</v-btn>
				</v-card-actions>
			</UseFocusTrap>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { InfoAlert } from "@ui-alert";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isOpen = ref(true);

const infoListItems = [
	"feature-room.CopyInfoDialog.text.alert.membersPermissions",
	"feature-room.CopyInfoDialog.text.alert.Etherpad",
	"feature-room.CopyInfoDialog.text.alert.whiteboard",
	"feature-room.CopyInfoDialog.text.alert.protectedSettings",
].map(t);

defineEmits(["copy:cancel", "copy:confirm", "copy:close"]);
</script>
