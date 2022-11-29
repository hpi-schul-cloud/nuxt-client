<template>
	<div>
		<h2 class="text-h4 mb-10">Migration...</h2>
		<v-alert light prominent text type="info">
      {{$t("components.administration.adminMigrationSection.infoText")}}
		</v-alert>
    <v-switch
			label="Migration von IServ zu SANIS aktivieren..."
			:disabled="isMigrationAvailable && isMigrationFeatureEnabled"
			:true-value="true"
			:false-value="false"
			:value="isMigrationEnabled"
			@change="setMigration"
		></v-switch>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import { inject, Ref } from "@nuxtjs/composition-api";
import EnvConfigModule from "../../store/env-config";
import SchoolsModule from "@store/schools";
import VueI18n from "vue-i18n";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "AdminMigrationSection",
	components: {},
	setup() {
       const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
       const envConfigModule: EnvConfigModule | undefined =
			inject<EnvConfigModule>("envConfigModule");
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		if (!envConfigModule || !schoolsModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

        const t = (key: string) => {
          const translateResult = i18n.t(key);
          if (typeof translateResult === "string") {
            return translateResult;
          }
          return "unknown translation-key:" + key;
        };

		const isMigrationFeatureEnabled = computed(() => {
			envConfigModule.getFeatureSchoolSanisUserMigrationEnabled;
		});

		const isMigrationEnabled: Ref<boolean> = ref(
			schoolsModule.getOauthMigration
		);
		const isMigrationAvailable: Ref<boolean> = ref(
			schoolsModule.getOauthMigrationAvailable
		);

		const setMigration = (value: boolean) => {
			schoolsModule.setSchoolOauthMigration(value);
		};

		return {
			isMigrationEnabled,
			isMigrationFeatureEnabled,
			setMigration,
			isMigrationAvailable,
      t
		};
	},
});
</script>
