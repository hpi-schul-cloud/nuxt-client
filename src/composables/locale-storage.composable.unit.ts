import { useStorage } from "@/composables/locale-storage.composable";

describe("locale-storage composable", () => {
	const { get, getMultiple, remove, set } = useStorage();

	it("should return get, getMultiple, remove and set", async () => {
		expect(get).toBeTruthy();
		expect(getMultiple).toBeTruthy();
		expect(remove).toBeTruthy();
		expect(set).toBeTruthy();
		expect(typeof get).toBe("function");
		expect(typeof getMultiple).toBe("function");
		expect(typeof remove).toBe("function");
		expect(typeof set).toBe("function");
	});

	it("should set item in local storage", async () => {
		set("key", "value");
		const result = localStorage.getItem("key");
		expect(result).toStrictEqual("value");
	});

	it("should get item from local storage", async () => {
		set("key", "value");
		const result = get("key");
		expect(result).toStrictEqual("value");
	});

	it("should get multiple items from local storage", async () => {
		set("key1", "value1");
		set("key2", "value2");
		const result = getMultiple(["key1", "key2"]);
		expect(result).toStrictEqual(["value1", "value2"]);
	});

	it("should remove item from local storage", async () => {
		set("key", "value");
		remove("key");
		const result = get("key");
		expect(result).toBe(null);
	});
});
