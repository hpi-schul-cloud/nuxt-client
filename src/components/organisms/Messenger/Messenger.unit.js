import Messenger from "./Messenger";
import { extractRoomTypeAndIdFromPath } from "./Messenger";

const session = {
	homeserverUrl: "https://matrix.domain",
	userId: "@user:matrix.domain",
	accessToken: "aaabbbccc",
	deviceId: "AAABBBCCC",
};
const mockStores = {
	messenger: {
		actions: {
			loadMessengerToken() {
				return;
			},
		},
		state: () => ({
			matrixFeatureFlag: true,
			matrixAssetDomain: "https://matrix.domain",
			session,
			serverName: "dummy-server-name",
		}),
	},
	auth: {
		state: () => ({
			school: { features: ["messenger"] },
		}),
	},
};

describe("@components/organism/Messenger", () => {
	beforeEach(() => {
		window.localStorage.clear();
		window.Matrix = undefined;
	});
	afterEach(() => {
		window.localStorage.clear();
		window.Matrix = undefined;
	});

	it(...isValidComponent(Messenger));

	it("do not initialize if feature is not set", async () => {
		const mockStoresTestSpecific = { ...mockStores };
		mockStoresTestSpecific.messenger = {
			state: () => ({}),
		};

		mount(Messenger, {
			...createComponentMocks({ i18n: true, store: mockStoresTestSpecific }),
		});

		expect(window.Matrix).toBeUndefined();
	});

	it("do not initialize if feature is not enabled for instance", async () => {
		const mockStoresTestSpecific = { ...mockStores };
		mockStoresTestSpecific.messenger = {
			state: () => ({
				matrixFeatureFlag: false,
			}),
		};

		mount(Messenger, {
			...createComponentMocks({ i18n: true, store: mockStoresTestSpecific }),
		});

		expect(window.Matrix).toBeUndefined();
	});

	it("do not initialize if feature is not enabled for school", async () => {
		const mockStoresTestSpecific = { ...mockStores };
		mockStoresTestSpecific.auth = {
			state: () => ({
				school: { features: [] },
			}),
		};

		mount(Messenger, {
			...createComponentMocks({
				i18n: true,
				store: mockStoresTestSpecific,
			}),
		});
		expect(window.Matrix).toBeUndefined();
	});

	it("init messenger from localStorage", async () => {
		window.localStorage.setItem("mx_hs_url", "domain");
		window.localStorage.setItem("mx_access_token", "token");
		window.localStorage.setItem("mx_user_id", "user_id");

		const mockStoresTestSpecific = { ...mockStores };
		mockStoresTestSpecific.messenger = {
			actions: {
				loadMessengerToken() {
					return;
				},
			},
			state: () => ({
				session,
				matrixFeatureFlag: true,
				matrixAssetDomain: "https://matrix.domain",
				serverName: "dummy-server-name",
				sessionFromLocalStorage: "true",
			}),
		};
		mount(Messenger, {
			...createComponentMocks({
				i18n: true,
				store: mockStoresTestSpecific,
			}),
		});

		expect(window.Matrix).toBeDefined();
		expect(window.Matrix).toHaveLength(1);

		window.localStorage.removeItem("mx_hs_url");
		window.localStorage.removeItem("mx_access_token");
		window.localStorage.removeItem("mx_user_id");
	});

	it("init messenger from api", async () => {
		mount(Messenger, {
			...createComponentMocks({ i18n: true, store: mockStores }),
		});

		expect(window.Matrix).toBeDefined();
		expect(window.Matrix).toHaveLength(1);
	});

	it("extract current room from url", async () => {
		window.location.pathname = "/teams/aaaabbbbccccddddeeeeffff";
		mount(Messenger, {
			...createComponentMocks({ i18n: true, store: mockStores }),
		});

		expect(window.Matrix).toBeDefined();
		expect(window.Matrix).toHaveLength(1);
		expect(window.Matrix[0][1].roomId).toBe(
			"#team_aaaabbbbccccddddeeeeffff:dummy-server-name"
		);
	});
});

describe("extractRoomTypeAndIdFromPath", () => {
	it("returns correct room for course", () => {
		const { roomType, roomId } = extractRoomTypeAndIdFromPath(
			"/courses/1234567890abcdef01234567"
		);

		expect(roomType).toBe("course");
		expect(roomId).toBe("1234567890abcdef01234567");
	});
	it("returns correct room for team", () => {
		const { roomType, roomId } = extractRoomTypeAndIdFromPath(
			"/teams/abcdef012345678123456789"
		);

		expect(roomType).toBe("team");
		expect(roomId).toBe("abcdef012345678123456789");
	});
	it("returns null for invalid paths", () => {
		const { roomType, roomId } = extractRoomTypeAndIdFromPath(
			"/admin/user/abcdefghijklmn1234567890"
		);

		expect(roomType).toBeNull();
		expect(roomId).toBeNull();
	});
});
