<template>
  <v-snackbar v-model="localSnackbar" :timeout="timeout">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    text: {
      type: String,
      default: "",
    },
    snackbar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localSnackbar: false,
      timeout: 2000,
    };
  },

  watch: {
    snackbar(newValue) {
      this.localSnackbar = newValue;
    },
    localSnackbar(newValue) {
      if (newValue) return;
      this.$emit("snackbarClosed", newValue);
    },
  },
};
</script>

<style></style>
