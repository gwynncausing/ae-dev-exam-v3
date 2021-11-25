<template>
  <div id="content">
    <div class="table">
      <v-data-table
        :headers="headers"
        :items="filteredContacts"
        sort-by="calories"
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
          <v-btn icon class="success white--text">
            <v-icon
              small
              title="Edit Customer"
              @click="openEditDialog({ item })"
            >
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            icon
            @click="openDeleteDialog({ item })"
            class="red darken-2 white--text"
          >
            <v-icon small title="Delete Customer"> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <Dialog :dialog="editDialog" @closeDialog="editDialog = false">
        <template v-slot:title> Edit Customer </template>
        <template v-slot:body>
          <CustomerForm
            :customer="customer"
            :editUser="true"
            :key="'customerFormKey' + customerFormKey"
            @updated="customer = $event"
          />
        </template>
        <template v-slot:actions>
          <div class="d-flex">
            <v-btn class="grey lighten-5" @click="editDialog = false">
              Cancel
            </v-btn>
            <v-btn color="success" @click="updateCustomer">Update</v-btn>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dialog from "@/components/global/Dialog";
import CustomerForm from "@/components/forms/CustomerForm";

export default {
  name: "Content",
  components: { Dialog, CustomerForm },
  props: {
    search: {
      type: String,
      default: "",
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
      editDialog: false,
      deleteDialog: false,
      customer: {},
      contacts: [],
      customerFormKey: 0,
      tableKey: 0,
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

  async mounted() {
    await this.fetchUsers();
    this.contacts = await this.getAllContacts;
  },

  methods: {
    ...mapActions({
      fetchUsers: "FETCH_USERS",
      updateUser: "UPDATE_USER",
    }),

    openEditDialog(item) {
      Object.assign(this.customer, item.item);
      this.customerFormKey++;
      this.editDialog = true;
    },
    openDeleteDialog(item) {
      this.deleteDialog = true;
    },
    async updateCustomer() {
      await this.updateUser(this.customer);
      // this.contacts = await this.getAllContacts;
      this.editDialog = false;
      this.tableKey++;
      // console.log({ contacts: await this.getAllContacts });
      console.log(this.$store);
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
  .v-btn {
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
</style>
