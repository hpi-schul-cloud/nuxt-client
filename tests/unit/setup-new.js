import Vue from "vue";
import Vuex from "vuex";

import { mount, shallowMount } from "@vue/test-utils";

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance
// for tests.
Vue.config.productionTip = false;

Vue.use(Vuex);

global.mount = mount;
global.shallowMount = shallowMount;
// global.createComponentMocks = ({ i18n }) => {};
