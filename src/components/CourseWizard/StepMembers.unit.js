import StepMembers from "./StepMembers";

describe("@components/StepMembers", () => {
	it(...isValidComponent(StepMembers));
	it("Check with required only and defaults", () => {
		const mockCourse = {
			name: "1",
			description: "2",
			startDate: "",
			untilDate: "",
			times: [],
			teachers: ["test"],
			students: {
				_id: "idId",
			},
			classes: [
				{
					label: "test",
					value: "idid",
				},
				{
					label: "test2",
					value: "id2",
				},
			],
		};
		const wrapper = shallowMount(StepMembers, {
			propsData: {
				course: mockCourse,
			},
		});
		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findAll("base-select-stub").length).toBe(2);
	});

	it("Check that everthing is rendered when givin enogh data", () => {
		const mockCourse = {
			name: "1",
			description: "2",
			startDate: "",
			untilDate: "",
			times: [],
			teachers: ["test"],
			students: {
				_id: "idId",
			},
			classes: [
				{
					label: "test",
					value: "idid",
				},
				{
					label: "test2",
					value: "id2",
				},
			],
		};
		const wrapper = shallowMount(StepMembers, {
			propsData: {
				course: mockCourse,
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
		expect(wrapper.find("p").exists()).toBe(true);
		expect(wrapper.findAll("base-select-stub").length).toBe(2);
	});
});
