import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import { AccountsModule } from "@/store/accounts";
import { Auth } from "@/store/auth";
import { AutoLogoutModule } from "@/store/autoLogout";
import { Content } from "@/store/content";
import { EnvConfig } from "@/store/env-config";
import { FilePaths } from "@/store/filePaths";
import { FilesPOCModule } from "@/store/files-poc";
import { FinishedTaskModule } from "@/store/finished-tasks";
import { ImportUsersModule } from "@/store/import-users";
import { NewsModule } from "@/store/news";
import { Room } from "@/store/room";
import { Rooms } from "@/store/rooms";
import { Schools } from "@/store/schools";
import { TaskModule } from "@store/tasks";

let accountsModule: AccountsModule;
let authModule: Auth;
let autoLogoutModule: AutoLogoutModule;
let contentModule: Content;
let envConfigModule: EnvConfig;
let filePathsModule: FilePaths;
let filesPOCModule: FilesPOCModule;
let finishedTaskModule: FinishedTaskModule;
let importUsersModule: ImportUsersModule;
let newsModule: NewsModule;
let roomModule: Room;
let roomsModule: Rooms;
let taskModule: TaskModule;
let schoolsModule: Schools;

function initialiseStores(store: Store<any>): void {
	console.dir(store);

	accountsModule = getModule(AccountsModule, store);
	authModule = getModule(Auth, store);
	autoLogoutModule = getModule(AutoLogoutModule, store);
	contentModule = getModule(Content, store);
	envConfigModule = getModule(EnvConfig, store);
	filePathsModule = getModule(FilePaths, store);
	filesPOCModule = getModule(FilesPOCModule, store);
	finishedTaskModule = getModule(FinishedTaskModule, store);
	importUsersModule = getModule(ImportUsersModule, store);
	newsModule = getModule(NewsModule, store);
	roomModule = getModule(Room, store);
	roomsModule = getModule(Rooms, store);
	schoolsModule = getModule(Schools, store);
	taskModule = getModule(TaskModule, store);
}

export {
	initialiseStores,
	accountsModule,
	authModule,
	autoLogoutModule,
	contentModule,
	envConfigModule,
	filePathsModule,
	filesPOCModule,
	finishedTaskModule,
	importUsersModule,
	newsModule,
	roomModule,
	roomsModule,
	schoolsModule,
	taskModule,
};
