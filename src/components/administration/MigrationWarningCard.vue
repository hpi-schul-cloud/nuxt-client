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
				const validValues = Object.values(MigrationWarningCardTypeEnum);
				return (
					typeof value === "string" &&
					validValues.includes(value as MigrationWarningCardTypeEnum)
				);
			},
		},
	},
	setup(props) {
		const type: Ref<MigrationWarningCardTypeEnum> = ref(
			props.value as MigrationWarningCardTypeEnum
		);
		const isConfirmed: Ref<boolean> = ref(false);

		let title;
		let text;
		let agree;
		let disagree;
		let check;
		let eventName;

		if (MigrationWarningCardTypeEnum.START === type.value) {
			title =
				"components.administration.adminMigrationSection.startWarningCard.title";
			text =
				"components.administration.adminMigrationSection.startWarningCard.text";
			agree =
				"components.administration.adminMigrationSection.startWarningCard.agree";
			disagree =
				"components.administration.adminMigrationSection.startWarningCard.disagree";
			eventName = "start";
		} else if (MigrationWarningCardTypeEnum.END === type.value) {
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
