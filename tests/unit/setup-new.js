import { mount, shallowMount } from "@vue/test-utils";

const createComponentMocks = ({ i18n }) => {};

global.mount = mount;
global.shallowMount = shallowMount;
global.createComponentMocks = createComponentMocks;
