<template>
  <v-dialog v-model="drawer" width="500" class="navigation-dialog">
    <v-card>
      <v-card-title class="title"> Advance Exterior </v-card-title>

      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item link @click="$emit('drawerClicked', true)">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <span>Dashboard</span>
            </v-list-item-content>
          </v-list-item>

          <v-subheader v-if="drawer">CUSTOM</v-subheader>
          <v-divider v-else></v-divider>

          <v-list-item
            v-for="(item, index1) in items1"
            :key="item.text + index1"
            @click="$emit('drawerClicked', true)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span v-text="item.text"></span>
            </v-list-item-content>
          </v-list-item>

          <v-subheader v-if="drawer">FEATURES</v-subheader>
          <v-divider v-else></v-divider>

          <v-list-item
            v-for="(item, index2) in items2"
            :key="item.text + index2"
            @click="$emit('drawerClicked', true)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span v-text="item.text"></span>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
    items1: {
      type: Array,
      required: true,
    },
    items2: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // dialog: false,
    };
  },
  watch: {
    drawer(newVal) {
      console.log({ newVal });
    },
  },
};
</script>

<style lang="scss">
.title {
  background-color: $black-100;
  color: $white;
}

.v-list {
  background-color: $black-200 !important;
  button,
  .v-list-item__title,
  .v-icon {
    color: $white;
  }
  .v-list-item--link:before {
    background-color: $black-100 !important;
  }
  .v-subheader,
  span {
    color: $black-300;
  }
  .v-subheader {
    margin-left: 8px;
  }
  .v-item--active {
    .v-icon {
      color: $blue-100;
    }
    span {
      color: $white;
    }
  }
}
</style>
