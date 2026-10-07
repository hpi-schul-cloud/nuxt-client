<template>
	<VCard
		v-if="hasFormerMemberships && !isDismissed"
		variant="tonal"
		color="primary"
		class="former-memberships-banner mb-6 pa-4 rounded-lg"
		data-testid="former-memberships-banner"
	>
		<div class="d-flex align-start justify-space-between flex-wrap ga-3">
			<div class="d-flex align-start ga-3 flex-grow-1">
				<VIcon :icon="mdiSchoolOutline" size="32" class="mt-1" color="primary" />
				<div>
					<h3 class="text-h6 font-weight-bold mb-1" data-testid="former-memberships-banner-title">
						{{ t("formerMemberships.banner.title") }}
					</h3>
					<p class="text-body-2 mb-0" data-testid="former-memberships-banner-description">
						{{ t("formerMemberships.banner.description", { courseCount, roomCount }) }}
					</p>
				</div>
			</div>

			<div class="d-flex align-center ga-2">
				<VBtn
					color="primary"
					variant="elevated"
					:prepend-icon="mdiCheck"
					:loading="isProcessing"
					:disabled="isProcessing"
					data-testid="transfer-all-btn"
					@click="transferAllMemberships"
				>
					{{ t("formerMemberships.actions.transferAll") }}
				</VBtn>

				<VBtn
					variant="outlined"
					color="primary"
					:append-icon="showDetails ? mdiChevronUp : mdiChevronDown"
					data-testid="toggle-details-btn"
					@click="showDetails = !showDetails"
				>
					{{ showDetails ? t("formerMemberships.banner.hideDetails") : t("formerMemberships.banner.showDetails") }}
				</VBtn>

				<VBtn
					variant="text"
					:icon="mdiClose"
					size="small"
					data-testid="dismiss-banner-btn"
					:aria-label="t('common.actions.close')"
					@click="dismissBanner"
				/>
			</div>
		</div>

		<VExpandTransition>
			<div v-if="showDetails" class="mt-4 pt-4 border-t">
				<FormerMembershipsList />
			</div>
		</VExpandTransition>
	</VCard>
</template>

<script setup lang="ts">
import FormerMembershipsList from "./FormerMembershipsList.vue";
import { useFormerMembershipStore, useFormerMembershipStoreRefs } from "@data-app";
import { mdiCheck, mdiChevronDown, mdiChevronUp, mdiClose, mdiSchoolOutline } from "@icons/material";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { fetchFormerMemberships, transferAllMemberships, dismissBanner } = useFormerMembershipStore();
const { hasFormerMemberships, isDismissed, isProcessing, courseCount, roomCount } = useFormerMembershipStoreRefs();

const showDetails = ref(false);

onMounted(async () => {
	await fetchFormerMemberships();
});
</script>

<style scoped lang="scss">
.former-memberships-banner {
	border: 1px solid rgba(var(--v-theme-primary), 0.3) !important;
}
.border-t {
	border-top: 1px solid rgba(var(--v-theme-primary), 0.2);
}
</style>
