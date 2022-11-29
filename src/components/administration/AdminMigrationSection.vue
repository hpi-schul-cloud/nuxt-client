<template>
	<div>
		<h2 class="text-h4 mb-10">Migration...</h2>
		<v-alert light
             prominent
             text
             type="info">
      Hier kommt der Text hinein, der den Admin informiert, dass die Migration
			nur stattfinden kann, wenn die offizielle Schulnummer da ist.
    </v-alert>
		<v-switch label="Migration von IServ zu SANIS aktivieren..."
              :disabled="isMigrationAvailable && isMigrationFeatureEnabled"
              :true-value="true"
              :false-value="false"
              :value="isMigrationEnabled"
            @change=setMigration
        ></v-switch>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import { inject, Ref } from "@nuxtjs/composition-api";
import EnvConfigModule from "../../store/env-config";
import SchoolsModule from "@store/schools";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "AdminMigrationSection",
	components: {},
	setup() {
		const envConfigModule: EnvConfigModule | undefined =
			inject<EnvConfigModule>("envConfigModule");
        const schoolsModule: SchoolsModule | undefined = inject<SchoolsModule>("schoolsModule");
		if (!envConfigModule || !schoolsModule) {
			throw new Error("Injection of dependencies failed");
		}

		const isMigrationFeatureEnabled = computed(() => {
			envConfigModule.getFeatureSchoolSanisUserMigrationEnabled;
		});

    const isMigrationEnabled: Ref<boolean> = ref(schoolsModule.getOauthMigration);
    const isMigrationAvailable: Ref<boolean> = ref(schoolsModule.getOauthMigrationAvailable);

    const setMigration = (value: boolean) => {
      schoolsModule.setSchoolOauthMigration(value);
    };

		return {
      isMigrationEnabled,
      isMigrationFeatureEnabled,
      setMigration,
      isMigrationAvailable,
		};
	},
});
</script>
