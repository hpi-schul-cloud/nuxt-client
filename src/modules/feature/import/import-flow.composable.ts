import { StepType } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { $axios } from "@/utils/api";
import { CoursesApiFactory, RoomApiFactory, ShareTokenApiFactory, ShareTokenInfoResponseParentType } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { logger } from "@util-logger";
import { sortBy } from "lodash-es";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export type DestinationType = "course" | "room";
export type DestinationItem = { id: string; name: string };

export const useImportFlow = () => {
	const activeStep = ref<StepType>(null);
	const isDialogOpen = computed(() => activeStep.value !== null);

	// Each step's data collector
	const selectDestinationStep = useAwaitableAction<{ destinationId: string }>();
	const importStep = useAwaitableAction<{ newName: string }>();
	const importCardStep = useAwaitableAction<{ destinationId: string }>();

	// Override start to set activeStep
	const startStep = <T>(step: StepType, action: ReturnType<typeof useAwaitableAction<T>>) => {
		activeStep.value = step;
		return action.start().finally(() => {
			activeStep.value = null;
		});
	};

	const importItemType = ref<ShareTokenInfoResponseParentType>(ShareTokenInfoResponseParentType.COLUMN_BOARD);
	// const destinations = ref<{ id: string; name: string }[]>([]);

	const shareApi = ShareTokenApiFactory(undefined, "/v3", $axios);
	const coursesApi = CoursesApiFactory(undefined, "/v3", $axios);
	const roomApi = RoomApiFactory(undefined, "/v3", $axios);
	const lookupShareTokenCall = useSafeAxiosTask();
	const importShareTokenCall = useSafeAxiosTask();
	const fetchCoursesCall = useSafeAxiosTask();
	const fetchRoomsCall = useSafeAxiosTask();

	const PLURAL_COUNT = 2;
	const { t } = useI18n();
	const { withLoadingState } = useLoadingStore();

	const withImportLoading = <T>(fn: () => Promise<T>) =>
		withLoadingState(fn, t("components.molecules.import.options.loadingMessage"));

	const executeImportCourse = async (token: string) => {
		const userInput = await startStep("import", importStep);
		if (!userInput) return;

		const { result, success } = await withImportLoading(() =>
			importShareTokenCall.execute(
				() => shareApi.shareTokenControllerImportShareToken(token, { newName: userInput.newName }),
				t("common.notifications.errors.notImported", { type: t("common.labels.course") })
			)
		);

		if (success && result?.data.id !== undefined) {
			notifySuccess(
				t("components.molecules.import.options.success", {
					name: userInput.newName,
				})
			);
			const sanitizedId = result.data.id.replace(/[^a-z\d]/g, "");
			return sanitizedId;
		}
	};

	// const executeImport = async (token: string, destinationType?: DestinationType) => {
	const executeImport = async (token: string) => {
		await validateShareToken(token);

		if (!importItemType.value) {
			logger.error("Failed to validate share token");
			return { cancelled: true };
		}

		if (
			importItemType.value === ShareTokenInfoResponseParentType.COURSES ||
			importItemType.value === ShareTokenInfoResponseParentType.ROOM
		) {
			const data = await startStep("import", importStep);
			if (!data) return { cancelled: true };
			logger.log(`Importing ${importItemType.value} with new name: ${data.newName}`);
		} else if (importItemType.value === ShareTokenInfoResponseParentType.CARD) {
			const data = await startStep("importCard", importCardStep);
			if (!data) return { cancelled: true };
			logger.log("Selected card destination ID:", data.destinationId);
		} else {
			const destinatonData = await startStep("selectDestination", selectDestinationStep);
			if (!destinatonData) return { cancelled: true };
			logger.log("Selected destination ID:", destinatonData.destinationId);

			const importData = await startStep("import", importStep);
			if (!importData) return { cancelled: true };
			logger.log(`Importing ${importItemType.value} with new name: ${importData.newName}`);
		}
	};

	const validateShareToken = async (token: string) => {
		const { result, success } = await lookupShareTokenCall.execute(() =>
			shareApi.shareTokenControllerLookupShareToken(token)
		);

		if (success) {
			importItemType.value = result.data.parentType;
			return result.data.parentType;
		}
	};

	const fetchCourseDestinations = async () => {
		const { result, error, success } = await fetchCoursesCall.execute(() =>
			coursesApi.courseControllerFindForUser(0, 100)
		);

		let destinations: DestinationItem[] | undefined;
		if (success && result?.data) {
			destinations = sortBy(
				result.data.data.filter((course) => !course.isLocked).map((course) => ({ id: course.id, name: course.title }))
			);
		}

		return { result, destinations, error, success };
	};

	const fetchRoomDestinations = async () => {
		const { result, error, success } = await fetchRoomsCall.execute(
			roomApi.roomControllerGetRooms,
			t("common.notifications.errors.notLoaded", { type: t("common.labels.room", PLURAL_COUNT) }, PLURAL_COUNT)
		);

		let destinations: DestinationItem[] | undefined;
		if (success && result?.data) {
			destinations = sortBy(
				result.data.data
					.filter((room) => !room.isLocked && room.allowedOperations?.editContent)
					.map((room) => ({ id: room.id, name: room.name }))
			);
		}

		return { result, destinations, error, success };
	};

	const onCancel = () => {
		selectDestinationStep.cancel();
		importStep.cancel();
		importCardStep.cancel();
	};

	return {
		isDialogOpen,
		activeStep,
		importItemType,
		selectDestinationStep,
		importStep,
		importCardStep,
		executeImportCourse,
		executeImport,
		onCancel,
		validateShareToken,
		fetchCourseDestinations,
		fetchRoomDestinations,
	};
};
