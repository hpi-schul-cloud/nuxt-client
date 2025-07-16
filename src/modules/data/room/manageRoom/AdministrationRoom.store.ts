import { defineStore } from "pinia";
import { ref } from "vue";

export const AdministrationRoomStore = defineStore(
	"administrationRoomStore",
	() => {
		type Room = {
			name: string;
			owner: string;
			mainSchool: string;
			creationDate: string;
			totalMembers: number;
			internalMembers: number;
			externalMembers: number;
		};

		const mockRoomsData: Room[] = [
			{
				name: "Physics Lab",
				owner: "Dr. Smith",
				mainSchool: "Science Academy",
				creationDate: "2023-01-15",
				totalMembers: 50,
				internalMembers: 30,
				externalMembers: 20,
			},
			{
				name: "Art Studio",
				owner: "Ms. Johnson",
				mainSchool: "Creative Arts School",
				creationDate: "2022-11-10",
				totalMembers: 25,
				internalMembers: 20,
				externalMembers: 5,
			},
			{
				name: "Math Workshop",
				owner: "Prof. Lee",
				mainSchool: "Mathematics Institute",
				creationDate: "2023-03-05",
				totalMembers: 40,
				internalMembers: 35,
				externalMembers: 5,
			},
			{
				name: "History Hall",
				owner: "Dr. Brown",
				mainSchool: "Humanities College",
				creationDate: "2022-09-20",
				totalMembers: 30,
				internalMembers: 25,
				externalMembers: 5,
			},
		];

		const isLoading = ref(true);
		const rooms = ref<Room[]>([]);

		const fetchRooms = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 100));
				rooms.value = mockRoomsData;
			} catch {
				// Handle error appropriately
			} finally {
				isLoading.value = false;
			}
		};

		return {
			isLoading,
			rooms,
			fetchRooms,
		};
	}
);
