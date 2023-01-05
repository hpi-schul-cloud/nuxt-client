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
            getOauthMigrationAvailable: false,
            getOauthMigration : false,
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
                getOauthMigrationAvailable: true,
            });

            const text: string = wrapper.findComponent({ name: 'v-alert' }).text();

            expect(text).toStrictEqual('components.administration.adminMigrationSection.infoText');
        })
    });

    describe("Mandatory Switch", () => {
        it("should be enabled when migration is available", () => {
            const { wrapper } = setup({
                getOauthMigrationAvailable: true
            });
            const switchComponent = wrapper.findComponent({ name: "v-switch" });

            expect(switchComponent.exists()).toBe(true);
            expect(switchComponent.props('disabled')).toBeFalsy();
        });

        it("should be disabled when migration is not available", () => {
            const { wrapper } = setup();

            const switchComponent = wrapper.findComponent({ name: "v-switch" });

            expect(switchComponent.exists()).toBe(true);
            expect(switchComponent.props('disabled')).toBeTruthy();
        });

        it("should set school oauth migration to mandatory, when click have been triggered", () => {
            const { wrapper } = setup({
                getOauthMigrationAvailable: true
            });

            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            switchComponent.vm.$emit('change', true);

            expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({available: true, mandatory: true})
        });

        it("should set school oauth migration to optional, when click has been triggered again", () => {
            const { wrapper } = setup({
                getOauthMigrationAvailable: true,
                getOauthMigrationMandatory : true
            });

            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            switchComponent.vm.$emit('change', false);

            expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({available: true, mandatory: false})
        });
    });

    describe("Migration start button", () => {
        it("should be enabled when migration is enabled", () => {
            const { wrapper } = setup({
                getOauthMigration: true
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
            const { wrapper } = setup();

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
                getOauthMigration: true
            });

            const buttonComponent = wrapper.findComponent({ name: "v-btn" });
            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            await buttonComponent.vm.$emit('click');

            expect(buttonComponent.exists()).toBe(false);
            expect(switchComponent.exists()).toBe(false);
        });
    });

    describe("Migration end button", () => {
        it("should exist and be enabled when migration has started", () => {
            const { wrapper } = setup({
                getOauthMigration: true,
                getOauthMigrationAvailable: true
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
            const { wrapper } = setup({
                getOauthMigration: true,
                getOauthMigrationAvailable: true
            });

            const buttonComponent = wrapper.findComponent({ name: "v-btn" });
            const switchComponent = wrapper.findComponent({ name: "v-switch" });
            await buttonComponent.vm.$emit('click');

            expect(buttonComponent.exists()).toBe(false);
            expect(switchComponent.exists()).toBe(false);
        });
    });

    describe("Migration start card", () => {
        it("should exist with 2 buttons", async () => {
            const {wrapper} = setup({
                getOauthMigration: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonAgree = cardComponent.find('.agree-btn-start');
            const cardButtonDisagree = cardComponent.find('.disagree-btn-start');

            expect(cardComponent.exists()).toBe(true);
            expect(cardComponent.classes('migration-start-card')).toBe(true);
            expect(cardButtonAgree.exists()).toBe(true);
            expect(cardButtonDisagree.exists()).toBe(true);
        });

        it("should have the right text elements ", async () => {
            const {wrapper} = setup({
                getOauthMigration: true,
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});

            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.startWarningCard.title");
            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.startWarningCard.text");
            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.startWarningCard.agree");
            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.startWarningCard.disagree");
        });

        it("should not render the card and start migration, when agree-button is clicked", async () => {
            const {wrapper} = setup({
                getOauthMigration: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonAgree = cardComponent.find('.agree-btn-start');
            await cardButtonAgree.vm.$emit('click');

            expect(cardComponent.exists()).toBe(false);
            //expect(schoolsModule.getOauthMigrationAvailable).toStrictEqual(true)
        });

        it("should not render the card and not start migration, when disagree-button is clicked", async () => {
            const {wrapper} = setup({
                getOauthMigration: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonDisagree = cardComponent.find('.disagree-btn-start');
            await cardButtonDisagree.vm.$emit('click');

            expect(cardComponent.exists()).toBe(false);
            expect(schoolsModule.getOauthMigrationAvailable).toStrictEqual(false)
        });
    });

    describe("Migration end card", () => {
        it("should exist with 2 buttons", async () => {
            const {wrapper} = setup({
                getOauthMigration: true,
                getOauthMigrationAvailable: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonAgree = cardComponent.find('.agree-btn-end');
            const cardButtonDisagree = cardComponent.find('.disagree-btn-end');

            expect(cardComponent.exists()).toBe(true);
            expect(cardComponent.classes('migration-end-card')).toBe(true);
            expect(cardButtonAgree.exists()).toBe(true);
            expect(cardButtonDisagree.exists()).toBe(true);
        });

        it("should have the right text elements ", async () => {
            const {wrapper} = setup({
                getOauthMigration: true,
                getOauthMigrationAvailable: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});

            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.endWarningCard.title");
            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.endWarningCard.text");
            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.endWarningCard.agree");
            expect(cardComponent.text()).toContain("components.administration.adminMigrationSection.endWarningCard.disagree");
        });

        it("should not render the card and complete migration, when agree-button is clicked", async () => {
            const {wrapper} = setup({
                getOauthMigration: true,
                getOauthMigrationAvailable: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonAgree = cardComponent.find('.agree-btn-end');
            await cardButtonAgree.vm.$emit('click');

            expect(cardComponent.exists()).toBe(false);
            //expect(schoolsModule.getOauthMigrationAvailable).toStrictEqual(false)
            });

        it("should not render the card and not complete migration, when disagree-button is clicked", async () => {
            const {wrapper} = setup({
                getOauthMigration: true,
                getOauthMigrationAvailable: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');

            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonDisagree = cardComponent.find('.disagree-btn-end');
            await cardButtonDisagree.vm.$emit('click');

            expect(cardComponent.exists()).toBe(false);
            expect(schoolsModule.getOauthMigrationAvailable).toStrictEqual(true)
        });
    });

    describe("Date paragraph", () => {
        it.skip("should exist when migration has been completed", async () => {
            const { wrapper } = setup({
                getOauthMigration: true,
                getOauthMigrationAvailable: true
            });
            const buttonComponent = wrapper.findComponent({name: "v-btn"});
            await buttonComponent.vm.$emit('click');
            const cardComponent = wrapper.findComponent({name: "v-card"});
            const cardButtonAgree = cardComponent.find('.disagree-btn-end');
            await cardButtonAgree.vm.$emit('click');

            const paragraph = wrapper.findComponent({name:"p"});

            expect(paragraph.exists()).toBe(true);
            expect(paragraph).toContain(
                "components.administration.adminMigrationSection.migrationCompletionDate.text"
            );
            // TODO check if date is shown
        });

        it("should not exist when migration has not been completed", async () => {
            const { wrapper } = setup({
                getOauthMigration: true,
            });

            const paragraph = wrapper.findComponent({name:"p"});

            expect(paragraph.exists()).toBe(false);
        });
    });
});
