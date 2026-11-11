<template>
	<VExpansionPanels variant="accordion" class="mb-6">
		<VExpansionPanel>
			<VExpansionPanelTitle>
				<div class="d-flex align-center">
					<VIcon :icon="mdiShieldAccountVariantOutline" size="small" class="me-2 text-primary" />
					<span class="font-weight-bold">{{ t("pages.account.thirdParty.headline") }}</span>
				</div>
			</VExpansionPanelTitle>
			<VExpansionPanelText eager>
				<p class="text-body-2 text-medium-emphasis mb-4">
					{{ t("pages.account.thirdParty.description") }}
				</p>

				<div v-if="sessions.length === 0" class="text-body-2 text-disabled py-2">
					{{ t("pages.account.thirdParty.empty") }}
				</div>

				<VList v-else lines="two">
					<VListItem
						v-for="session in sessions"
						:key="session.client_id"
						:title="session.client_name"
						:subtitle="session.client_id"
						class="px-0"
					>
						<template #append>
							<VBtn
								variant="outlined"
								color="error"
								size="small"
								:loading="revokingId === session.client_id"
								@click="openRevokeDialog(session.client_id, session.client_name)"
							>
								{{ t("pages.account.thirdParty.revoke") }}
							</VBtn>
						</template>
					</VListItem>
				</VList>
			</VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>

	<!-- Confirmation Dialog -->
	<VDialog v-model="dialogOpen" max-width="500">
		<VCard>
			<VCardTitle class="text-h6 font-weight-bold">
				{{ t("pages.account.thirdParty.dialogTitle") }}
			</VCardTitle>
			<VCardText>
				{{ t("pages.account.thirdParty.dialogText", { clientName: targetClientName }) }}
			</VCardText>
			<VCardActions class="justify-end">
				<VBtn variant="text" @click="dialogOpen = false">
					{{ t("common.actions.cancel") }}
				</VBtn>
				<VBtn color="error" variant="flat" @click="confirmRevoke">
					{{ t("pages.account.thirdParty.revoke") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { ConsentSessionResponse } from "@data-account";
import { mdiShieldAccountVariantOutline } from "@icons/material";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
	sessions: {
		type: Array as () => ConsentSessionResponse[],
		default: () => [],
	},
	revokingId: {
		type: String,
		default: "",
	},
});

const emit = defineEmits<{
	(e: "revoke", clientId: string): void;
}>();

const { t } = useI18n();
const dialogOpen = ref(false);
const targetClientId = ref("");
const targetClientName = ref("");

const openRevokeDialog = (clientId: string, clientName: string) => {
	targetClientId.value = clientId;
	targetClientName.value = clientName;
	dialogOpen.value = true;
};

const confirmRevoke = () => {
	dialogOpen.value = false;
	emit("revoke", targetClientId.value);
};
</script>
