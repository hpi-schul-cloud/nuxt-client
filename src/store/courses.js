import mergeDeep from "@/utils/merge-deep";
import serviceTemplate from "@/utils/service-template";

const base = serviceTemplate("courses");

const coursesModule = mergeDeep(base, {
	getters: {
		getCoursesOptions: (state) => {
			return state.list
				.filter((course) => course.isArchived === false)
				.map((course) => {
					return {
						_id: course._id,
						name: course.name,
					};
				});
		},
	},
});

export default coursesModule;
