<template>
  <v-dialog v-model="localDialog" :width="width">
    <v-card>
      <v-card-title>
        <slot name="title"></slot>
      </v-card-title>

      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>

      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 500,
    },
  },

  data() {
    return {
      localDialog: false,
    };
  },

  watch: {
    dialog(newValue) {
      this.localDialog = newValue;
    },
    localDialog(newValue) {
      if (!newValue) this.$emit("closeDialog", false);
    },
  },
};
</script>

<style></style>
