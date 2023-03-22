<template>
	<v-card data-testid="migration-warning-card">
		<v-card-title class="card-title">{{ $t(title) }}</v-card-title>
		<v-card-text>
			<p v-html="$t(text)"></p>
			<v-checkbox
				v-if="check"
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
				data-testid="disagree-btn"
				color="secondary"
				@click="$emit(eventName)"
			>
				{{ $t(disagree) }}
			</v-btn>
			<v-btn
				color="primary"
				data-testid="agree-btn"
				:disabled="check && !isConfirmed"
				@click="
					$emit('set');
					$emit(eventName);
				"
			>
				{{ $t(agree) }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

export enum MigrationWarningCardTypeEnum {
	START = "start",
	END = "end",
}

export default defineComponent({
	name: "MigrationWarningCard",
	emits: ["start", "set", "end"],
	props: {
		value: {
			type: String,
			required: true,
			validator(value: unknown) {
				return (
					(typeof value === "string" &&
						value === MigrationWarningCardTypeEnum.START) ||
					value === MigrationWarningCardTypeEnum.END
				);
			},
		},
	},
	setup(props) {
		const type: Ref<MigrationWarningCardTypeEnum> = ref(
			props.value as MigrationWarningCardTypeEnum
		);
		const isConfirmed: Ref<boolean> = ref(false);

		let title =
			"components.administration.adminMigrationSection.startWarningCard.title";
		let text =
			"components.administration.adminMigrationSection.startWarningCard.text";
		let agree =
			"components.administration.adminMigrationSection.startWarningCard.agree";
		let disagree =
			"components.administration.adminMigrationSection.startWarningCard.disagree";
		let eventName = "start";
		let check: string | undefined;

		if (type.value === MigrationWarningCardTypeEnum.END) {
			title =
				"components.administration.adminMigrationSection.endWarningCard.title";
			text =
				"components.administration.adminMigrationSection.endWarningCard.text";
			agree =
				"components.administration.adminMigrationSection.endWarningCard.agree";
			disagree =
				"components.administration.adminMigrationSection.endWarningCard.disagree";
			check =
				"components.administration.adminMigrationSection.endWarningCard.check";
			eventName = "end";
		}

		return {
			title,
			text,
			agree,
			disagree,
			check,
			isConfirmed,
			eventName,
		};
	},
});
</script>

<style lang="scss" scoped>
.card-title {
	word-break: break-word;
}
</style>
