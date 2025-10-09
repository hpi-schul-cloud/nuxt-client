import mergeDeep from "@/utils/merge-deep";
import serviceTemplate from "@/utils/service-template";

const base = serviceTemplate("courses");

const coursesModule = mergeDeep(base, {
	getters: {
		getCoursesOptions: (state) =>
			state.list
				.filter((course) => course.isArchived === false)
				.map((course) => ({
					_id: course._id,
					name: course.name,
				})),
	},
});

export default coursesModule;
