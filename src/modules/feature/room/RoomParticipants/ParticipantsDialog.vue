<template>
	<v-card
		max-width="400"
		text="Add participant to room"
		:title="t('pages.rooms.participants.addParticipants')"
	>
		<template v-slot:actions>
			<v-btn class="ms-auto" text="Ok" />
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
