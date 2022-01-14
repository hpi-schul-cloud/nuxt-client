<template>
  <v-card>
    <v-toolbar
        dark
        color="primary"
    >
      <v-toolbar-title>Merge <strong>WebSchule</strong> account of {{ editedItem.firstName }} {{ editedItem.lastName }} with:</v-toolbar-title>
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
      Search from <strong>{{ this.$theme.short_name }}</strong> <base-link target="_blank" :href="editedItem.roleNames.includes('teacher') ? '/administration/teachers' : '/administration/students'">existing accounts</base-link>
      and click Save, in order to prepare the user accounts merging.
    </v-card-text>
    <v-card-text>
        <v-autocomplete
            v-model="model"
            :items="items"
            :label="`Search ${this.$theme.short_name} accounts`"
            :loading="loading"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            placeholder="Start typing to search account to merge"
            :prepend-inner-icon="mdiAccountSearch"
            return-object
            clearable
            hint="or leave empty to create new"
            persistent-hint
            no-data-text="No data found"
            no-filter
            item-value="importUserId"
        ></v-autocomplete>
    </v-card-text>
    <v-expand-transition>
      <v-container>
        <v-divider></v-divider>
        <div
            v-if="model"
        >
          Name: {{ model.firstName }} {{ model.lastName }}
          <br>
          Login: {{ model.loginName }}
          <br>
          Role: {{ model.roleNames.join(', ') }}
          <v-divider></v-divider>
        </div>
        <div>
          <br>
          <p>
            New login: {{ editedItem.loginName }}
          </p>
          <p>
            Flag this account:
            <v-btn v-if="editedItem.flagged" v-model="editedItem.flagged" icon color="primary" class="ma-2" >
              <v-icon color="primary">{{ mdiFlag }}</v-icon>
            </v-btn>
            <v-btn v-else v-model="editedItem.flagged" icon class="ma-2">
              <v-icon>{{ mdiFlagOutline }}</v-icon>
            </v-btn>
          </p>
        </div>
      </v-container>
    </v-expand-transition>
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
  mdiAccountPlus,
  mdiAccountSearch,
  mdiAccountSwitch,
  mdiAccountSwitchOutline,
  mdiClose,
  mdiContentSave,
  mdiDelete,
  mdiFlag,
  mdiFlagOutline,
} from  "@mdi/js";
import BaseLink from '@basecomponents/BaseLink';
import ImportUserModule from '@store/import-users';

export default {
  components: { BaseLink },
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
      mdiAccountPlus,
      mdiAccountSearch,
      mdiAccountSwitch,
      mdiAccountSwitchOutline,
      mdiClose,
      mdiContentSave,
      mdiDelete,
      mdiFlag,
      mdiFlagOutline,
      localUser: {
        userId: '',
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        classes: [],
        roles: [],
      },
      entries: [],
      loading: false,
      search: null,
      model: this.editedItem.match
    }
  },
  computed: {
    items () {
      const itemsList = this.entries.map(user => {
        user.text = `${user.firstName} ${user.lastName}`;
        return user;
      });
      return itemsList;
    },
  },

  watch: {
    search (val) {
      val && val !== this.select && this.getDataFromApi(val)
    },
  },
  created() {
    this.getDataFromApi('');
  },
  methods: {
    async getDataFromApi(name) {
      this.loading = true;
      ImportUserModule.setSearch(name);
      ImportUserModule.fetchAllUsers()
          .then(() => {
            this.count = ImportUserModule.getUserList.total;
            this.entries = ImportUserModule.getUserList.data;
            this.loading = false;
          });
    },
    closeEdit() {
      this.$emit('close');
    },
    saveEdit() {
      // TODO
      if (this.editedIndex > -1) {
        //Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        // this.importUsers.push(this.editedItem)
      }
      this.closeEdit();
    },
    deleteItem(item) {
      // TODO
      this.editedIndex = this.importUsers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // TODO persist in API
      delete this.importUsers[this.editedIndex].match;
      this.closeEdit();
    },
  }
}
</script>
