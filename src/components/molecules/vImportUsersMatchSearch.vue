<template>
  <v-card>
    <v-toolbar
        dark
        color="primary"
    >
      <v-toolbar-title>{{ editMatch }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="isDialog"
            icon
            dark
            @click="closeEdit"
        ><v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <v-autocomplete
            v-model="editedItem.match"
            :items="getLocalUsersSelect()"
            item-text="name"
            label="Search existing accounts"
        ></v-autocomplete>
        <p>
          Email:
          <br>
          Class:
          <br>
          Login:
        </p>
        <v-divider></v-divider>
        <br>
        <p>
          New login: {{ editedItem.loginName }}
        </p>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-col class="col-6">
        <v-btn text class="primary m-2" @click="saveEdit">
          <v-icon small>{{ mdiContentSave }}</v-icon>  Save</v-btn>
        <v-btn v-if="isDialog" text class="m-2" @click="closeEdit">Cancel</v-btn>
      </v-col>
      <v-col class="col-6 text-right">
        <v-btn text class="secondary m-2" @click="deleteItem">
          <v-icon small>{{ mdiDelete }}</v-icon>
          Delete
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
<script>
import {
  mdiClose,
  mdiContentSave,
  mdiDelete,
} from  "@mdi/js";

export default {
  props: {
    isDialog: {
      type: Boolean,
    },
    editedIndex: {
      type: Number,
      required: true,
    },
    editedItem: {
      type: Object,

      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      loginName: {
        type: String,
      },
      roleNames: {
        type: Array,
      },
      classNames: {
        type: Array,
      },
      match: {
        type: Object,
      },
      flagged: {
        type: Boolean,
      },
    }
  },
  data() {
    return {
      mdiClose,
      mdiContentSave,
      mdiDelete,
      localUsersMock: [
        {
          _id: {
            $oid: "0000d213816abba584714c0a",
          },
          firstName: "Thorsten",
          lastName: "Test",
          email: "admin@schul-cloud.org",
          updatedAt: {
            $date: "2021-12-13T17:28:00.309Z",
          },
          createdAt: {
            $date: "2017-01-01T00:06:37.148Z",
          },
          roles: ["administrator"],
        },
        {
          _id: {
            $oid: "0000d213816abba584714c0b",
          },
          firstName: "Janno",
          lastName: "Jura",
          email: "janno.jura@schul-cloud.org",
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-01-01T00:06:37.148Z",
          },
          roles: ["administrator"],
        },
        {
          _id: {
            $oid: "0000d224816abba584714c9c",
          },
          firstName: "Marla",
          lastName: "Mathe",
          email: "schueler@schul-cloud.org",
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-01-01T00:06:37.148Z",
          },
          roles: ["student"],
        },
        {
          _id: {
            $oid: "0000d231816abba584714c9c",
          },
          email: "superhero@schul-cloud.org",
          firstName: "Super",
          lastName: "Hero",
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-01-01T00:06:37.148Z",
          },
          roles: ["superhero"],
        },
        {
          _id: {
            $oid: "0000d231816abba584714c9e",
          },
          firstName: "Cord",
          lastName: "Carl",
          email: "lehrer@schul-cloud.org",
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-01-01T00:06:37.148Z",
          },
          roles: ["teacher"],
        },
        {
          _id: {
            $oid: "58b40278dac20e0645353e3a",
          },
          firstName: "Waldemar",
          lastName: "Wunderlich",
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-01-01T00:06:37.148Z",
          },
          email: "waldemar.wunderlich@schul-cloud.org",
          roles: ["student"],
        },
        {
          _id: {
            $oid: "599ec14d8e4e364ec18ff46d",
          },
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-08-24T12:06:37.148Z",
          },
          email: "demo-schueler@schul-cloud.org",
          firstName: "Fritz",
          lastName: "Schmidt",
          roles: ["demoStudent"],
        },
        {
          _id: {
            $oid: "599ec1688e4e364ec18ff46e",
          },
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-08-24T12:07:04.416Z",
          },
          email: "demo-lehrer@schul-cloud.org",
          firstName: "Erika",
          lastName: "Meier",
          roles: ["demoTeacher"],
        },
        {
          _id: {
            $oid: "59ad4c412b442b7f81810285",
          },
          updatedAt: {
            $date: "2020-10-21T15:47:29.456Z",
          },
          createdAt: {
            $date: "2017-09-04T12:51:13.952Z",
          },
          email: "klara.fall@schul-cloud.org",
          firstName: "Klara",
          lastName: "Fall",
          roles: ["teacher"],
        },
        {
          _id: {
            $oid: "59ae89b71f513506904e1cc9",
          },
          updatedAt: {
            $date: "2020-10-21T15:47:29.457Z",
          },
          createdAt: {
            $date: "2017-09-05T11:25:43.556Z",
          },
          email: "paula.meyer@schul-cloud.org",
          firstName: "Paula",
          lastName: "Meyer",
          roles: ["student"],
        },
      ],
      localUser: {
        userId: '',
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        classes: [],
        roles: [],
      },
    }
  },
  computed: {

    editMatch() {
      console.log("editMatch", this.editedIndex);
      //if (this.importUsers[this.editedIndex].match) {
      //return 'Change match';
      //}
      return "Find match";
    },
  },
  methods: {
    closeEdit() {
      this.$emit('close');
    },
    saveEdit() {
      if (this.editedIndex > -1) {
        // TODO
        //Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        // this.importUsers.push(this.editedItem)
      }
      this.closeEdit();
    },
    deleteItem(item) {
      this.editedIndex = this.importUsers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // TODO persist in API
      delete this.importUsers[this.editedIndex].match;
      this.closeEdit();
    },
    getLocalUsersSelect() {
      // TODO fetch from API
      const localUsers = this.localUsersMock.map((user) => {
        return {
          value: user._id.$oid,
          name: `${user.firstName} ${user.lastName}`,
        };
      });
      console.log("getLocalUsersSelect", localUsers);
      return localUsers;
    },
  }
}
</script>