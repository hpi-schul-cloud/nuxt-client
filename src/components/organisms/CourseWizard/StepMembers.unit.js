import StepMembers from "./StepMembers";

const checkRendering = (wrapper) => {
	expect(wrapper.find("p").exists()).toBe(true);
	expect(wrapper.findAll("base-select-stub")).toHaveLength(2);
};

const getMockCourse = () => ({
	name: "1",
	description: "2",
	startDate: "",
	untilDate: "",
	times: [],
	teachersIds: ["test"],
	userIds: ["idId"],
	classIds: ["idid", "id2"],
});

describe("@components/StepMembers", () => {
	it(...isValidComponent(StepMembers));
	it("Check with required only and defaults", () => {
		const wrapper = shallowMount(StepMembers, {
			propsData: {
				course: getMockCourse(),
			},
		});
		checkRendering(wrapper);
	});

	it("Check that everthing is rendered when given enough data", () => {
		const wrapper = shallowMount(StepMembers, {
			propsData: {
				course: getMockCourse(),
				availableClasses: [
					{
						_id: "idid",
						displayName: "test",
					},
					{
						_id: "id2",
						displayName: "test2",
					},
				],
				availableStudents: [
					{
						_id: "id3",
						firstName: "max",
						lastName: "mustermann",
					},
				],
			},
		});
		checkRendering(wrapper);
	});
});
