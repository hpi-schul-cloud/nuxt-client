import AccountsModule from "@/store/accounts";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import ContentModule from "@/store/content";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import FilesPOCModule from "@/store/files-poc";
import FinishedTasksModule from "@/store/finished-tasks";
import ImportUsersModule from "@/store/import-users";
import NewsModule from "@/store/news";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import StatusAlertsModule from "@/store/status-alerts";
import TasksModule from "@/store/tasks";
import TaskModule from "@/store/task";
import { onGlobalSetup, provide, useContext } from "@nuxtjs/composition-api";
import LoadingStateModule from "@store/loading-state";
import ShareCourseModule from "@store/share-course";
import { getModule } from "vuex-module-decorators";

export default () => {
	onGlobalSetup(() => {
		const { store } = useContext();

		provide("accountsModule", getModule(AccountsModule, store));
		provide("authModule", getModule(AuthModule, store));
		provide("autoLogoutModule", getModule(AutoLogoutModule, store));
		provide("contentModule", getModule(ContentModule, store));
		provide("copyModule", getModule(CopyModule, store));
		provide("envConfigModule", getModule(EnvConfigModule, store));
		provide("filePathsModule", getModule(FilePathsModule, store));
		provide("filesPOCModule", getModule(FilesPOCModule, store));
		provide("finishedTasksModule", getModule(FinishedTasksModule, store));
		provide("importUsersModule", getModule(ImportUsersModule, store));
		provide("loadingStateModule", getModule(LoadingStateModule, store));
		provide("newsModule", getModule(NewsModule, store));
		provide("notifierModule", getModule(NotifierModule, store));
		provide("roomModule", getModule(RoomModule, store));
		provide("roomsModule", getModule(RoomsModule, store));
		provide("schoolsModule", getModule(SchoolsModule, store));
		provide("shareCourseModule", getModule(ShareCourseModule, store));
		provide("statusAlertsModule", getModule(StatusAlertsModule, store));
		provide("tasksModule", getModule(TasksModule, store));
		provide("taskModule", getModule(TaskModule, store));
	});
};
