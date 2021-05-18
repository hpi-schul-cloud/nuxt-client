import Vuetify from "vuetify";
import TasksEmptyState from "./TasksEmptyState";
import BaseImage from "@basecomponents/BaseImage";

let vuetify;
let wrapper; 
const title = "Test title";
const subtitle = "Test subtitle";
const image = "@assets/img/empty-state/Task_Empty_State.svg";

describe("@components/molecules/TasksEmptyState", () => {

	beforeEach(() => {
		vuetify = new Vuetify();
	
		wrapper = mount(TasksEmptyState, {
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
				subtitle
			}
		});
	});
	
	afterEach(() => {
		wrapper.destroy();
	});

	it(...isValidComponent(TasksEmptyState));

	it("can receive props", () => {
		expect(wrapper.props().title).toBe(title);
		expect(wrapper.props().subtitle).toBe(subtitle);
		expect(wrapper.props().image).toBe(image);
	});

	it("should render Base Image component", () => {
		expect(wrapper.findComponent(BaseImage).exists()).toBe(true);
	});

	it("should render a title and a subtitle", () => {
		const h2 = wrapper.find("h2");
		const h3 = wrapper.find("h3");
		expect(h2.text()).toBe(title);
		expect(h3.text()).toBe(subtitle);
	});
});
