import { RoleName } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import {
  createTestAppStoreWithRole,
  mockedPiniaStoreTyping,
  roomMemberFactory,
  roomMemberSchoolResponseFactory,
  schoolFactory,
} from "@@/tests/test-utils";
import {
  createTestingI18n,
  createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomAuthorization, useRoomMembersStore } from "@data-room";
import { createMock } from "@golevelup/ts-vitest";
import { computed, Ref } from "vue";
import { mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { VueWrapper } from "@vue/test-utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { Mock } from "vitest";
import { VAutocomplete, VIcon } from "vuetify/lib/components/index";
import AddMembersDialog from "./AddMembersDialog.vue";
import { setActivePinia } from "pinia";

vi.mock("@vueuse/integrations/useFocusTrap");

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorizationMock = vi.mocked(useRoomAuthorization);

type RefPropertiesOnly<T> = {
  [K in keyof T as T[K] extends Ref ? K : never]: boolean;
};

type RoomAuthorizationRefs = Partial<
  RefPropertiesOnly<ReturnType<typeof useRoomAuthorization>>
>;

describe("AddMembersDialog", () => {
  let wrapper: VueWrapper<InstanceType<typeof AddMembersDialog>>;
  let pauseMock: Mock;
  let unpauseMock: Mock;

  beforeEach(() => {
    pauseMock = vi.fn();
    unpauseMock = vi.fn();
    (useFocusTrap as Mock).mockReturnValue({
      pause: pauseMock,
      unpause: unpauseMock,
      deactivate: vi.fn(),
    });

    setupStores({
      schoolsModule: SchoolsModule,
    });

    schoolsModule.setSchool(
      schoolFactory.build({
        id: "school-id",
        name: "Paul-Gerhardt-Gymnasium",
      })
    );
  });

  const setup = (options?: {
    customRoomAuthorization?: RoomAuthorizationRefs;
    schoolRole?: RoleName.Teacher | RoleName.Student;
    isOpen?: boolean;
  }) => {
    const configDefaults = {
      canAddRoomMembers: true,
      canSeeAllStudents: true,
    };
    const roomAuthorization = {
      ...configDefaults,
      ...options?.customRoomAuthorization,
    };
    const potentialRoomMembers = roomMemberFactory.buildList(3);
    const roomMembersSchools = roomMemberSchoolResponseFactory.buildList(3);
    const roomMembers = roomMemberFactory.buildList(2, {
      roomRoleName: RoleName.Roomadmin,
    });

    setActivePinia(createTestingPinia({ stubActions: false }));
    const { mockedMe } = createTestAppStoreWithRole(
      options?.schoolRole ?? RoleName.Teacher
    );

    roomMembers[0].schoolRoleNames = [options?.schoolRole ?? RoleName.Teacher];
    roomMembers[0].userId = mockedMe.user.id;
    roomMembersSchools[0].id = mockedMe.school.id;

    const authorizationPermissions =
      createMock<ReturnType<typeof useRoomAuthorization>>();

    for (const [key, value] of Object.entries(roomAuthorization ?? {})) {
      authorizationPermissions[key as keyof RoomAuthorizationRefs] = computed(
        () => value ?? false
      );
    }
    roomAuthorizationMock.mockReturnValue(authorizationPermissions);

    wrapper = mount(AddMembersDialog, {
      props: {
        modelValue: options?.isOpen ?? true,
      },
      attachTo: document.body,
      global: {
        plugins: [
          createTestingVuetify(),
          createTestingI18n(),
          createTestingPinia({
            initialState: {
              roomMembersStore: {
                potentialRoomMembers,
                schools: roomMembersSchools,
                roomMembers,
              },
              applicationStore: {
                meResponse: mockedMe,
              },
            },
          }),
        ],
      },
    });

    const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);

    return {
      wrapper,
      mockedMe,
      potentialRoomMembers,
      roomMembersSchools,
      roomMembersStore,
    };
  };

  afterEach(() => {
    wrapper.unmount(); // necessary due focus trap
  });

  describe("when component is mounted", () => {
    it("should render component", () => {
      const { wrapper } = setup();

      expect(wrapper.exists()).toBe(true);
    });

    it("should call getPotentialMembers when Dialog is open", async () => {
      const { roomMembersStore } = setup({ isOpen: false });

      await wrapper.setProps({ modelValue: true });

      expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledTimes(1);
    });

    describe("Item list components", () => {
      it("should render autocomplete and select components", () => {
        const { wrapper } = setup();
        const autoCompleteComponents = wrapper.findAllComponents(VAutocomplete);
        const selectComponents = wrapper.findAllComponents({
          name: "VSelect",
        });

        expect(autoCompleteComponents).toHaveLength(2);
        expect(selectComponents).toHaveLength(1);
      });

      it("should have proper props for autoCompleteSchool component", () => {
        const { wrapper, roomMembersSchools } = setup();
        const schoolComponent = wrapper.getComponent({
          ref: "autoCompleteSchool",
        });

        expect(schoolComponent.props("items")).toStrictEqual(
          roomMembersSchools
        );
        expect(schoolComponent.props("modelValue")).toBe(
          roomMembersSchools[0].id
        );
      });

      it("should offer all roles for selectRole component", () => {
        const { wrapper } = setup();

        const roles = [
          {
            id: RoleName.Student,
            name: "common.labels.student.neutral",
            icon: mdiAccountOutline,
          },
          {
            id: RoleName.Teacher,
            name: "common.labels.teacher.neutral",
            icon: mdiAccountSchoolOutline,
          },
        ];

        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        expect(roleComponent.props("items")).toStrictEqual(roles);
        expect(roleComponent.props("modelValue")).toBe(roles[0].id);
      });

      it("should have proper props for autoCompleteUsers component", () => {
        const { wrapper, potentialRoomMembers } = setup();
        const userComponent = wrapper.getComponent({
          ref: "autoCompleteUsers",
        });

        expect(userComponent.props("items")).toStrictEqual(
          potentialRoomMembers
        );
        expect(userComponent.props("modelValue")).toHaveLength(0);
      });
    });
  });

  describe("when school is changed", () => {
    it("should call resetPotentialMembers", async () => {
      const { wrapper, roomMembersSchools, roomMembersStore } = setup();
      const selectedSchool = roomMembersSchools[1].id;
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });

      await schoolComponent.setValue(selectedSchool);

      expect(roomMembersStore.resetPotentialMembers).toHaveBeenCalledTimes(1);
    });

    it("should reset selectedUsers", async () => {
      const { wrapper } = setup();
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });

      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      await schoolComponent.setValue("schoolId");

      expect(userComponent.props("modelValue")).toEqual([]);
    });

    it("should call getPotentialMembers for set role", async () => {
      const { wrapper, roomMembersSchools, roomMembersStore } = setup();
      const selectedSchool = roomMembersSchools[1].id;
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });
      const selectedRole = roleComponent.props("modelValue");

      await schoolComponent.setValue(selectedSchool);

      expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledTimes(1);
      expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledWith(
        selectedRole,
        selectedSchool
      );
    });
  });

  describe("when userRole is changed", () => {
    it("should call resetPotentialMembers", async () => {
      const { wrapper, roomMembersStore } = setup();
      const selectedRole = RoleName.Student;
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      await roleComponent.setValue(selectedRole);

      expect(roomMembersStore.resetPotentialMembers).toHaveBeenCalledTimes(1);
    });

    it("should reset selectedUsers", async () => {
      const { wrapper } = setup();
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      await roleComponent.setValue(RoleName.Roomeditor);

      expect(userComponent.props("modelValue")).toEqual([]);
    });

    describe("and the role is set to student", () => {
      it("should call getPotentialMembers for student role", async () => {
        const { wrapper, roomMembersSchools, roomMembersStore } = setup();
        const selectedRole = RoleName.Student;
        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await roleComponent.setValue(selectedRole);

        expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledTimes(1);
        expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledWith(
          selectedRole,
          roomMembersSchools[0].id
        );
      });

      it("should render an icon with text for student role", async () => {
        const { wrapper } = setup();

        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });
        await roleComponent.setValue(RoleName.Student);

        const roleIcon = roleComponent.findComponent(VIcon);

        expect(roleIcon.props("icon")).toBe(mdiAccountOutline);
        expect(roleComponent.text()).toContain("common.labels.student.neutral");
      });
    });

    describe("and the role is set to teacher", () => {
      it("should call getPotentialMembers for teacher role", async () => {
        const { wrapper, roomMembersSchools, roomMembersStore } = setup();
        const selectedRole = RoleName.Teacher;
        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await roleComponent.setValue(selectedRole);

        expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledTimes(1);
        expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledWith(
          selectedRole,
          roomMembersSchools[0].id
        );
      });

      it("should render an icon with text for teacher role", async () => {
        const { wrapper } = setup();

        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await roleComponent.setValue(RoleName.Teacher);
        const roleIcon = roleComponent.findComponent(VIcon);

        expect(roleIcon.props("icon")).toBe(mdiAccountSchoolOutline);
        expect(roleComponent.text()).toContain("common.labels.teacher.neutral");
      });
    });
  });

  describe("when user(s) selected", () => {
    it("should add user to selectedUsers", async () => {
      const { wrapper, potentialRoomMembers } = setup();
      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      await userComponent.setValue([
        potentialRoomMembers[0].userId,
        potentialRoomMembers[1].userId,
      ]);

      expect(userComponent.props("modelValue")).toHaveLength(2);
      expect(userComponent.props("modelValue")).toStrictEqual([
        potentialRoomMembers[0].userId,
        potentialRoomMembers[1].userId,
      ]);
    });

    it("should disable autocomplete school and select role selection", async () => {
      const { wrapper, potentialRoomMembers } = setup();
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      await userComponent.setValue([
        potentialRoomMembers[0].userId,
        potentialRoomMembers[1].userId,
      ]);

      expect(schoolComponent.props("disabled")).toBe(true);
      expect(roleComponent.props("disabled")).toBe(true);
    });

    it("should enable autocomplete school and select role selection when alls users are removed from selection", async () => {
      const { wrapper, potentialRoomMembers } = setup();
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });
      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      await userComponent.setValue([
        potentialRoomMembers[0].userId,
        potentialRoomMembers[1].userId,
      ]);
      expect(schoolComponent.props("disabled")).toBe(true);
      expect(roleComponent.props("disabled")).toBe(true);

      await userComponent.setValue([]);
      expect(schoolComponent.props("disabled")).toBe(false);
      expect(roleComponent.props("disabled")).toBe(false);
    });
  });

  describe("when add button clicked", () => {
    it("should call addMembers", async () => {
      const { wrapper, potentialRoomMembers, roomMembersStore } = setup();
      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      const selectedUsers = [
        potentialRoomMembers[0].userId,
        potentialRoomMembers[1].userId,
      ];
      await userComponent.setValue(selectedUsers);

      const addButton = wrapper.getComponent({
        ref: "addButton",
      });

      await addButton.trigger("click");

      expect(roomMembersStore.addMembers).toHaveBeenCalledTimes(1);
      expect(roomMembersStore.addMembers).toHaveBeenCalledWith(selectedUsers);
    });

    it("should emit 'close'", async () => {
      const { wrapper, potentialRoomMembers } = setup();
      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      const selectedUsers = [
        potentialRoomMembers[0].userId,
        potentialRoomMembers[1].userId,
      ];
      await userComponent.setValue(selectedUsers);

      const addButton = wrapper.getComponent({
        ref: "addButton",
      });
      await addButton.trigger("click");

      expect(wrapper.emitted()).toHaveProperty("close");
    });
  });

  describe("when cancel button clicked", () => {
    it("should emit 'close''", async () => {
      const { wrapper } = setup();

      const cancelButton = wrapper.getComponent({
        ref: "cancelButton",
      });

      await cancelButton.trigger("click");

      expect(wrapper.emitted()).toHaveProperty("close");
    });
  });

  describe("focus trap", () => {
    it("should pause focus trap when any autocomplete or select menu is open", () => {
      const { wrapper } = setup();
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      roleComponent.vm.menu = true;

      expect(pauseMock).toHaveBeenCalledTimes(1);
    });

    it("should unpause focus trap when all autocomplete and select menus are closed", () => {
      const { wrapper } = setup();
      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      userComponent.vm.menu = true;
      expect(pauseMock).toHaveBeenCalledTimes(1);

      userComponent.vm.menu = false;
      expect(unpauseMock).toHaveBeenCalled();
    });

    it("should not unpause focus trap when a autocomplete or select is closed while another one is opened", () => {
      // this happens when user switches between autocomplete or select components for brief moment both are treated as open
      const { wrapper } = setup();
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      roleComponent.vm.menu = true;
      userComponent.vm.menu = true;

      expect(pauseMock).toHaveBeenCalled();
      expect(unpauseMock).not.toHaveBeenCalled();

      roleComponent.vm.menu = false;
      expect(unpauseMock).not.toHaveBeenCalled();
    });
  });

  describe("when external school and student role are set", () => {
    it("should disable the user selection", async () => {
      const { wrapper } = setup();
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      await schoolComponent.setValue("external-school-id");
      await roleComponent.setValue(RoleName.Student);

      const userComponent = wrapper.getComponent({
        ref: "autoCompleteUsers",
      });

      expect(userComponent.props("disabled")).toBe(true);
    });

    it("should show warning message", async () => {
      const { wrapper } = setup();
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });
      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      await schoolComponent.setValue("external-school-id");
      await roleComponent.setValue(RoleName.Student);

      expect(wrapper.getComponent(WarningAlert).text()).toBe(
        "pages.rooms.members.add.warningText"
      );
    });
  });

  describe("when user is not allowed to see all students", () => {
    describe("and the role is set to student", () => {
      it("should show info message", async () => {
        const { wrapper } = setup({
          customRoomAuthorization: { canSeeAllStudents: false },
        });

        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await roleComponent.setValue(RoleName.Student);

        const infoAlert = wrapper.getComponent(
          '[data-testid="student-visibility-info-alert"]'
        );
        expect(infoAlert.text()).toBe(
          "pages.rooms.members.add.students.forbidden"
        );
      });
    });
    describe("and the role is set to teacher", () => {
      it("should not show info message", async () => {
        const { wrapper } = setup({
          customRoomAuthorization: { canSeeAllStudents: false },
        });

        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await roleComponent.setValue(RoleName.Teacher);

        const infoAlert = wrapper.findComponent(
          '[data-testid="student-visibility-info-alert"]'
        );
        expect(infoAlert.exists()).toEqual(false);
      });
    });
    describe("and external school and student role are set", () => {
      it("should not show info message", async () => {
        const { wrapper } = setup({
          customRoomAuthorization: { canSeeAllStudents: false },
        });

        const schoolComponent = wrapper.getComponent({
          ref: "autoCompleteSchool",
        });
        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await schoolComponent.setValue("external-school-id");
        await roleComponent.setValue(RoleName.Student);

        const infoAlert = wrapper.findComponent(
          '[data-testid="student-visibility-info-alert"]'
        );
        expect(infoAlert.exists()).toEqual(false);
      });
    });
    describe("and the current user is a student and student role is set", () => {
      it("should not show info message", async () => {
        const { wrapper } = setup({
          customRoomAuthorization: { canSeeAllStudents: false },
          schoolRole: RoleName.Student,
        });

        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await roleComponent.setValue(RoleName.Student);

        const infoAlert = wrapper.findComponent(
          '[data-testid="student-visibility-info-alert"]'
        );
        expect(infoAlert.exists()).toEqual(false);
      });

      it("should show specific student admin info message", async () => {
        const { wrapper } = setup({
          customRoomAuthorization: { canSeeAllStudents: false },
          schoolRole: RoleName.Student,
        });

        const roleComponent = wrapper.getComponent({
          ref: "selectRole",
        });

        await roleComponent.setValue(RoleName.Student);

        const infoAlert = wrapper.findComponent(
          '[data-testid="student-admin-info-alert"]'
        );
        expect(infoAlert.text()).toBe(
          "pages.rooms.members.add.students.studentAdmins"
        );
      });
    });
  });

  describe("when current user is a student admin", () => {
    it("should disable the school selection with current users school selected", () => {
      const { mockedMe, wrapper } = setup({ schoolRole: RoleName.Student });
      const schoolComponent = wrapper.getComponent({
        ref: "autoCompleteSchool",
      });

      expect(schoolComponent.props("disabled")).toBe(true);
      expect(schoolComponent.props("modelValue")).toBe(mockedMe.school.id);
    });

    it("should show specific student admin info message", async () => {
      const { wrapper } = setup({
        schoolRole: RoleName.Student,
      });

      const roleComponent = wrapper.getComponent({
        ref: "selectRole",
      });

      await roleComponent.setValue(RoleName.Student);

      const infoAlert = wrapper.findComponent(
        '[data-testid="student-admin-info-alert"]'
      );
      expect(infoAlert.text()).toBe(
        "pages.rooms.members.add.students.studentAdmins"
      );
    });
  });
});
