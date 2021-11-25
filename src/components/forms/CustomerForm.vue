<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-show="editUser"
      v-model="localCustomer.id"
      label="Id"
      disabled
    />
    <v-text-field
      v-model="localCustomer.customer"
      :rules="nameRules"
      label="Name"
      name="name"
      :disabled="editUser"
      @keyup="update"
    />

    <v-text-field
      v-model="localCustomer.phone"
      :rules="phoneRules"
      label="Phone"
      name="phone"
      @keyup="update"
    />
    <v-text-field
      v-model="localCustomer.website"
      :rules="websiteRules"
      label="Website"
      name="website"
      @keyup="update"
    />
    <v-text-field
      v-model="localCustomer.company"
      :rules="companyRules"
      label="Company"
      name="company"
      @keyup="update"
    />

    <v-select
      v-model="localCustomer.status"
      :items="status"
      :rules="[(v) => !!v || 'Status is required']"
      label="Status"
      @change="update"
    />
  </v-form>
</template>

<script>
export default {
  name: "CustomerForm",
  props: {
    editUser: {
      type: Boolean,
      default: false,
    },
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      nameRules: [(v) => !!v || "Name is required"],
      phoneRules: [(v) => !!v || "Phone is required"],
      websiteRules: [(v) => !!v || "Website is required"],
      companyRules: [(v) => !!v || "Company is required"],
      status: ["Info", "Pending", "Canceled", "Delivered", "Danger"],
      localCustomer: {},
    };
  },

  created() {
    Object.assign(this.localCustomer, this.customer);
  },

  methods: {
    update() {
      this.$emit("updated", this.localCustomer);
    },
  },
};
</script>

<style></style>
