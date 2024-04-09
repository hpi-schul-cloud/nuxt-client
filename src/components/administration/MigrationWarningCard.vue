<template>
	<v-card data-testid="migration-warning-card">
		<v-card-title
			data-testid="migration-warning-card-title"
			class="card-title"
			>{{ $t(title) }}</v-card-title
		>
		<v-card-text>
			<RenderHTML
				data-testid="migration-warning-card-info-text"
				:html="
					$t(text, {
						gracePeriod: gracePeriodInDays,
					}).toString()
				"
				component="p"
			/>
			<v-checkbox
				v-if="check"
				v-model="isConfirmed"
				:label="
					$t(check, {
						gracePeriod: gracePeriodInDays,
					})
				"
				data-testid="migration-confirmation-checkbox"
			/>
		</v-card-text>
		<v-card-actions>
			<v-btn data-testid="disagree-btn" @click="$emit(eventName)">
				{{ $t(disagree) }}
			</v-btn>
			<v-btn
				color="primary"
				data-testid="agree-btn"
				:disabled="!!check && !isConfirmed"
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
import { RenderHTML } from "@feature-render-html";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { ComputedRef, Ref, computed, defineComponent, ref, toRef } from "vue";

export enum MigrationWarningCardTypeEnum {
	START = "start",
	END = "end",
}

export default defineComponent({
	name: "MigrationWarningCard",
	components: { RenderHTML },
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
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const type = toRef(props, "value");
		const isConfirmed: Ref<boolean> = ref(false);

		let title =
			"components.administration.adminMigrationSection.startWarningCard.title";
		let text =
			"components.administration.adminMigrationSection.startWarningCard.text";
		let agree =
			"components.administration.adminMigrationSection.startWarningCard.agree";
		let disagree =
			"components.administration.adminMigrationSection.startWarningCard.disagree";
		let eventName: MigrationWarningCardTypeEnum =
			MigrationWarningCardTypeEnum.START;
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
			eventName = MigrationWarningCardTypeEnum.END;
		}

		const gracePeriodInDays: ComputedRef<number | undefined> = computed(() => {
			const days: number | undefined = undefined;
			if (envConfigModule.getMigrationEndGracePeriod) {
				const dayInMilliSeconds = 86400000;
				const days =
					envConfigModule.getMigrationEndGracePeriod / dayInMilliSeconds;
				return days;
			}
			return days;
		});

		return {
			title,
			text,
			agree,
			disagree,
			check,
			isConfirmed,
			eventName,
			gracePeriodInDays,
		};
	},
});
</script>

<style lang="scss" scoped>
.card-title {
	word-break: break-word;
}
</style>
