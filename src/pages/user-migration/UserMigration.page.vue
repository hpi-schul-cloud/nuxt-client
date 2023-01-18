<template>
  <div>
    <img
      class="logo logo-full"
      src="@assets/img/logo/logo-image-mono.svg"
      alt="Schulcloud Logo"
    />
    <div class="text-center mt-16 mx-auto container-max-width">
      <h1 class="pl-4 pr-4">
        {{
          $t("pages.userMigration.title", {
            subject: subjectName,
          })
        }}
      </h1>
      <img
        width="200px"
        src="@assets/img/svgImageExample.svg"
        alt=""
      />
      <div v-show="loading">
        <v-progress-circular
          indeterminate
          class="mt-8"
        ></v-progress-circular>
      </div>
      <div v-show="!loading">
        <p
            class="text-left pa-4"
            v-html="$t(descriptionText, {
              sourceSystem: sourceSystemName,
              targetSystem: targetSystemName,
            })"
        >
        </p>
        <div class="d-flex flex-wrap justify-space-around mt-8">
          <v-btn
            class="mx-8 mb-8"
            color="primary"
            depressed
            data-testid="btn-proceed"
            :to="proceedLink"
          >
            {{ $t(proceedButtonText) }}
          </v-btn>
          <v-btn
            class="mx-8 mb-8"
            color="primary"
            depressed
            data-testid="btn-cancel"
            :to="cancelLink"
          >
            {{ $t(cancelButtonText) }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SystemsModule from "@/store/systems";
import UserMigrationModule from "@/store/user-migration";
import { MigrationPageOrigin } from '@store/types/user-migration';
import { computed, ComputedRef, defineComponent, inject, onMounted } from "@vue/composition-api";

export default defineComponent({
  name: "UserMigration",
  layout: "plain",
  props: {
    sourceSystem: {
      type: String,
      required: true,
    },
    targetSystem: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    mandatory: {
      type: Boolean,
    }
  },
  meta: {
    isPublic: true,
  },
  setup(props) {
    const systemsModule: SystemsModule | undefined = inject<SystemsModule>("systemsModule");
    const userMigrationModule: UserMigrationModule | undefined = inject<UserMigrationModule>("userMigrationModule");
    if (!systemsModule || !userMigrationModule) {
      throw new Error("Injection of dependencies failed");
    }

    const loading: ComputedRef<boolean> = computed(() => false);
    const sourceSystemName: ComputedRef<string> = computed(() => {
      return systemsModule.findSystem(props.sourceSystem)?.name ?? "???"
    });
    const targetSystemName: ComputedRef<string> = computed(() => {
      return systemsModule.findSystem(props.targetSystem)?.name ?? "???"
    });

    const proceedLink: ComputedRef<string> = computed(() => userMigrationModule.getMigrationLinks.proceedLink);
    const cancelLink: ComputedRef<string> = computed(() => userMigrationModule.getMigrationLinks.cancelLink);

    const proceedButtonText = "pages.userMigration.startMigration";
    const cancelButtonText = "pages.userMigration.logout";
    const descriptionText = "pages.userMigration.description.startFromTargetSystem";

    const subjectName = "Schüler Lernend";

    let pageType: MigrationPageOrigin;
    if (props.origin === props.sourceSystem) {
      pageType = props.mandatory ? MigrationPageOrigin.START_FROM_SOURCE_SYSTEM_MANDATORY : MigrationPageOrigin.START_FROM_SOURCE_SYSTEM;
    } else if (props.origin === props.targetSystem) {
      pageType = MigrationPageOrigin.START_FROM_TARGET_SYSTEM;
    } else {
      throw new Error(`Unknown origin system ${props.origin}. Expected ${props.sourceSystem} or ${props.targetSystem}`);
    }

    onMounted(async () => {
      await systemsModule.fetchSystems();
      await userMigrationModule.fetchMigrationLinks({
        pageType,
        sourceSystem: props.sourceSystem,
        targetSystem: props.targetSystem,
      });
    });

    return {
      loading,
      subjectName,
      sourceSystemName,
      targetSystemName,
      proceedLink,
      cancelLink,
      proceedButtonText,
      cancelButtonText,
      descriptionText
    };
  },
});
</script>

<style lang="scss" scoped>
.container-max-width {
  max-width: var(--size-content-width-max);
}
</style>