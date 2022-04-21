import AccountsModule from "@/store/accounts";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import ContentModule from "@/store/content";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import FilesPOCModule from "@/store/files-poc";
import FinishedTaskModule from "@/store/finished-tasks";
import ImportUsersModule from "@/store/import-users";
import NewsModule from "@/store/news";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import TaskModule from "@/store/tasks";
import { onGlobalSetup, provide, useContext } from "@nuxtjs/composition-api";
import { getModule } from "vuex-module-decorators";

export default () => {
	onGlobalSetup(() => {
		const { store } = useContext();

		provide("accountsModule", getModule(AccountsModule, store));
		provide("authModule", getModule(AuthModule, store));
		provide("autoLogoutModule", getModule(AutoLogoutModule, store));
		provide("contentModule", getModule(ContentModule, store));
		provide("envConfigModule", getModule(EnvConfigModule, store));
		provide("filePathsModule", getModule(FilePathsModule, store));
		provide("filesPOCModule", getModule(FilesPOCModule, store));
		provide("finishedTaskModule", getModule(FinishedTaskModule, store));
		provide("importUsersModule", getModule(ImportUsersModule, store));
		provide("newsModule", getModule(NewsModule, store));
		provide("roomModule", getModule(RoomModule, store));
		provide("roomsModule", getModule(RoomsModule, store));
		provide("schoolsModule", getModule(SchoolsModule, store));
		provide("taskModule", getModule(TaskModule, store));
	});
};
