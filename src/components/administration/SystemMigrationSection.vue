<template>
	<!--  <div>test</div>-->
	<!--	<div v-if="isMigrationEnabled">-->
	<div>
		<h2 class="text-h4 mb-10">Migration...</h2>
		<v-alert light prominent text type="info"
			>"Hier kommt der Text hinein, der den Admin informiert, dass die Migration
			nur stattfinden kann, wenn die offizielle Schulnummer da ist."</v-alert
		>
		<v-switch label="Migration von IServ zu SANIS aktivieren..."></v-switch>
		<!--		<v-switch :label="$t('pages.courses.index.courses.arrangeCourses')></v-switch>-->
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
// import EnvConfigModule from "@store/env-config";
import { inject } from "@nuxtjs/composition-api";
import EnvConfigModule from "../../store/env-config";
// import { envConfigModule } from "@/store";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "SystemMigrationSection",
	components: {},
	/* props: {
		enableIfEnvExists: {
			type: Boolean,
			required: false,
		},
	}, */
	setup() {
		const envConfigModule: EnvConfigModule | undefined =
			inject<EnvConfigModule>("envConfigModule");
		if (!envConfigModule) {
			throw new Error("Injection of dependencies failed");
		}

		const isMigrationEnabled = computed(() => {
			envConfigModule.getFeatureSchoolSanisUserMigrationEnabled;
		});

		return {
			isMigrationEnabled,
		};
	},
});
</script>
