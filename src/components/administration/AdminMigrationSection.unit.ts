import {mount, shallowMount, Wrapper} from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import { createModuleMocks } from "@utils/mock-store-module";
import AdminMigrationSection from "@components/administration/AdminMigrationSection.vue";
import SchoolsModule from "@store/schools";
import VueI18n from "vue-i18n";

describe("AdminMigrationSection", () => {
    let schoolsModule: jest.Mocked<SchoolsModule>;

    const setup = (schoolGetters: Partial<SchoolsModule> = {}) => {
        document.body.setAttribute("data-app", "true");
        schoolsModule = createModuleMocks(SchoolsModule, {
            getOauthMigration: {
                enableMigrationStart: false,
                oauthMigrationPossible: false,
                oauthMigrationMandatory: false,
                oauthMigrationFinished: "",
            },
            ...schoolGetters
        }) as jest.Mocked<SchoolsModule>;

        const wrapper: Wrapper<any> = mount(AdminMigrationSection, {
            ...createComponentMocks({
                i18n: true,
            }),
            setup() {
                provide("i18n", { t: (key: string) => key });
                provide("schoolsModule", schoolsModule);
                },
        });

        return {
            wrapper
        }
    };

    describe("basic functions", () => {
        it("should render component", () => {
            const { wrapper } = setup();
            expect(wrapper.findComponent(AdminMigrationSection).exists()).toBe(true);
        });
    });

    describe("inject", () => {
        it("should throw an error when schoolsModule injection fails", () => {
            try {
                shallowMount(AdminMigrationSection, {
                    setup() {
                        provide("i18n", VueI18n);
                    },
                });
            } catch (e) {
                expect(e.message.includes('Injection "schoolsModule" not found')).toBeTruthy();
            }
        });

        it("should throw an error when i18n injection fails", () => {
            try {
                shallowMount(AdminMigrationSection, {
                    setup() {
                        provide("schoolsModule", SchoolsModule);
                    },
                });
            } catch (e) {
                expect(e.message.includes('Injection "i18n" not found')).toBeTruthy();
            }
        });
    });

    describe("t", () => {
        it("should return translation", () => {
            const { wrapper } = setup({});
            const testKey = "testKey";

            const result: string = wrapper.vm.t(testKey);

            expect(result).toEqual(testKey);
        });

        it("should return 'unknown translation-key'", () => {
            const { wrapper } = setup({});
            const testKey = 123;

            const result: string = wrapper.vm.t(testKey);

            expect(result.includes("unknown translation-key:")).toBeTruthy();
        });
    });

    describe("Info Text", () => {
        it('should display the info text', ()=> {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: false,
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });

            const text: string = wrapper.findComponent({ name: 'v-alert' }).text();

            expect(text).toStrictEqual('components.administration.adminMigrationSection.infoText');
        })
    });

    describe("Mandatory Switch", () => {
        it("should be enabled when migration is available", () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: false,
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });
            const switchComponent = wrapper.findComponent({ name: "v-switch" });

            expect(switchComponent.isVisible()).toBe(true);
            expect(switchComponent.props('disabled')).toBeFalsy();
        });

        it("should be disabled when migration is not available", () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: false,
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });

            const switchComponent = wrapper.findComponent({ name: "v-switch" });

            expect(switchComponent.isVisible()).toBe(true);
            expect(switchComponent.props('disabled')).toBeTruthy();
        });

        it("should set school oauth migration to mandatory, when click have been triggered", () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: false,
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });

            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            switchComponent.vm.$emit('change', true);

            expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({oauthMigrationPossible: true, oauthMigrationMandatory: true, oauthMigrationFinished: false})
        });

        it("should set school oauth migration to optional, when click has been triggered again", () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: false,
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: true,
                    oauthMigrationFinished: "",
                }
            });

            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            switchComponent.vm.$emit('change', false);

            expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({oauthMigrationPossible: true, oauthMigrationMandatory: false, oauthMigrationFinished: false})
        });
    });

    describe("Migration start button", () => {
        it("should be enabled when migration is enabled", () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });
            const buttonComponent = wrapper.findComponent({ name: "v-btn" });

            expect(buttonComponent.exists()).toBe(true);
            expect(buttonComponent.classes('button-start')).toBeTruthy();
            expect(buttonComponent.text()).toEqual(
                "components.administration.adminMigrationSection.migrationEnableButton.label"
            );
            expect(buttonComponent.props('disabled')).toBeFalsy();
        });

        it("should be disabled when migration is not enabled", () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: false,
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });

            const buttonComponent = wrapper.findComponent({ name: "v-btn" });

            expect(buttonComponent.exists()).toBe(true);
            expect(buttonComponent.classes('button-start')).toBeTruthy();
            expect(buttonComponent.text()).toEqual(
                "components.administration.adminMigrationSection.migrationEnableButton.label"
            );
            expect(buttonComponent.props('disabled')).toBeTruthy();
        });

        it("should not render migration start button and migration mandatory switch, when click has been triggered", async () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });

            const buttonComponent = wrapper.findComponent({ name: "v-btn" });
            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            await buttonComponent.vm.$emit('click');

            expect(buttonComponent.exists()).toBe(false);
            expect(switchComponent.isVisible()).toBe(false);
        });
    });

    describe("Migration end button", () => {
        it("should exist and be enabled when migration has started", () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });

            const buttonComponent = wrapper.findComponent({ name: "v-btn" });

            expect(buttonComponent.exists()).toBe(true);
            expect(buttonComponent.classes('button-end')).toBeTruthy();
            expect(buttonComponent.text()).toEqual(
                "components.administration.adminMigrationSection.migrationEndButton.label"
            );
            expect(buttonComponent.props('disabled')).toBeFalsy();
        });

        it("should should not render migration end button and migration mandatory switch, when click has been triggered", async () => {
            const { wrapper } = setup({getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }});

            const buttonComponent = wrapper.findComponent({ name: "v-btn" });
            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            await buttonComponent.vm.$emit('click');

            expect(buttonComponent.exists()).toBe(false);
            expect(switchComponent.isVisible()).toBe(false);
        });
    });

    describe("Migration start card", () => {
        describe("when migration start button is clicked", () => {
            it("should be rendered", async () => {
                const {wrapper} = setup({
                    getOauthMigration: {
                        enableMigrationStart: true,
                        oauthMigrationPossible: false,
                        oauthMigrationMandatory: false,
                        oauthMigrationFinished: "",
                    }
                });
                const buttonComponent = wrapper.findComponent({name: "v-btn"});
                await buttonComponent.vm.$emit('click');

                const cardComponent = wrapper.findComponent({name: "v-card"});


                expect(cardComponent.exists()).toBe(true);
                expect(cardComponent.classes('migration-start-card')).toBe(true);
            });
        });
    });

        describe("when agree button of card is clicked", () => {
            it("should not render the card and start migration", async () => {
                const {wrapper} = setup({
                    getOauthMigration: {
                        enableMigrationStart: true,
                        oauthMigrationPossible: false,
                        oauthMigrationMandatory: false,
                        oauthMigrationFinished: "",
                    }
                });
                const buttonComponent = wrapper.findComponent({name: "v-btn"});
                await buttonComponent.vm.$emit('click');

                const cardComponent = wrapper.findComponent({name: "v-card"});
                const cardButtonAgree = cardComponent.find('.agree-btn-start');
                await cardButtonAgree.vm.$emit('click');

                expect(cardComponent.exists()).toBe(false);
                expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: false
                });
            });
        });

        describe("when disagree button of card is clicked", () => {
        it("should not render the card and not start migration", async () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonDisagree = cardComponent.find('.disagree-btn-start');
            await cardButtonDisagree.vm.$emit('click');

            expect(cardComponent.exists()).toBe(false);
            expect(schoolsModule.getOauthMigration).toStrictEqual({oauthMigrationPossible: false, oauthMigrationMandatory: false, oauthMigrationFinished: "", enableMigrationStart: true})
        });
    });

    describe("Migration end card", () => {
        describe("when migration end button is clicked", () => {
            it("should be rendered", async () => {
                const {wrapper} = setup({
                    getOauthMigration: {
                        enableMigrationStart: true,
                        oauthMigrationPossible: true,
                        oauthMigrationMandatory: false,
                        oauthMigrationFinished: "",
                    }
                });

                const buttonComponent = wrapper.findComponent({name: "v-btn"});
                await buttonComponent.vm.$emit('click');

                const cardComponent = wrapper.findComponent({name: "v-card"});
                const cardButtonAgree = cardComponent.find('.agree-btn-end');
                const cardButtonDisagree = cardComponent.find('.disagree-btn-end');

                expect(cardComponent.exists()).toBe(true);
                expect(cardComponent.classes('migration-end-card')).toBe(true);
            });
        });
    });

        describe("when agree button of card is clicked", () => {
            it("should not render the card and complete migration", async () => {
                const {wrapper} = setup({
                    getOauthMigration: {
                        enableMigrationStart: true,
                        oauthMigrationPossible: true,
                        oauthMigrationMandatory: false,
                        oauthMigrationFinished: "",
                    }
                });
                const buttonComponent = wrapper.findComponent({name: "v-btn"});
                await buttonComponent.vm.$emit('click');

                const cardComponent = wrapper.findComponent({name: "v-card"});
                const cardButtonAgree = cardComponent.find('.agree-btn-end');
                await cardButtonAgree.vm.$emit('click');

                expect(cardComponent.exists()).toBe(false);
                expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: true
                });
            });
        });

        describe("when disagree button of card is clicked", () => {
            it("should not render the card and not complete migration", async () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: true,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonDisagree = cardComponent.find('.disagree-btn-end');
            await cardButtonDisagree.vm.$emit('click');

            expect(cardComponent.exists()).toBe(false);
            expect(schoolsModule.getOauthMigration).toStrictEqual({oauthMigrationPossible: true, oauthMigrationMandatory: false, oauthMigrationFinished: "", enableMigrationStart: true})
            });
        });

    describe("Date paragraph", () => {
        it("should exist when migration has been completed", async () => {
            const date: string = new Date().toDateString();
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: date,
                }
            });

            const paragraph = wrapper.find('.migration-completion-date');

            expect(paragraph.exists()).toBe(true);
            expect(paragraph.text()).toEqual(
                `components.administration.adminMigrationSection.oauthMigrationFinished.text${date}`
            );
        });

        it("should not exist when migration has not been completed", async () => {
            const { wrapper } = setup({
                getOauthMigration: {
                    enableMigrationStart: true,
                    oauthMigrationPossible: false,
                    oauthMigrationMandatory: false,
                    oauthMigrationFinished: "",
                }
            });

            const paragraph = wrapper.find('.migration-completion-date');

            expect(paragraph.exists()).toBe(false);
        });
    });
});
