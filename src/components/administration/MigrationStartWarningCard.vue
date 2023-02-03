<template>
	<v-card class="migration-start-card">
		<v-card-title
			>{{
				$t(
					"components.administration.adminMigrationSection.startWarningCard.title"
				)
			}}
		</v-card-title>
		<v-card-text>
			<div>
				{{
					$t(
						"components.administration.adminMigrationSection.startWarningCard.text"
					)
				}}
			</div>
		</v-card-text>
		<v-card-actions>
			<v-btn
				class="agree-btn-start"
				color="primary"
				data-testId="migration-start-agree-button"
				@click="
					$emit('set');
					$emit('start');
				"
			>
				{{
					$t(
						"components.administration.adminMigrationSection.startWarningCard.agree"
					)
				}}
			</v-btn>

			<v-btn
				class="disagree-btn-start"
				color="secondary"
				data-testId="migration-start-disagree-button"
				@click="$emit('start')"
			>
				{{
					$t(
						"components.administration.adminMigrationSection.startWarningCard.disagree"
					)
				}}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MigrationStartWarningCard",
	emits: ["start", "set"],
	setup() {},
});
</script>
