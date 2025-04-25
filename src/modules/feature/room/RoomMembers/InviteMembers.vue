<template>
	<v-card ref="inviteMembersContent">
		<template #title>
			<h2 class="text-h4 mt-2">
				{{ t("pages.rooms.members.inviteMember.title") }}
			</h2>
		</template>

		<template #text>
			<p>
				Im nächsten Schritt wird ein Link erstellt, mit dem der Raum betreten
				werden kann.
			</p>
			<InfoAlert
				>Lernende anderer Schulen müssen immer durch eine aufsichtsführende
				Lernbegleitung ihrer Schule zum Raum hinzugefügt werden.</InfoAlert
			>

			<div>
				<v-text-field
					label="Beschreibung (optional)"
					hint="Wird in der Link-Übersicht angezeigt"
					persistent-hint
				/>
				<v-checkbox
					label="Link nur für Nutzende der folgenden Schule gültig [Schulname (hier entstehen wohl mindestens 2 Zeilen)]"
					hide-details
				/>
				<v-checkbox label="Link auch für Lernende gültig" hide-details />

				<div class="d-flex align-center justify-start">
					<v-checkbox id="checkDate" hide-details />
					<label for="checkDate">Link läuft ab am</label>
					<v-text-field
						v-date-input-mask
						:placeholder="t('common.placeholder.dateformat')"
						style="max-width: 100px"
						class="me-4"
					/>
					<v-menu
						transition="scale-transition"
						location="top"
						:close-on-content-click="false"
						:open-on-click="true"
					>
						<template #activator="{ props }">
							<v-btn v-bind="props" variant="flat">
								<v-icon :icon="mdiCalendar" />
							</v-btn>
						</template>

						<v-date-picker
							v-model="dateObject"
							@update:model-value="onDateUpdate"
						/>
					</v-menu>
				</div>

				<v-checkbox
					label="Betreten des Raums nur nach Bestätigung möglich (weitere Informationen)"
					hide-details
				/>
			</div>
		</template>

		<template #actions>
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					ref="cancelButton"
					class="ms-auto mr-2"
					color="primary"
					:text="t('common.actions.cancel')"
					data-testid="add-participant-cancel-btn"
					@click="onClose"
				/>
				<v-btn
					ref="addButton"
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('common.actions.add')"
					data-testid="add-participant-save-btn"
					@click="onInviteMembers"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VCard } from "vuetify/lib/components/index.mjs";
import { InfoAlert } from "@ui-alert";
import { dateInputMask as vDateInputMask } from "@util-input-masks";
import { mdiCalendar } from "@icons/material";

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();
const showDateDialog = ref(false);

const dateString = ref("");
const dateObject = ref<Date | null>(null);
dateObject.value = new Date();

const onClose = () => emit("close");
const onInviteMembers = () => {
	// Logic to invite members
};

const onDateUpdate = () => {
	// Logic to handle date update
};

const inviteMembersContent = ref<VCard>();
// TODO: check if focus trap is needed
const { pause, unpause } = useFocusTrap(inviteMembersContent, {
	immediate: true,
});
</script>
<style lang="scss" scoped></style>
