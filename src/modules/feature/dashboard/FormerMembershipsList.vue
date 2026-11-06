<template>
	<div class="former-memberships-list" data-testid="former-memberships-list">
		<div
			v-for="item in items"
			:key="`${item.type}-${item.refId}`"
			class="former-membership-item d-flex align-center justify-space-between flex-wrap pa-3 mb-2 rounded bg-surface"
			data-testid="former-membership-item"
		>
			<div class="d-flex align-center ga-3 mr-4 my-1">
				<VIcon
					:icon="item.type === 'course' ? mdiSchoolOutline : mdiAccountGroupOutline"
					size="28"
					color="primary"
					data-testid="former-membership-icon"
				/>
				<div>
					<div class="d-flex align-center ga-2">
						<span class="font-weight-bold text-subtitle-1" data-testid="former-membership-name">
							{{ item.name }}
						</span>
						<VChip size="x-small" variant="tonal" color="primary">
							{{ t(`formerMemberships.types.${item.type}`) }}
						</VChip>
					</div>
					<div class="text-caption text-medium-emphasis" data-testid="former-membership-school">
						{{ item.schoolName || item.schoolId }}
					</div>
				</div>
			</div>

			<div class="d-flex align-center ga-2 my-1">
				<VBtn
					size="small"
					color="primary"
					variant="elevated"
					:prepend-icon="mdiCheck"
					:loading="transferringIds.has(item.refId) || isProcessing"
					:disabled="transferringIds.has(item.refId) || isProcessing"
					data-testid="former-membership-transfer-btn"
					@click="transferMembership(item.type, item.refId, item.name)"
				>
					{{ t("formerMemberships.actions.transfer") }}
				</VBtn>

				<VBtn
					size="small"
					color="error"
					variant="text"
					:prepend-icon="mdiDeleteOutline"
					:loading="transferringIds.has(item.refId) || isProcessing"
					:disabled="transferringIds.has(item.refId) || isProcessing"
					data-testid="former-membership-discard-btn"
					@click="discardMembership(item.type, item.refId, item.name)"
				>
					{{ t("formerMemberships.actions.discard") }}
				</VBtn>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFormerMembershipStore, useFormerMembershipStoreRefs } from "@data-app";
import { mdiAccountGroupOutline, mdiCheck, mdiDeleteOutline, mdiSchoolOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { transferMembership, discardMembership } = useFormerMembershipStore();
const { items, transferringIds, isProcessing } = useFormerMembershipStoreRefs();
</script>

<style scoped lang="scss">
.former-membership-item {
	border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
