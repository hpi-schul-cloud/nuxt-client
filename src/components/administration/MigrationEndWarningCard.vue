<template>
	<v-card class="migration-end-card">
		<v-card-title
			>{{
				$t(
					"components.administration.adminMigrationSection.endWarningCard.title"
				)
			}}
		</v-card-title>
		<v-card-text>
			<div>
				{{
					$t(
						"components.administration.adminMigrationSection.endWarningCard.text"
					)
				}}
			</div>
		</v-card-text>
		<v-card-actions>
			<v-btn
				class="agree-btn-end"
				color="primary"
				data-testid="migration-end-agree-button"
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

			<v-btn
				class="disagree-btn-end"
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
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MigrationEndWarningCard",
	emits: ["end", "set"],
	setup() {},
});
</script>
