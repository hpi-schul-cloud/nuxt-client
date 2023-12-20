import { config, mount, shallowMount } from "@vue/test-utils";

// VUE3_UPGRADE enable rendering of default slot on stubbed components
// see https://test-utils.vuejs.org/migration/#shallowMount-and-renderStubDefaultSlot
config.global.renderStubDefaultSlot = true;

global.mount = mount;
global.shallowMount = shallowMount;
