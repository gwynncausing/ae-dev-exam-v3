<template>
  <div id="content">
    <div class="table">
      <v-data-table
        :headers="headers"
        :items="filteredContacts"
        sort-by="calories"
        class="elevation-1"
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
          <v-btn icon>
            <v-icon small title="Edit Customer" @click="openDialog({ item })">
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon small title="Delete Customer"> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <Dialog :dialog="editDialog" @closeDialog="editDialog = false" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dialog from "@/components/global/Dialog";

export default {
  name: "Content",
  components: { Dialog },
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
    };
  },

  computed: {
    ...mapGetters({
      contacts: "getAllContacts",
    }),
    filteredContacts() {
      const filteredContacts = [];
      for (const user of this.contacts) {
        filteredContacts.push({
          id: user.id,
          customer: user.name,
          phone: user.phone,
          website: user.website,
          company: user.company.name,
          status: this.getRandomStatus(),
        });
      }
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
  },

  methods: {
    ...mapActions({
      fetchUsers: "fetchUsers",
    }),
    getRandomStatus() {
      const status = ["Info", "Pending", "Canceled", "Delivered", "Danger"];
      const random = Math.floor(Math.random() * status.length);
      return status[random];
    },
    openDialog(item) {
      console.log(item);
      this.editDialog = true;
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
