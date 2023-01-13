import AccountsModule from "@/store/accounts";
import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import ContentModule from "@/store/content";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import CollaborativeFilesModule from "@store/collaborative-files";
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
import TaskCardModule from "@/store/task-card";
import { onGlobalSetup, provide, useContext } from "@nuxtjs/composition-api";
import LoadingStateModule from "@store/loading-state";
import ShareCourseModule from "@store/share-course";
import { getModule } from "vuex-module-decorators";
import ExternalToolsModule from "@store/external-tools";

export default () => {
	onGlobalSetup(() => {
		const { store } = useContext();

		provide("accountsModule", getModule(AccountsModule, store));
		provide("applicationErrorModule", getModule(ApplicationErrorModule, store));
		provide("authModule", getModule(AuthModule, store));
		provide("autoLogoutModule", getModule(AutoLogoutModule, store));
		provide(
			"collaborativeFilesModule",
			getModule(CollaborativeFilesModule, store)
		);
		provide("contentModule", getModule(ContentModule, store));
		provide("copyModule", getModule(CopyModule, store));
		provide("envConfigModule", getModule(EnvConfigModule, store));
		provide("externalToolsModule", getModule(ExternalToolsModule, store));
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
		provide("taskCardModule", getModule(TaskCardModule, store));
	});
};
