---
to: "src/store/<%= storeName %>.js"
---
import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("<%= backendRoute %>");

const module = mergeDeep(base, {});

export default module;
