import { defineStore } from "pinia";
import { ref } from "vue";
import { AdminRoom } from "../roomMembers/types";

export const useAdministrationRoomStore = defineStore(
	"administrationRoomStore",
	() => {
		const mockRoomsData: AdminRoom[] = [
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
				owner: undefined,
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
			{
				id: "64b8f9c1e1a2f1a2b3c4d5ea",
				name: "Chemistry Lab",
				owner: "Dr. Green",
				mainSchool: "Science Academy",
				creationDate: "2023-02-10",
				totalMembers: 45,
				internalMembers: 30,
				externalMembers: 15,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5eb",
				name: "Music Room",
				owner: undefined,
				mainSchool: "Creative Arts School",
				creationDate: "2022-12-05",
				totalMembers: 20,
				internalMembers: 15,
				externalMembers: 5,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5ec",
				name: "Computer Lab",
				owner: "Ms. Johnson",
				mainSchool: "Technology Institute",
				creationDate: "2023-04-01",
				totalMembers: 35,
				internalMembers: 25,
				externalMembers: 10,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5ed",
				name: "Biology Lab",
				owner: "Dr. White",
				mainSchool: "Science Academy",
				creationDate: "2023-01-20",
				totalMembers: 40,
				internalMembers: 28,
				externalMembers: 12,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5ee",
				name: "Drama Hall",
				owner: undefined,
				mainSchool: "Creative Arts School",
				creationDate: "2022-10-15",
				totalMembers: 30,
				internalMembers: 20,
				externalMembers: 10,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5ef",
				name: "Astronomy Room",
				owner: "Dr. Black",
				mainSchool: "Science Academy",
				creationDate: "2023-03-25",
				totalMembers: 25,
				internalMembers: 18,
				externalMembers: 7,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5f0",
				name: "Literature Room",
				owner: "Ms. Adams",
				mainSchool: "Paul-Gerhardt-Gymnasium",
				creationDate: "2022-08-30",
				totalMembers: 30,
				internalMembers: 22,
				externalMembers: 8,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5f1",
				name: "Geography Room",
				owner: undefined,
				mainSchool: "Mathematics Institute",
				creationDate: "2023-02-15",
				totalMembers: 20,
				internalMembers: 18,
				externalMembers: 2,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5f2",
				name: "Philosophy Room",
				owner: "Dr. Grey",
				mainSchool: "Paul-Gerhardt-Gymnasium",
				creationDate: "2022-07-10",
				totalMembers: 15,
				internalMembers: 12,
				externalMembers: 3,
			},
			{
				id: "64b8f9c1e1a2f1a2b3c4d5f3",
				name: "Economics Room",
				owner: "Ms. Taylor",
				mainSchool: "Mathematics Institute",
				creationDate: "2023-05-01",
				totalMembers: 50,
				internalMembers: 40,
				externalMembers: 10,
			},
		];

		const isLoading = ref(true);
		const roomList = ref<AdminRoom[]>([]);
		const selectedIds = ref<string[]>([]);
		const isEmptyList = ref(false);

		const userMainSchool = "Paul-Gerhardt-Gymnasium";

		const sortList = (list: AdminRoom[]) => {
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
			// roomList.value = [];
			// isEmptyList.value = roomList.value.length === 0;
			try {
				isLoading.value = true;
				const response = await new Promise<AdminRoom[]>((resolve) =>
					setTimeout(() => {
						resolve(sortList(mockRoomsData));
					}, 100)
				);
				roomList.value = response;

				isEmptyList.value = roomList.value.length === 0;
			} catch {
				// Handle error
			} finally {
				isLoading.value = false;
			}
		};

		return {
			isLoading,
			isEmptyList,
			roomList,
			selectedIds,
			fetchRooms,
		};
	}
);
