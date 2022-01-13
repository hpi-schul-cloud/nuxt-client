import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";

import { RoomData } from "./types/room";

const roomData = {
	roomId: "123",
	title: "Sample Course",
	displayColor: "black",
	elements: [
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce1d381297026d02cdc4b",
				name: "Private Aufgabe von Marla - mit Kurs, offen",
				createdAt: "2017-09-28T11:49:39.924Z",
				updatedAt: "2017-09-28T11:49:39.924Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: false,
					isSubstitutionTeacher: false,
				},
				availableDate: "2017-09-20T11:00:00.000Z",
				duedate: "2300-09-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce4c3c6abf042248e888e",
				name: "Private Aufgabe von Cord - mit Kurs, offen",
				createdAt: "2017-09-28T12:02:11.432Z",
				updatedAt: "2017-09-28T12:02:11.432Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				duedate: "2300-06-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "",
				id: "59cce4ebc6abf042248e888f",
				name: "Private Aufgabe Cord - ohne Kurs",
				createdAt: "2017-09-28T12:02:51.562Z",
				updatedAt: "2017-09-28T12:02:51.562Z",
				status: {
					submitted: 0,
					maxSubmissions: 0,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2017-09-28T12:02:51.553Z",
				duedate: "2026-09-28T12:02:51.553Z",
				displayColor: "#ACACAC",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce352c6abf042248e888c",
				name: "zu archivierende Aufgabe von Marla",
				createdAt: "2017-09-28T11:56:02.897Z",
				updatedAt: "2017-09-28T11:56:02.897Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2017-09-28T12:00:00.000Z",
				duedate: "2020-09-29T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
		{
			type: "task",
			content: {
				courseName: "Mathe",
				id: "59cce2c61113d1132c98dc06",
				name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
				createdAt: "2017-09-28T11:49:39.924Z",
				updatedAt: "2017-09-28T11:49:39.924Z",
				status: {
					submitted: 0,
					maxSubmissions: 2,
					graded: 0,
					isDraft: true,
					isSubstitutionTeacher: false,
				},
				availableDate: "2016-09-20T11:00:00.000Z",
				duedate: "2017-07-28T13:00:00.000Z",
				displayColor: "#54616e",
				description: "",
			},
		},
	],
};

@Module({
	name: "room",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Room extends VuexModule {
	roomData: RoomData = {
		roomId: "",
		title: "",
		displayColor: "",
		elements: [{ type: "", content: {} }],
	};
	loading: boolean = false;
	error: null | {} = null;

	@Action
	async fetchTasks(id: string): Promise<void> {
		this.setLoading(true);
		console.log(id);
		try {
			this.setRoomData(roomData as any);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Mutation
	setRoomData(payload: RoomData): void {
		this.roomData = payload;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: {}): void {
		this.error = error;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): {} | null {
		return this.error;
	}

	get getRoomData(): RoomData {
		return this.roomData;
	}
}

export default getModule(Room);
