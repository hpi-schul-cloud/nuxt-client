import { useEditMode, useSharedEditMode } from "./EditMode.composable";
import { ref } from "vue";

const cardMock = ref({
	id: "testId",
	height: 175,
	elements: [],
	visibility: {
		publishedAt: "26.04.2023",
	},
	title: "test title",
});

const { isEditMode, startEditMode, stopEditMode } = useEditMode(cardMock);

describe("EditMode.composable", () => {
	beforeEach(() => {
		stopEditMode();
	});

	it("should set edit mode", () => {
		expect(isEditMode.value).toBe(false);
		startEditMode();
		expect(isEditMode.value).toBe(true);
		stopEditMode();
		expect(isEditMode.value).toBe(false);
	});
});
