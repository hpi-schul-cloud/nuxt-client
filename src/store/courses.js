import { notifierModule } from "@/store";
import mergeDeep from "@/utils/merge-deep";
import serviceTemplate from "@/utils/service-template";

const base = serviceTemplate("courses");

const coursesModule = mergeDeep(base, {
	actions: {
		async removeCourseItem({ dispatch }, courseItem) {
			let successDeleteNotification;
			let unsuccesfullDeleteNotification;
			try {
				if (courseItem.type === "homework") {
					await dispatch("homeworks/remove", courseItem.id, { root: true });
					successDeleteNotification = this.app.i18n.t("pages.courses._id.homework.deleteSuccess");
					unsuccesfullDeleteNotification = this.app.i18n.t("pages.courses._id.homework.deleteError");
				} else {
					await dispatch("lessons/remove", courseItem.id, { root: true });
					successDeleteNotification = this.app.i18n.t("pages.courses._id.editorDocument.deleteSuccess");
					unsuccesfullDeleteNotification = this.app.i18n.t("pages.courses._id.editorDocument.deleteError");
				}
				notifierModule.show({
					text: successDeleteNotification,
					status: "success",
					timeout: 5000,
				});
			} catch {
				notifierModule.show({
					text: unsuccesfullDeleteNotification,
					status: "error",
					timeout: 5000,
				});
			}
		},
	},
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
