<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<v-alert light prominent text type="info">
			{{ t("components.administration.adminMigrationSection.infoText") }}
		</v-alert>
		<v-btn
			v-if="!isMigrationAvailable && !showEndWarning && !showStartWarning"
			class="my-5 button-start"
			color="primary"
			depressed
			:disabled="!isMigrationEnabled"
			@click="toggleShowStartWarning"
		>
			{{
				t(
					"components.administration.adminMigrationSection.migrationEnableButton.label"
				)
			}}
		</v-btn>

		<v-btn
			v-if="isMigrationAvailable && !showEndWarning && !showStartWarning"
			class="my-5 button-end"
			color="primary"
			depressed
			:disabled="!isMigrationAvailable"
			@click="toggleShowEndWarning"
		>
			{{
				t(
					"components.administration.adminMigrationSection.migrationEndButton.label"
				)
			}}
		</v-btn>

		<v-switch
			v-if="!showEndWarning && !showStartWarning"
			:label="migrationSwitchLabel"
			:disabled="!isMigrationAvailable"
			:true-value="true"
			:false-value="false"
			:value="isMigrationMandatory"
			@change="setMigration(true, true)"
		></v-switch>

    <v-card v-if="showStartWarning">
      <v-card-title>"Wollen Sie die Migration wirklich starten?"</v-card-title>
      <v-card-text>
        <div>
          "Nutzer werden somit in der Lage sein ihren Account auf das neue Login-System zu migrieren."
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="primary"
            @click="toggleShowStartWarning(); setMigration(true, false);"
        >
          "Ja, Migration starten"
        </v-btn>

        <v-btn color="primary" @click="toggleShowStartWarning">
          "Nein, Migration nicht starten"
        </v-btn>
      </v-card-actions>
    </v-card>

		<v-card v-if="showEndWarning">
			<v-card-title>{{
				t("components.administration.adminMigrationSection.warningCard.title")
			}}</v-card-title>
			<v-card-text>
				<div>
					{{
						t(
							"components.administration.adminMigrationSection.warningCard.text"
						)
					}}
				</div>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="primary"
					@click="
						toggleShowEndWarning();
						endMigration();
					"
				>
					{{
						t(
							"components.administration.adminMigrationSection.warningCard.agree"
						)
					}}
				</v-btn>

				<v-btn color="primary" @click="toggleShowEndWarning">
					{{
						t(
							"components.administration.adminMigrationSection.warningCard.disagree"
						)
					}}
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
import { IOauthMigrationRequest } from "@store/types/schools";

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

		const isMigrationEnabled: ComputedRef<boolean> = computed( () =>
			schoolsModule.getOauthMigration ?? false
		);

		const isMigrationAvailable: ComputedRef<boolean> = computed( () =>
			schoolsModule.getOauthMigrationAvailable ?? false
		);

		const isMigrationMandatory: ComputedRef<boolean> = computed( () =>
			schoolsModule.getOauthMigrationMandatory ?? false
		);

		const setMigration = (available: boolean, mandatory: boolean) => {
      console.log("available im setup: ", available, "mandatory im setup: ", mandatory) // this works
      const migrationFlags: IOauthMigrationRequest = { available, mandatory }
			schoolsModule.setSchoolOauthMigration(migrationFlags);
		};

		const endMigration = () => {
			schoolsModule.endMigration();
		};

		const showEndWarning: Ref<boolean> = ref(false);

		const toggleShowEndWarning = () => {
			showEndWarning.value = !showEndWarning.value;
		};

    const showStartWarning: Ref<boolean> = ref(false);

    const toggleShowStartWarning = () => {
      showStartWarning.value = !showStartWarning.value;
    };

		const migrationSwitchLabel: ComputedRef<string> = computed(() => {
			if (isMigrationMandatory.value) {
				return t(
					"components.administration.adminMigrationSection.mandatorySwitch.disable"
				);
			} else {
				return t(
					"components.administration.adminMigrationSection.mandatorySwitch.enable"
				);
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
			showEndWarning,
			toggleShowEndWarning,
      showStartWarning,
      toggleShowStartWarning,
			endMigration,
		};
	},
});
</script>
