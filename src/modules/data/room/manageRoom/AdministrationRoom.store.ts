import { defineStore } from "pinia";
import { ref } from "vue";

export type Room = {
	id: string;
	name: string;
	owner: string | undefined;
	mainSchool: string;
	creationDate: string;
	totalMembers: number;
	internalMembers: number;
	externalMembers: number;
};

export const useAdministrationRoomStore = defineStore(
	"administrationRoomStore",
	() => {
		const mockRoomsData: Room[] = [
			{
				id: "64b8f9c1e1a2f1a2b3c4d5e6",
				name: "Physics Lab",
				owner: "Dr. Smith",
				mainSchool: "Science Academy",
				creationDate: "2023-01-15",
				totalMembers: 50,
				internalMembers: 30,
				externalMembers: 20,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5e7",
				name: "Art Studio",
				owner: "Ms. Johnson",
				mainSchool: "Creative Arts School",
				creationDate: "2022-11-10",
				totalMembers: 25,
				internalMembers: 20,
				externalMembers: 5,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5e8",
				name: "Math Workshop",
				owner: undefined,
				mainSchool: "Mathematics Institute",
				creationDate: "2023-03-05",
				totalMembers: 40,
				internalMembers: 35,
				externalMembers: 5,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5e9",
				name: "History Hall",
				owner: "Dr. Brown",
				mainSchool: "Paul-Gerhardt-Gymnasium",
				creationDate: "2022-09-20",
				totalMembers: 30,
				internalMembers: 25,
				externalMembers: 5,
			},
		];

		const isLoading = ref(true);
		const roomList = ref<Room[]>([]);
		const selectedIds = ref<string[]>([]);

		const userMainSchool = "Paul-Gerhardt-Gymnasium";

		const sortList = (list: Room[]) => {
			return list
				.sort((a, b) => {
					return a.mainSchool.localeCompare(b.mainSchool);
				})
				.sort((a, b) => {
					return a.mainSchool === userMainSchool
						? -1
						: b.mainSchool === userMainSchool
							? 1
							: 0;
				})
				.sort((a, b) => {
					return a.owner === undefined ? -1 : b.owner === undefined ? 1 : 0;
				});
		};

		const fetchRooms = async () => {
			try {
				isLoading.value = true;
				const response = await new Promise<Room[]>((resolve) =>
					setTimeout(() => {
						resolve(sortList(mockRoomsData));
					}, 100)
				);
				roomList.value = response;
			} catch {
				// Handle error
			} finally {
				isLoading.value = false;
			}
		};

		return {
			isLoading,
			roomList,
			selectedIds,
			fetchRooms,
		};
	}
);
