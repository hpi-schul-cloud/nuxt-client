<template>
	<VExpansionPanels class="mb-6">
		<VExpansionPanel data-testid="third-party-logins-panel">
			<VExpansionPanelTitle>
				<h2 class="ma-0">{{ t("pages.account.thirdParty.headline") }}</h2>
				<template #actions="{ expanded }">
					<VIcon :icon="expanded ? mdiMinus : mdiPlus" />
				</template>
			</VExpansionPanelTitle>
			<VExpansionPanelText eager>
				<ErrorAlert v-if="hasLoadError" data-testid="third-party-logins-error">
					{{ t("pages.account.thirdParty.loadError") }}
				</ErrorAlert>

				<p v-else-if="sessions.length === 0" class="text-medium-emphasis mb-0" data-testid="third-party-logins-empty">
					{{ t("pages.account.thirdParty.empty") }}
				</p>

				<VList v-else class="py-0">
					<VListItem
						v-for="session in sessions"
						:key="session.client_id"
						:title="session.client_name"
						class="px-0"
						data-testid="third-party-login"
					>
						<template #append>
							<VBtn
								:icon="mdiTrashCanOutline"
								:aria-label="t('pages.account.thirdParty.revokeLabel', { clientName: session.client_name })"
								:loading="revokingId === session.client_id"
								variant="text"
								data-testid="revoke-third-party-login"
								@click="confirmRevoke(session)"
							/>
						</template>
					</VListItem>
				</VList>
			</VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>
</template>

<script setup lang="ts">
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { ConsentSessionResponse } from "@data-account";
import { mdiMinus, mdiPlus, mdiTrashCanOutline } from "@icons/material";
import { ErrorAlert } from "@ui-alert";
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
	hasLoadError: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: "revoke", clientId: string): void;
}>();

const { t } = useI18n();

const confirmRevoke = async (session: ConsentSessionResponse) => {
	const isConfirmed = await askConfirmation({
		title: t("pages.account.thirdParty.dialogText", { clientName: session.client_name }),
		confirmBtnKey: "pages.account.thirdParty.revoke",
	});
	if (isConfirmed) {
		emit("revoke", session.client_id);
	}
};
</script>
