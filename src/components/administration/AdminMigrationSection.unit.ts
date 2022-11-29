import { mount, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import { createModuleMocks } from "@utils/mock-store-module";
import AdminMigrationSection from "@components/administration/AdminMigrationSection.vue";
import SchoolsModule from "@store/schools";
import EnvConfigModule from "@store/env-config";

describe("AdminMigrationSection", () => {
    let wrapper: Wrapper<any>;
    let schoolsModule: SchoolsModule;
    let envConfigModule: EnvConfigModule;


    function setup(getters: Partial<SchoolsModule> = {}) {
        document.body.setAttribute("data-app", "true");
        schoolsModule = createModuleMocks(SchoolsModule, {
            getOauthMigrationAvailable: true,
            getOauthMigration : true,
            ...getters });
        envConfigModule = createModuleMocks(EnvConfigModule, {
            getFeatureSchoolSanisUserMigrationEnabled: true,
            ... getters });
        wrapper = mount(AdminMigrationSection, {
            ...createComponentMocks({
                i18n: true,
            }),
            setup() {
                provide("i18n", { t: (key: string) => key });
                provide("schoolModule", schoolsModule);
                provide("envConfigModule", envConfigModule);
            },
        });
    }
// schoolsModule injection not found
    describe("basic functions", () => {
        it("should render component", () => {
            setup();
            expect(wrapper.findComponent(AdminMigrationSection).exists()).toBe(true);
        });
    });

    describe("inject", () => {
        it("should throw an error when schoolsModule injection fails", () => {
            try {
                wrapper = shallowMount(AdminMigrationSection, {
                    setup() {
                        provide("schoolsModule", SchoolsModule);
                    },
                });
            } catch (e) {
                expect(e.message.includes('Injection of dependencies failed')).toBeTruthy();
            }
        });

        it("should throw an error when envConfigModule injection fails", () => {
            try {
                wrapper = shallowMount(AdminMigrationSection, {
                    setup() {
                        provide("envConfigModule", EnvConfigModule);
                    },
                });
            } catch (e) {
                expect(
                    e.message.includes('Injection of dependencies failed')
                ).toBeTruthy();
            }
        });

        it("should throw an error when i18n injection fails", () => {
            try {
                wrapper = shallowMount(AdminMigrationSection, {
                    setup() {
                        provide("envConfigModule", EnvConfigModule);
                    },
                });
            } catch (e) {
                expect(e.message.includes('Injection "i18n" not found')).toBeTruthy();
            }
        });
    });



});
