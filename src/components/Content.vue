<template>
  <div id="content">
    <div class="table">
      <v-data-table
        :headers="headers"
        :items="filteredContacts"
        sort-by="calories"
        :items-per-page="5"
        class="elevation-1"
        :key="tableKey"
      >
        <template v-slot:item.status="{ item }">
          <span v-if="item.status.toLowerCase() === 'info'">
            <v-chip class="status status-info" label>{{ item.status }} </v-chip>
          </span>
          <span
            v-else-if="
              item.status.toLowerCase() === 'delivered' ||
              item.status.toLowerCase() === 'danger'
            "
          >
            <v-chip class="status status-delivered status-danger" label>
              {{ item.status }}
            </v-chip>
          </span>
          <span
            v-else-if="
              item.status.toLowerCase() === 'pending' ||
              item.status.toLowerCase() === 'canceled'
            "
          >
            <v-chip class="status status-pending status-canceled" label>
              {{ item.status }}
            </v-chip>
          </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex">
            <v-btn icon class="success white--text action-buttons">
              <v-icon
                small
                title="Edit Customer"
                @click="openEditDialog({ item })"
              >
                mdi-pencil
              </v-icon>
              <span v-if="$vuetify.breakpoint.name === 'xs'">Edit</span>
            </v-btn>
            <v-btn
              icon
              @click="openDeleteDialog({ item })"
              class="red darken-2 white--text action-buttons"
            >
              <v-icon small title="Delete Customer"> mdi-delete </v-icon>
              <span v-if="$vuetify.breakpoint.name === 'xs'">Delete</span>
            </v-btn>
          </div>
        </template>
      </v-data-table>
      <Dialog
        :dialog="editDialog || addDialog || deleteDialog"
        @closeDialog="closeDialog"
      >
        <template v-slot:title>
          <span v-if="editDialog">Edit Customer</span>
          <span v-if="addDialog">Add Customer</span>
          <span v-if="deleteDialog">Delete Customer</span>
        </template>
        <template v-slot:body>
          <v-form
            ref="form"
            v-model="formValid"
            lazy-validation
            v-if="editDialog || addDialog"
          >
            <CustomerForm
              :customer="customer"
              :editUser="editDialog"
              :key="'customerFormKey' + customerFormKey"
              @updated="customer = $event"
            />
          </v-form>
          <div v-else>
            <span class="delete-message"
              >Are you sure you want to remove customer
              {{ customer.customer }}?</span
            >
          </div>
        </template>
        <template v-slot:actions>
          <div v-if="editDialog" class="ml-auto pa-2">
            <v-btn class="grey lighten-5" @click="closeDialog"> Cancel </v-btn>
            <v-btn
              class="success ml-4"
              @click="updateCustomer"
              :loading="updateCustomerLoading"
              >Update</v-btn
            >
          </div>

          <div v-else-if="addDialog" class="ml-auto pa-2">
            <v-btn class="grey lighten-5" @click="closeDialog"> Cancel </v-btn>
            <v-btn
              class="success ml-4"
              @click="addCustomer"
              :loading="addCustomerLoading"
              >Add</v-btn
            >
          </div>

          <div v-else class="ml-auto pa-2">
            <v-btn class="grey lighten-5" @click="closeDialog"> Cancel </v-btn>
            <v-btn
              class="red darken-2 white--text ml-4"
              @click="removeCustomer"
            >
              Remove :loading="removeCustomerLoading"
            </v-btn>
          </div>
        </template>
      </Dialog>
      <Snackbar
        :snackbar="snackbar"
        :text="snackbarText"
        @snackbarClosed="snackbar = false"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dialog from "@/components/global/Dialog";
import Snackbar from "@/components/global/Snackbar";
import CustomerForm from "@/components/forms/CustomerForm";

export default {
  name: "Content",
  components: { Dialog, Snackbar, CustomerForm },
  props: {
    search: {
      type: String,
      default: "",
    },
    addDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        { text: "#", value: "id" },
        { text: "Customer", value: "customer" },
        { text: "Phone", value: "phone" },
        { text: "Website", value: "website" },
        { text: "Company Name", value: "company" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      formValid: true,
      editDialog: false,
      deleteDialog: false,
      customer: {},
      contacts: [],
      customerFormKey: 0,
      tableKey: 0,
      snackbar: false,
      snackbarText: "",
      deleteCustomerLoading: false,
      updateCustomerLoading: false,
      removeCustomerLoading: false,
    };
  },

  computed: {
    ...mapGetters({
      getAllContacts: "GET_ALL_CONTACTS",
    }),
    filteredContacts() {
      const filteredContacts = this.contacts;
      if (this.search) {
        return filteredContacts.filter((user) => {
          return user.customer
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
      return filteredContacts;
    },
  },

  watch: {
    addDialog(newValue) {
      if (!newValue) return;
      for (const prop of Object.getOwnPropertyNames(this.customer)) {
        delete this.customer[prop];
      }
      this.customerFormKey++;
    },
  },

  async mounted() {
    await this.fetchUsers();
    this.contacts = await this.getAllContacts;
  },

  methods: {
    ...mapActions({
      fetchUsers: "FETCH_USERS",
      updateUser: "UPDATE_USER",
      addUser: "ADD_USER",
      removeUser: "REMOVE_USER",
    }),
    closeDialog() {
      this.editDialog = false;
      this.deleteDialog = false;
      this.$emit("addDialogClose", false);
    },
    openEditDialog(item) {
      Object.assign(this.customer, item.item);
      this.customerFormKey++;
      this.editDialog = true;
    },
    openDeleteDialog(item) {
      Object.assign(this.customer, item.item);
      this.customerFormKey++;
      this.deleteDialog = true;
    },
    async updateCustomer() {
      if (!this.$refs.form.validate()) return;
      const customerName = this.customer.customer;
      this.updateCustomerLoading = true;
      await this.updateUser(this.customer);
      this.snackbarText = `Updated customer ${customerName}.`;
      this.snackbar = true;
      this.editDialog = false;
      this.tableKey++;
      this.updateCustomerLoading = false;
      this.closeDialog();
    },
    async addCustomer() {
      if (!this.$refs.form.validate()) return;
      const customerName = this.customer.customer;
      this.addCustomerLoading = true;
      await this.addUser(this.customer);
      this.snackbarText = `Added customer ${customerName}.`;
      this.snackbar = true;
      this.addCustomerLoading = false;
      this.closeDialog();
    },
    async removeCustomer() {
      const customerName = this.customer.customer;
      this.removeCustomerLoading = true;

      await this.removeUser(this.customer.id);
      this.snackbarText = `Deleted customer ${customerName}.`;
      this.snackbar = true;
      this.removeCustomerLoading = false;

      this.closeDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
#content {
  height: -webkit-fill-available;

  .table {
    margin: 20px;
  }
  .v-btn.action-buttons {
    background-color: #f1f5f8;
    padding: 4px;
    border-radius: 4px;
    height: 30px;
    width: 30px;
    margin-right: 8px;
  }
  .status {
    &.status-info {
      background-color: #ede4ff;
      color: #8464c4;
    }
    &.status-pending,
    &.status-canceled {
      background-color: #e0f0ff;
      color: #3c79b3;
    }
    &.status-delivered,
    &.status-danger {
      background-color: #ffe2e6;
      color: #b64352;
    }
  }
}
.delete-message {
  font-size: 16px;
}
.v-btn {
  text-transform: none !important;
}

@media screen and (max-width: 600px) {
  #content {
    .v-btn.action-buttons {
      height: 35px;
      width: 100px;
    }
  }
}
</style>
