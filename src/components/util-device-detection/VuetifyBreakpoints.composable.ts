import { breakpointsVuetify, useBreakpoints } from "@vueuse/core";

export const useVuetifyBreakpoints = () => useBreakpoints(breakpointsVuetify);

useVuetifyBreakpoints().smallerOrEqual("sm");
