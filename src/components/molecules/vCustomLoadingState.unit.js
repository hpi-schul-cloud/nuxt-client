import Vuetify from "vuetify";
import vCustomLoadingState from "./vCustomLoadingState";

let vuetify;
let wrapper;
const type = "list-item-avatar-three-line";

describe("@components/molecules/vCustomLoadingState", () => {
    beforeEach(() => {
		vuetify = new Vuetify();

		wrapper = mount(vCustomLoadingState, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
				},
				vuetify
			),
			propsData: {
				type
			},
		});
	});

	afterEach(() => {
		wrapper.destroy();
	});

    it(...isValidComponent(vCustomLoadingState));

})