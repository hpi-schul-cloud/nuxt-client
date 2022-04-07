import Vue from "vue";
import Router from "vue-router";

import ActivationCodePage from "./pages/activation/_activationCode";

import AdminLdapActivatePage from "./pages/administration/ldap/activate";
import AdminLdapConfigPage from "./pages/administration/ldap/config";
import AdminMigrationPage from "./pages/administration/migration";
import AdminStudentsPage from "./pages/administration/students";
import AdminStudentsNewPage from "./pages/administration/students/new";
import AdminStudentsConsentPage from "./pages/administration/students/consent";
import AdminTeachersPage from "./pages/administration/teachers";
import AdminTeachersNewPage from "./pages/administration/teachers/new";
import AdminSchoolSettingsPage from "./pages/administration/school-settings";

import ContentPage from "./pages/content";
import ContentDetailsPage from "./pages/content/_id";

import ErrorProxyPage from "./pages/error/proxy";

import InsightsPage from "./pages/insights";

import LoginInstancesPage from "./pages/login-instances";

import MintEcArticlePage from "./pages/mint-ec/_article";

// import NewsPage from "./pages/news";
import NewsDetailsPage from "./pages/news/_id";
import NewsNewPage from "./pages/news/new";
import NewsEditPage from "./pages/news/_id/edit";

import PocFilesPage from "./pages/poc-files";

import RoomsDetailsPage from "./pages/rooms/_id";
import RoomsOverviewPage from "./pages/rooms-overview";
import RoomsListPage from "./pages/rooms-list";

import TasksPage from "./pages/tasks";

import ImprintPage from "./pages/imprint";

import TermsOfUsePage from "./pages/TermsOfUse";

Vue.use(Router);

export function createRouter() {
	return new Router({
		mode: "history",
		routes: [
			{
				path: "/activation/:activationCode([a-z0-9]+)",
				component: ActivationCodePage,
			},
			{
				path: "/administration/ldap/activate",
				component: AdminLdapActivatePage,
			},
			{
				path: "/administration/ldap/config",
				component: AdminLdapConfigPage,
			},
			{
				path: "/administration/migration",
				component: AdminMigrationPage,
			},
			{
				path: "/administration/students",
				component: AdminStudentsPage,
			},
			{
				path: "/administration/students/new",
				component: AdminStudentsNewPage,
			},
			{
				path: "/administration/students/consent",
				component: AdminStudentsConsentPage,
			},
			{
				path: "/administration/teachers",
				component: AdminTeachersPage,
			},
			{
				path: "/administration/teachers/new",
				component: AdminTeachersNewPage,
			},
			{
				path: "/administration/school-settings",
				component: AdminSchoolSettingsPage,
			},
			{
				path: "/administration/school-settings",
				component: AdminSchoolSettingsPage,
			},
			{
				path: "/content",
				component: ContentPage,
			},
			{
				path: "/content/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})",
				component: ContentDetailsPage,
			},
			{
				path: "/error/proxy",
				component: ErrorProxyPage,
			},
			{
				path: "/insights",
				component: InsightsPage,
			},
			{
				path: "/login-instances",
				component: LoginInstancesPage,
			},
			{
				path: "/mint-ec",
				component: MintEcArticlePage,
			},
			// {
			// 	path: "/news",
			// 	component: NewsPage,
			// },
			{
				path: "/news/:id([a-z0-9]{24})",
				component: NewsDetailsPage,
			},
			{
				path: "/news/new",
				component: NewsNewPage,
			},
			{
				path: "/news/:id([a-z0-9]{24})/edit",
				component: NewsEditPage,
			},
			{
				path: "/poc-files",
				component: PocFilesPage,
			},
			{
				path: "/rooms-overview",
				component: RoomsOverviewPage,
			},
			{
				path: "/rooms-list",
				component: RoomsListPage,
			},
			{
				path: "/rooms/:id([a-z0-9]{24})",
				component: RoomsDetailsPage,
			},
			{
				path: "/tasks",
				component: TasksPage,
			},
			{
				path: "/imprint",
				component: ImprintPage,
			},
			{
				path: "/termsofuse",
				component: TermsOfUsePage,
			},
		],
	});
}
