<template>
	<v-card data-testid="migration-warning-card">
		<v-card-title data-testid="migration-warning-card-title" class="card-title text-wrap">{{ t(title) }} </v-card-title>
		<v-card-text>
			<div data-testid="migration-warning-card-info-text">
				<p>
					{{
						isEndWarningCard
							? t("components.administration.adminMigrationSection.endWarningCard.text")
							: t("components.administration.adminMigrationSection.startWarningCard.text")
					}}
				</p>
				<template v-if="isEndWarningCard">
					<p class="text-red">
						{{ t("components.administration.adminMigrationSection.endWarningCard.text.warning") }}
					</p>
					<ul>
						<li v-for="item in endWarningCardListItems" :key="item.text" :class="item.class" class="ml-4 my-4">
							{{ t(item.text) }}
							<p v-if="item.warning" class="text-red mb-0">
								{{ t(item.warning) }}
							</p>
						</li>
					</ul>
					<i18n-t keypath="components.administrationSection.description.moreInformation" scope="global" tag="p">
						<a
							data-testid="end-warningcard-migration-blog-link"
							href="https://blog.niedersachsen.cloud/umzug"
							target="_blank"
							rel="noopener"
						>
							{{ t("components.administrationSection.description.moreInformation.link") }}
						</a>
					</i18n-t>
				</template>
			</div>
			<v-checkbox
				v-if="check"
				v-model="isConfirmed"
				:label="
					t(check, {
						gracePeriod: gracePeriodInDays,
					})
				"
				data-testid="migration-confirmation-checkbox"
			/>
		</v-card-text>
		<v-card-actions>
			<v-btn data-testid="disagree-btn" variant="flat" @click="$emit(eventName)">
				{{ t(disagree) }}
			</v-btn>
			<v-btn
				color="primary"
				data-testid="agree-btn"
				:disabled="!!check && !isConfirmed"
				variant="flat"
				@click="
					$emit('set');
					$emit(eventName);
				"
			>
				{{ t(agree) }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script lang="ts">
import { useEnvConfig } from "@data-env";
import { computed, ComputedRef, defineComponent, Ref, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

export enum MigrationWarningCardTypeEnum {
	START = "start",
	END = "end",
}

const END_WARNING_CARD_LIST_ITEMS = [
	{
		text: "components.administration.adminMigrationSection.endWarningCard.text.list.firstElement",
	},
	{
		text: "components.administration.adminMigrationSection.endWarningCard.text.list.secondElement",
	},
	{
		text: "components.administration.adminMigrationSection.endWarningCard.text.list.thirdElement",
	},
	{
		text: "components.administration.adminMigrationSection.endWarningCard.text.list.fourthElement",
		warning: "components.administration.adminMigrationSection.endWarningCard.text.list.fourthElement.warning",
	},
	{
		text: "components.administration.adminMigrationSection.endWarningCard.text.list.lastElement",
		class: "text-red",
	},
];

export default defineComponent({
	name: "MigrationWarningCard",
	props: {
		value: {
			type: String,
			required: true,
			validator(value: unknown) {
				return (
					(typeof value === "string" && value === MigrationWarningCardTypeEnum.START) ||
					value === MigrationWarningCardTypeEnum.END
				);
			},
		},
	},
	emits: ["start", "set", "end"],
	setup(props) {
		const type = toRef(props, "value");
		const isConfirmed: Ref<boolean> = ref(false);
		const { t } = useI18n();

		let title = "components.administration.adminMigrationSection.startWarningCard.title";
		let agree = "components.administration.adminMigrationSection.startWarningCard.agree";
		let disagree = "components.administration.adminMigrationSection.startWarningCard.disagree";
		let eventName: MigrationWarningCardTypeEnum = MigrationWarningCardTypeEnum.START;
		let check: string | undefined;

		const isEndWarningCard = computed(() => type.value === MigrationWarningCardTypeEnum.END);

		if (isEndWarningCard.value) {
			title = "components.administration.adminMigrationSection.endWarningCard.title";
			agree = "components.administration.adminMigrationSection.endWarningCard.agree";
			disagree = "components.administration.adminMigrationSection.endWarningCard.disagree";
			check = "components.administration.adminMigrationSection.endWarningCard.check";
			eventName = MigrationWarningCardTypeEnum.END;
		}

		const gracePeriodInDays: ComputedRef<number | undefined> = computed(() => {
			const days: number | undefined = undefined;
			if (useEnvConfig().value.MIGRATION_END_GRACE_PERIOD_MS) {
				const dayInMilliSeconds = 86400000;
				const days = useEnvConfig().value.MIGRATION_END_GRACE_PERIOD_MS / dayInMilliSeconds;
				return days;
			}
			return days;
		});

		return {
			title,
			agree,
			disagree,
			check,
			isConfirmed,
			eventName,
			gracePeriodInDays,
			t,
			endWarningCardListItems: END_WARNING_CARD_LIST_ITEMS,
			isEndWarningCard,
		};
	},
});
</script>

<style lang="scss" scoped>
.card-title {
	word-break: break-word;
}
</style>
