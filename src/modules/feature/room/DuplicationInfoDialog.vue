<template>
	<v-dialog v-model="isOpen" max-width="520">
		<v-card data-testid="duplication-info-dialog">
			<v-card-title
				class="text-h4 text-break px-6 pt-4"
				data-testid="duplication-info-dialog-title"
			>
				{{ $t("feature-room.DuplicationInfoDialog.title") }}
			</v-card-title>
			<v-card-text class="pt-2">
				<p>
					{{ $t("feature-room.DuplicationInfoDialog.text.nextStep") }}
				</p>
				<InfoAlert>
					<p class="mb-1">
						{{
							$t(
								"feature-room.DuplicationInfoDialog.text.alert.followingContent"
							)
						}}
					</p>
					<ul class="ml-6">
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
			<v-card-actions class="px-6 pb-4">
				<v-spacer />
				<v-btn
					variant="text"
					data-testid="duplication-info-dialog-cancel"
					@click="$emit('duplication:cancel')"
				>
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn
					variant="flat"
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
