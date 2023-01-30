import { defineComponent } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import { useStorage } from "@/composables/locale-storage.composable";

jest.mock("./loadingState");

export interface MountOptions {
    provider?: () => void;
}

const mountComposable = <R>(composable: () => R, options: MountOptions): R => {
    const TestComponent = defineComponent({
        template: `<div></div>`,
    });

    const wrapper = mount(TestComponent, {
        setup() {
            options.provider?.();
            const result = composable();
            return { result };
        },
    });

    //@ts-ignore
    return wrapper.vm.result;
};


describe("locale-storage composable", () => {
    const setup = () => {
        return mountComposable(() => useStorage(), {});
    };

    it("should return get, getMultiple, remove and set", async () => {
        const { get, getMultiple, remove, set } = setup();

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
        const { set } = setup();
        set("key", "value");
        const result = localStorage.getItem("key");
        expect(result).toStrictEqual("value");
    });

    it("should get item from local storage", async () => {
        const { get, set } = setup();
        set("key", "value");
        const result = get("key");
        expect(result).toStrictEqual("value");
    });

    it("should get multiple items from local storage", async () => {
        const { getMultiple, set } = setup();
        set("key1", "value1");
        set("key2", "value2");
        const result = getMultiple(["key1", "key2"]);
        expect(result).toStrictEqual(["value1", "value2"]);
    });

    it("should remove item from local storage", async () => {
        const { get, set, remove } = setup();
        set("key", "value");
        remove("key");
        const result = get("key");
        expect(result).toBe(null);
    });
});
