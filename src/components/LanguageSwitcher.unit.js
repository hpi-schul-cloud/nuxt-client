import LanguageSwitcher from "./LanguageSwitcher";

// Instead do this in setup.js. Only keep until that is working
// import { createLocalVue } from "@vue/test-utils";
// import Vuex from "vuex";
// import localStore from "@store";

// const localVue = createLocalVue();
// localVue.use(Vuex);
// let store;

// beforeEach(() => {
// 	store = localStore;
// });

describe("@components/LanguageSwitcher", () => {
	it(...isValidComponent(LanguageSwitcher));

	// it("Switch language", () => {
	// 	const wrapper = mount(LanguageSwitcher, {
	// 		propsData: {
	// 			value: "de",
	// 		},
	// 		store,
	// 		localVue,
	// 	});
	// 	const de = wrapper.findAll("input").at(0);
	// 	const en = wrapper.findAll("input").at(1);
	// 	console.log(wrapper.html());
	// });
});
