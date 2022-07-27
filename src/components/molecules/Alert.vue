<template>
  <div :class="{ 'alert_wrapper-mobile': isMobile, alert_wrapper: !isMobile }">
    <v-alert
        v-model="show"
        :icon="icon"
        :transition="
				isMobile ? 'scale-transition' : 'scroll-x-reverse-transition'
			"
        :type="status"
        class="alert"
        dismissible
        max-width="400"
        min-width="200"
        text
    >
      <div :class="[status]" class="alert_accent"></div>
      <div class="alert_text mr-2">
        {{ text }}
      </div>
    </v-alert>
  </div>
</template>

<script>
import { notifierModule } from "@/store";
import { mdiAlert, mdiCheckCircle, mdiClose, mdiInformation } from "@mdi/js";

export default {
  data() {
    return {
      show: false,
      mdiClose,
      mdiAlert,
      mdiCheckCircle,
      mdiInformation,
    };
  },
  computed: {
    notifierData() {
      return notifierModule.getNotifier;
    },
    status() {
      return this.notifierData?.status || "info";
    },
    isMobile() {
      return this.$mq === "mobile";
    },
    text() {
      return (
          this.notifierData?.text || `Ich bin ein Alert mit sehr langer message `
      );
    },
    icon() {
      if (this.status === "success") return mdiCheckCircle;
      if (this.status === "warning") return mdiAlert;
      if (this.status === "danger") return mdiAlert;
      if (this.status === "info") return mdiInformation;
      return undefined;
    },
  },
  watch: {
    notifierData() {
      this.show = true;

      // todo improve timeout to cancel old one
      setTimeout(() => {
        this.show = false;
      }, this.timeout || 5000);
    },
  },
  created() {
    setTimeout(() => {
      notifierModule.show({
        text: "Test aus created",
        status: "success",
      });
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
@import "@variables";

.alert_wrapper {
  position: absolute;
  top: 0;
  right: 0;
  z-index: var(--layer-tooltip);
  overflow: visible;
}

.alert_wrapper-mobile {
  position: fixed;
  right: 0;
  bottom: 5vh;
  left: 0;
  z-index: var(--layer-tooltip);
  overflow: visible;
}

.alert {
  margin: 0 var(--space-sm);
  overflow: hidden;
  background-color: var(--color-white) !important;
}

.alert_text {
  color: var(--color-black);
}

.alert_accent {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 5px;
  background-color: transparent;

  &.success {
    background-color: var(--color-success-dark);
  }

  &.warning {
    background-color: var(--color-warning-dark);
  }

  &.danger {
    background-color: var(--color-danger-dark);
  }
}
</style>
