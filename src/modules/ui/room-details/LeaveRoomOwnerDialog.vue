<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-leave-room-owner"
		max-width="480"
	>
		<UseFocusTrap>
			<VCard>
				<template #title>
					<h2 class="text-h4 mt-2">
						{{ t("pages.rooms.leaveRoom.menu") }}
					</h2>
				</template>
				<template #text>
					<WarningAlert>
						{{ t("pages.rooms.leaveRoom.RoomOwner.warning") }}
					</WarningAlert>
				</template>
				<template #actions>
					<VSpacer />
					<div class="mr-4 mb-3">
						<VBtn
							data-testid="dialog-confirm"
							class="px-6"
							variant="outlined"
							:text="t('common.labels.close')"
							@click="$emit('update:modelValue', false)"
						/>
					</div>
				</template>
			</VCard>
		</UseFocusTrap>
	</VDialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { WarningAlert } from "@ui-alert";

const { xs } = useDisplay();
const { t } = useI18n();

const isOpen = defineModel({
	type: Boolean,
	required: true,
});
</script>
