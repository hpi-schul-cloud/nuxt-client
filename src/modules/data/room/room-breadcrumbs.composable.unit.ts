import { useRoomBreadcrumbs } from "./room-breadcrumbs.composable";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

describe("useRoomBreadcrumbs", () => {
	const setup = (isRoomArchiveEnabled: boolean) => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({ FEATURE_ROOM_ARCHIVE_ENABLED: isRoomArchiveEnabled });

		return useRoomBreadcrumbs();
	};

	const roomsBreadcrumb = { title: "pages.rooms.title", to: "/rooms" };
	const archivedRoomsBreadcrumb = { title: "pages.rooms.archived.title", to: "/rooms/archive" };

	describe("getRoomsRootBreadcrumbs", () => {
		describe("when the room archive feature is enabled", () => {
			it("should return the rooms and archived rooms breadcrumbs for an archived room", () => {
				const { getRoomsRootBreadcrumbs } = setup(true);

				expect(getRoomsRootBreadcrumbs(true)).toEqual([roomsBreadcrumb, archivedRoomsBreadcrumb]);
			});

			it("should return only the rooms breadcrumb for a not archived room", () => {
				const { getRoomsRootBreadcrumbs } = setup(true);

				expect(getRoomsRootBreadcrumbs(false)).toEqual([roomsBreadcrumb]);
			});

			it("should return only the rooms breadcrumb when the archived state is unknown", () => {
				const { getRoomsRootBreadcrumbs } = setup(true);

				expect(getRoomsRootBreadcrumbs()).toEqual([roomsBreadcrumb]);
			});
		});

		describe("when the room archive feature is disabled", () => {
			it("should return only the rooms breadcrumb for an archived room", () => {
				const { getRoomsRootBreadcrumbs } = setup(false);

				expect(getRoomsRootBreadcrumbs(true)).toEqual([roomsBreadcrumb]);
			});
		});
	});
});
