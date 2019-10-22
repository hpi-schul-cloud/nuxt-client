import InsightsCharts from "./InsightsCharts";

const testData = {
	activityByRole: { teachers: 31, students: 11 },
	weeklyActivity: {
		Monday: "1",
		Tuesday: "2",
		Wednesday: "8",
		Thursday: "35",
		Friday: "6",
		Saturday: "1",
		Sunday: "3",
	},
	weeklyActiveUsers: {
		teachers: { inactive: 0, active: null },
		students: { inactive: 0, active: null },
	},
	uniquePageCount: {
		"09/19/2019": { student: null, teacher: "1" },
		"09/22/2019": { student: null, teacher: "1" },
		"09/23/2019": { student: null, teacher: "1" },
		"09/24/2019": { student: null, teacher: "1" },
		"09/25/2019": { student: null, teacher: "1" },
		"09/27/2019": { student: null, teacher: "1" },
		"09/28/2019": { student: null, teacher: "2" },
		"09/29/2019": { student: null, teacher: "5" },
		"09/30/2019": { student: "7", teacher: "4" },
		"10/01/2019": { student: null, teacher: "2" },
	},
	avgPageLoaded: [
		{ "8:00 AM": 596.5 },
		{ "11:00 AM": 700.5 },
		{ "1:00 PM": 320.5 },
		{ "3:00 PM": 600.5 },
		{ "7:00 PM": 420.5 },
	],
	avgInteractTime: [
		{ "1:00 PM": 320.5 },
		{ "11:00 AM": 700.5 },
		{ "8:00 AM": 596.5 },
		{ "7:00 PM": 420.5 },
		{ "3:00 PM": 600.5 },
	],
};

describe("@components/InsightsCharts", () => {

	it(...isValidComponent(InsightsCharts));

	it("renders data prop if it exists", () => {
		const wrapper = mount(InsightsCharts, {
			propsData: {
				data: testData,
			},
		});
		expect(wrapper.props("data")).toBe(testData);
	});
});
