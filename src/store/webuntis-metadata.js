import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("webuntisMetadata");

const module = mergeDeep(base, {});

export default module;
