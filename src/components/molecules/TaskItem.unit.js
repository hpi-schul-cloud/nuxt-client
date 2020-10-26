import TaskItem from "@components/molecules/TaskItem";

const props = {
	title: "A new task",
	subtitle: "Task type",
	status: "Draft",
	progress: 32,
	actionNeeded: true,
	actions: [
		{ text: "Publish", event: "event1" },
		{ text: "Review", event: "event2" },
	],
};

describe("@components/molecules/TaskItem", () => {
	it(...isValidComponent(TaskItem));

	it("renders text props", () => {
		const wrapper = shallowMount(TaskItem, {
			propsData: {
				title: props.title,
				subtitle: props.subtitle,
				status: props.status,
			},
		});
		expect(wrapper.text()).toContain(props.title);
		expect(wrapper.text()).toContain(props.subtitle);
		expect(wrapper.text()).toContain(props.status);
	});

	it("renders the image properly", () => {
		const wrapper = shallowMount(TaskItem, {
			propsData: {
				imgSrc: "@assets/img/courses/draft.svg",
				title: props.title,
			},
		});
		expect(wrapper.find(".image").exists()).toBe(true);
	});

	it("renders the pulsating dot if actionNeeded is true", () => {
		const wrapper = shallowMount(TaskItem, {
			propsData: {
				title: props.title,
				actionNeeded: props.actionNeeded,
			},
		});
		expect(wrapper.find("#pulsating-dot").exists()).toBe(true);
	});
});
