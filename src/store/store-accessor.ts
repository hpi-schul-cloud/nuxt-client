// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/store-accessor.ts

// This is the "store accessor":
// It initializes all the modules using a Vuex plugin (see store/index.ts)
// In here you import all your modules, call getModule on them to turn them
// into the actual stores, and then re-export them.

import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import FilePaths from "@/store/filePaths";
import FinishedTasksModule from "@/store/finished-tasks";
import ImportUsersModule from "@/store/import-users";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import SchoolsModule from "@/store/schools";
import ShareModule from "@/store/share";
import SystemsModule from "@/store/systems";
import TasksModule from "@/store/tasks";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";

// Each store is the singleton instance of its module class
// Use these -- they have methods for state/getters/mutations/actions
// (result from getModule(...))
export let copyModule: CopyModule;
export let filePathsModule: FilePaths;
export let finishedTasksModule: FinishedTasksModule;
export let importUsersModule: ImportUsersModule;
export let courseRoomDetailsModule: CourseRoomDetailsModule;
export let schoolExternalToolsModule: SchoolExternalToolsModule;
export let schoolsModule: SchoolsModule;
export let shareModule: ShareModule;
export let systemsModule: SystemsModule;
export let tasksModule: TasksModule;

// initializer plugin: sets up state/getters/mutations/actions for each store
export function initializeStores(store: Store<unknown>): void {
	copyModule = getModule(CopyModule, store);
	filePathsModule = getModule(FilePaths, store);
	finishedTasksModule = getModule(FinishedTasksModule, store);
	importUsersModule = getModule(ImportUsersModule, store);
	courseRoomDetailsModule = getModule(CourseRoomDetailsModule, store);
	schoolExternalToolsModule = getModule(SchoolExternalToolsModule, store);
	schoolsModule = getModule(SchoolsModule, store);
	shareModule = getModule(ShareModule, store);
	systemsModule = getModule(SystemsModule, store);
	tasksModule = getModule(TasksModule, store);
}

// for use in 'modules' store init (see store/index.ts), so each module
// appears as an element of the root store's state.
// (This is required!)
export const modules = {
	copyModule: CopyModule,
	filePathsModule: FilePaths,
	finishedTasksModule: FinishedTasksModule,
	importUsersModule: ImportUsersModule,
	courseRoomDetailsModule: CourseRoomDetailsModule,
	schoolExternalToolsModule: SchoolExternalToolsModule,
	schoolsModule: SchoolsModule,
	shareModule: ShareModule,
	systemsModule: SystemsModule,
	tasksModule: TasksModule,
};
