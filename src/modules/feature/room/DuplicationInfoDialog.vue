<template>
	<v-dialog v-model="isOpen" max-width="520">
		<v-card
			:title="$t('feature-room.DuplicationInfoDialog.title')"
			data-testid="duplication-info-dialog"
		>
			<v-card-text>
				<p>
					{{ $t("feature-room.DuplicationInfoDialog.text.nextStep") }}
				</p>
				<InfoAlert>
					<p>
						{{
							$t(
								"feature-room.DuplicationInfoDialog.text.alert.followingContent"
							)
						}}
					</p>
					<ul class="mt-1 pl-4">
						<li>
							{{
								$t(
									"feature-room.DuplicationInfoDialog.text.alert.membersPermissions"
								)
							}}
						</li>
						<li>
							{{ $t("feature-room.DuplicationInfoDialog.text.alert.Etherpad") }}
						</li>
						<li>
							{{
								$t("feature-room.DuplicationInfoDialog.text.alert.whiteboard")
							}}
						</li>
						<li>
							{{
								$t(
									"feature-room.DuplicationInfoDialog.text.alert.protectedSettings"
								)
							}}
						</li>
					</ul>
				</InfoAlert>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					variant="text"
					data-testid="duplication-info-dialog-cancel"
					@click="$emit('duplication:cancel')"
				>
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn
					color="primary"
					data-testid="duplication-info-dialog-confirm"
					@click="$emit('duplication:confirm')"
				>
					{{ $t("common.actions.duplicate") }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { InfoAlert } from "@ui-alert";

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

defineEmits(["duplication:cancel", "duplication:confirm"]);
</script>
