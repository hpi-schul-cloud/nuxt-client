<template>
	<v-dialog max-width="480">
		<v-card title="Raum duplizieren">
			<v-card-text>
				<p>Im nächsten Schritt wird eine Kopie des Raumes erstellt.</p>
				<InfoAlert>
					<p>Folgende Inhalte werden nicht kopiert:</p>
					<ul>
						<li>Raum-Mitglieder und Berechtigungen</li>
						<li>Inhalte aus Etherpads</li>
						<li>Inhalte aus Whiteboards</li>
						<li>Geschützte Einstellungen externer Tools</li>
					</ul>
				</InfoAlert>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn variant="text" @click="$emit('duplication:cancel')">
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn color="primary" @click="$emit('duplication:confirm')">
					Duplizieren
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { InfoAlert } from "@ui-alert";

defineEmits(["duplication:cancel", "duplication:confirm"]);
</script>
