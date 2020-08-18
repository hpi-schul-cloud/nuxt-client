import Messenger from "./Messenger";

const session = {
	homeserverUrl: "https://matrix.domain",
	userId: "@user:matrix.domain",
	accessToken: "aaabbbccc",
	deviceId: "AAABBBCCC",
};
const school = {
	features: ["messenger"],
};
const mockStores = {
	messenger: {
		actions: {
			getMessengerToken() {
				return Promise.resolve(session);
			},
		},
	},
	schools: {
		actions: {
			find() {
				return Promise.resolve({
					data: [school],
				});
			},
		},
	},
};

describe("@components/organism/Messenger", () => {
	beforeEach(() => {
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED = undefined;
		window.localStorage.clear();
		window.Matrix = undefined;
		school.features = ["messenger"];
	});

	it(...isValidComponent(Messenger));

	it("do not initialize if feature is not set", () => {
		mount(Messenger);
		expect(window.Matrix).toBeUndefined();
	});

	it("do not initialize if feature is not enabled for instance", () => {
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED = "false";
		mount(Messenger);
		expect(window.Matrix).toBeUndefined();
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED = undefined;
	});

	it("do not initialize if feature is not enabled for school", async () => {
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED = "true";
		school.features = [];

		mount(Messenger, {
			...createComponentMocks({ i18n: true, user: true, store: mockStores }),
		});
		await wait(1000);
		expect(window.Matrix).toBeUndefined();
	});

	it("init messenger from localStorage", async () => {
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED = "true";
		window.localStorage.setItem("mx_hs_url", "domain");
		window.localStorage.setItem("mx_access_token", "token");
		window.localStorage.setItem("mx_user_id", "user_id");

		mount(Messenger, {
			...createComponentMocks({ i18n: true, user: true, store: mockStores }),
		});
		await wait(1000);
		expect(window.Matrix).toBeDefined();
		expect(window.Matrix).toHaveLength(1);
	});

	it("init messenger from api", async () => {
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED = "true";

		mount(Messenger, {
			...createComponentMocks({ i18n: true, user: true, store: mockStores }),
		});
		await wait(1000);
		expect(window.Matrix).toBeDefined();
		expect(window.Matrix).toHaveLength(1);
	});

	it("extract current room from url", async () => {
		process.env.FEATURE_MATRIX_MESSENGER_ENABLED = "true";
		window.location.pathname = "/teams/aaaabbbbccccddddeeeeffff";

		mount(Messenger, {
			...createComponentMocks({ i18n: true, user: true, store: mockStores }),
		});
		await wait(1000);
		expect(window.Matrix).toBeDefined();
		expect(window.Matrix).toHaveLength(1);
		expect(window.Matrix[0][1].roomId).toBe(
			"#team_aaaabbbbccccddddeeeeffff:matrix.domain"
		);
	});
});
