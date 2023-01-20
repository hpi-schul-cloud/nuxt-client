import ApplicationErrorModule from "../store/application-error";
import {onBeforeUnmount, onMounted} from "@nuxtjs/composition-api";
import {HttpStatusCode} from "../store/types/http-status-code.enum";
import {provide} from "@vue/composition-api";

export default {
    restore() {
        const performanceNavigation = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        const applicationErrorStatusCode = localStorage.getItem("applicationErrorStatusCode");
        const applicationErrorTranslationKey = localStorage.getItem("applicationErrorTranslationKey")

        if ((applicationErrorStatusCode || applicationErrorTranslationKey) && performanceNavigation.type === "reload") {
            const storedApplicationErrorModule = new ApplicationErrorModule({});
            if (applicationErrorStatusCode) {
                storedApplicationErrorModule.setStatusCode(Number(applicationErrorStatusCode) as HttpStatusCode);
            }
            storedApplicationErrorModule.setTranslationKey(applicationErrorTranslationKey);

            provide<ApplicationErrorModule>("applicationErrorModule", storedApplicationErrorModule);
        }

        onMounted(() => {
            localStorage.removeItem("applicationErrorStatusCode");
            localStorage.removeItem("applicationErrorTranslationKey");
        });
    },

    store(
        applicationErrorModule: ApplicationErrorModule
    ) {
        onBeforeUnmount(() => {
            if (applicationErrorModule?.getStatusCode)
                localStorage.setItem("applicationErrorStatusCode", HttpStatusCode[applicationErrorModule?.getStatusCode]);

            if (applicationErrorModule?.getTranslationKey)
                localStorage.setItem("applicationErrorTranslationKey", applicationErrorModule!.getTranslationKey);
        })
    }
}
