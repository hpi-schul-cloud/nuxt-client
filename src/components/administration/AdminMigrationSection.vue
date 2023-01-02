<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<v-alert light prominent text type="info">
			{{ t("components.administration.adminMigrationSection.infoText") }}
		</v-alert>
		<v-btn
			v-if="!isMigrationAvailable && !showWarning"
			class="my-5 button-start"
			color="primary"
			depressed
			:disabled="!isMigrationEnabled"
			@click="setMigration(true, false)"
		>
			{{
				$t(
					"components.administration.adminMigrationSection.migrationEnableButton.label"
				)
			}}
		</v-btn>

		<v-btn
			v-if="isMigrationAvailable && !showWarning"
			class="my-5 button-end"
			color="primary"
			depressed
			:disabled="!isMigrationAvailable"
			@click="toggleShowWarning"
		>
			{{
				$t(
					"components.administration.adminMigrationSection.migrationEndButton.label"
				)
			}}
		</v-btn>

		<v-switch
			v-if="!showWarning"
			:label="migrationSwitchLabel"
			:disabled="!isMigrationAvailable"
			:true-value="true"
			:false-value="false"
			:value="isMigrationMandatory"
			@change="setMigration(true, true)"
		></v-switch>

		<v-card v-if="showWarning">
			<v-card-title>{{ $t("components.administration.adminMigrationSection.warningCard.title") }}</v-card-title>
			<v-card-text>
				<div>
					{{ $t("components.administration.adminMigrationSection.warningCard.text") }}
				</div>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="primary"
					@click="
						toggleShowWarning;
						endMigration;
					"
				>
          {{ $t("components.administration.adminMigrationSection.warningCard.agree") }}
				</v-btn>

				<v-btn color="primary" @click="toggleShowWarning">
          {{ $t("components.administration.adminMigrationSection.warningCard.disagree") }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import {
	computed,
	ComputedRef,
	inject,
	onMounted,
	Ref,
} from "@nuxtjs/composition-api";
import SchoolsModule from "@store/schools";
import VueI18n from "vue-i18n";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "AdminMigrationSection",
	components: {},
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		if (!schoolsModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const isMigrationEnabled: Ref<boolean> = ref(
			schoolsModule.getOauthMigration ?? false
		);

		const isMigrationAvailable: Ref<boolean> = ref(
			schoolsModule.getOauthMigrationAvailable
		);

		const isMigrationMandatory: Ref<boolean> = ref(
			schoolsModule.getOauthMigrationMandatory
		);

		const setMigration = (available: boolean, mandatory: boolean) => {
			schoolsModule.setSchoolOauthMigration(available, mandatory);
		};

		const endMigration = () => {
			schoolsModule.endMigration();
		};

		let warning = false;

		const showWarning: Ref<boolean> = ref(warning);

		const toggleShowWarning: ComputedRef<void> = computed(() => {
			warning = !warning;
		});

		const migrationSwitchLabel: ComputedRef<string> = computed(() => {
			if (isMigrationMandatory.value) {
				return "Pflicht zu Iserv-Migration aufheben";
			} else {
				return "Iserv-Migration verpflichtend machen";
			}
		});

		onMounted(async () => {
			await schoolsModule.fetchSchoolOAuthMigration();
		});

		return {
			isMigrationEnabled,
			setMigration,
			isMigrationAvailable,
			isMigrationMandatory,
			t,
			migrationSwitchLabel,
			warning,
			showWarning,
			toggleShowWarning,
			endMigration,
		};
	},
});
</script>
