import { useShareBoardLink } from "./shareBoardLink.composable";
import { expectNotification, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { BoardMenuScope } from "@ui-board";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("useShareBoardLink", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const getComposable = () => {
		const composable = mountComposable(() => useShareBoardLink(), {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		return {
			composable,
		};
	};

	describe("getShareLinkId", () => {
		describe("when nodeId is '123' and scope is 'card'", () => {
			it("should return the id", () => {
				const { composable } = getComposable();

				const result = composable.getShareLinkId("123", BoardMenuScope.CARD);

				expect(result).toBe(`${BoardMenuScope.CARD}-123`);
			});
		});
	});

	describe("copyShareLink", () => {
		const setup = () => {
			const { composable } = getComposable();

			const pathname = "/board/111";
			const origin = "https://example.com";
			const clipboardMock = createMock<Clipboard>();

			Object.assign(navigator, { clipboard: clipboardMock });
			Object.defineProperty(window, "location", {
				configurable: true,
				value: {
					pathname,
					origin,
				},
			});

			return {
				composable,
				clipboardMock,
				pathname,
				origin,
			};
		};

		describe("when the link is copied", () => {
			it("should save the link to clipboard", async () => {
				const { composable, clipboardMock, pathname, origin } = setup();

				await composable.copyShareLink("123", BoardMenuScope.CARD);

				expect(clipboardMock.writeText).toHaveBeenCalledWith(`${origin}${pathname}#card-123`);
			});

			it("should show a success message", async () => {
				const { composable, clipboardMock } = setup();
				clipboardMock.writeText.mockResolvedValueOnce(undefined);

				await composable.copyShareLink("123", BoardMenuScope.CARD);

				expectNotification("success");
			});
		});

		describe("when the link has failed to be copied", () => {
			it("should show a failure message", async () => {
				const { composable, clipboardMock } = setup();
				clipboardMock.writeText.mockRejectedValueOnce(undefined);

				await composable.copyShareLink("123", BoardMenuScope.CARD);

				expectNotification("error");
			});
		});
	});
});
