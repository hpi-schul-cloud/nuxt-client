<template>
	<v-card class="migration-end-card">
		<v-card-title class="card-title"
			>{{
				$t(
					"components.administration.adminMigrationSection.endWarningCard.title"
				)
			}}
		</v-card-title>
		<v-card-text>
			<p
				v-html="
					$t(
						'components.administration.adminMigrationSection.endWarningCard.text'
					)
				"
			></p>
			<v-checkbox
				v-model="isConfirmed"
				:label="
					$t(
						'components.administration.adminMigrationSection.endWarningCard.check'
					)
				"
				data-testid="migration-confirmation-checkbox"
			></v-checkbox>
		</v-card-text>
		<v-card-actions>
			<v-btn
				color="secondary"
				data-testid="migration-end-disagree-button"
				@click="$emit('end')"
			>
				{{
					$t(
						"components.administration.adminMigrationSection.endWarningCard.disagree"
					)
				}}
			</v-btn>
			<v-btn
				color="primary"
				data-testid="migration-end-agree-button"
				:disabled="!isConfirmed"
				@click="
					$emit('set');
					$emit('end');
				"
			>
				{{
					$t(
						"components.administration.adminMigrationSection.endWarningCard.agree"
					)
				}}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

// TODO https://ticketsystem.dbildungscloud.de/browse/N21-618 Combine MigrationEndWarningCard and MigrationStartWarningCard
export default defineComponent({
	name: "MigrationEndWarningCard",
	emits: ["end", "set"],
	setup() {
		const isConfirmed: Ref<boolean> = ref(false);
		return {
			isConfirmed,
		};
	},
});
</script>

<style lang="scss" scoped>
.card-title {
	word-break: break-word;
}
</style>
