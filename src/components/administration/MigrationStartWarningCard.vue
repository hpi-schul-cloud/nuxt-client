<template>
    <v-card class="migration-start-card">
      <v-card-title>{{
          $t("components.administration.adminMigrationSection.startWarningCard.title")
        }}
      </v-card-title>
      <v-card-text>
        <div>
          {{
            $t("components.administration.adminMigrationSection.startWarningCard.text")
          }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
            class="agree-btn-start"
            color="primary"
            @click=" $emit('set');
            $emit('start')"
        >
          {{
            $t("components.administration.adminMigrationSection.startWarningCard.agree")
          }}
        </v-btn>

        <v-btn
            class="disagree-btn-start"
            color="secondary"
            @click="$emit('start')"
        >
          {{
            $t("components.administration.adminMigrationSection.startWarningCard.disagree")
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
<script lang="ts">

import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: 'MigrationStartWarningCard',
  emits: ["start", "set"],
  setup(){
  },
});
</script>
