import Vuex from "vuex";
// import auth from "@/store/auth.js";
import classes from "@store/classes.js";
import contentSearch from "@store/content-search.js";
import courses from "@store/courses.js";
import federalState from "@store/federal-states.js";
import i18n from "@store/i18n";
import news from "@store/news.js";
import publicTeachers from "@store/public-teachers.js";
import roles from "@store/roles.js";
import schools from "@store/schools.js";
import teams from "@store/teams.js";
import users from "@store/users.js";

const createStore = () => {
	return new Vuex.Store({
		namespaced: true,
		modules: {
			// auth: auth,
			classes: classes,
			contentSearch: contentSearch,
			courses: courses,
			federalState: federalState,
			i18n: i18n,
			news: news,
			publicTeachers: publicTeachers,
			roles: roles,
			schools: schools,
			teams: teams,
			users: users,
		},
	});
};

export default createStore;
