import Vuetify from "vuetify";
import vCustomEmptyState from "./vCustomEmptyState";
import BaseImage from "@basecomponents/BaseImage";

let vuetify;
let wrapper;

const title = "Test title";
const subtitle = "Test subtitle";
const image = "@assets/img/empty-state/Task_Empty_State.svg";

describe("@components/molecules/vCustomEmptyState", () => {
	beforeEach(() => {
		vuetify = new Vuetify();

		wrapper = mount(vCustomEmptyState, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
				},
				vuetify
			),
			propsData: {
				image,
				title,
			},
		});
	});

	afterEach(() => {
		wrapper.destroy();
	});

	it(...isValidComponent(vCustomEmptyState));

	it("should render Base Image component", () => {
		expect(wrapper.findComponent(BaseImage).exists()).toBe(true);
	});

	it("should render a title", () => {
		const h1 = wrapper.find("h1");
		expect(h1.text()).toBe(title);
	});

	it("should render subtitle, if it is passed as props", async () => {
		const h2 = wrapper.find("h2");
		expect(h2.exists()).toBe(false);
		expect(wrapper.props().subtitle).toBe("");

		wrapper.setProps({ subtitle });
		await wrapper.vm.$nextTick();

		const newH2 = wrapper.find("h2");
		expect(newH2.exists()).toBe(true);
		expect(newH2.text()).toBe(subtitle);
	});
});
