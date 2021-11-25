<template>
  <v-navigation-drawer
    :mini-variant.sync="localDrawer"
    permanent
    id="navigation-drawer"
    :class="
      $vuetify.breakpoint.name === 'xs' && localDrawer === true
        ? 'hidden-dialog'
        : ''
    "
  >
    <v-list-item class="logo">
      <v-btn v-if="localDrawer" icon @click.stop="localDrawer = !localDrawer">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-list-item-title><strong>Advance Exteriors</strong></v-list-item-title>

      <v-btn v-if="!localDrawer" icon @click.stop="localDrawer = !localDrawer">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-list dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <span>Dashboard</span>
          </v-list-item-content>
        </v-list-item>

        <v-subheader v-if="!localDrawer">CUSTOM</v-subheader>
        <!-- <v-divider v-else></v-divider> -->

        <v-list-item v-for="(item, index1) in items1" :key="item.text + index1">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <span v-text="item.text"></span>
          </v-list-item-content>
        </v-list-item>

        <v-subheader v-if="!localDrawer">FEATURES</v-subheader>
        <!-- <v-divider v-else></v-divider> -->

        <v-list-item v-for="(item, index2) in items2" :key="item.text + index2">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <span v-text="item.text"></span>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
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
      selectedItem: 0,
      localDrawer: false,
    };
  },

  watch: {
    drawer: {
      handler(newValue) {
        this.localDrawer = newValue;
      },
      immediate: true,
    },
    localDrawer(newValue) {
      this.$emit("drawerClicked", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
#navigation-drawer {
  display: block;
  position: fixed;
  height: 100% !important;
  min-width: 80px;
  background-color: $black-200;
  overflow: hidden;
  z-index: 10;
  transform: translateX(0%) !important;

  .v-list-item {
    padding-left: 25px;
    padding-right: 25px;
    font-size: 14px;
    margin-bottom: 0.5rem;
    transition: all 0.3s linear;

    &.logo {
      padding-left: 20px;
      background-color: $black-100;
    }
  }
  button,
  .v-list-item__title,
  .v-icon {
    color: $white;
  }
  .v-subheader,
  span {
    color: $black-300;
  }
  .v-subheader {
    padding-left: 25px;
  }
  .v-item--active {
    .v-icon {
      color: $blue-100;
    }
    span {
      color: $white;
    }
  }
  .v-list-item--link:before {
    background-color: $black-100;
  }
  hr {
    border-color: $black-300;
  }
}

@media screen and (max-width: 500px) {
  #navigation-drawer {
    &.hidden-dialog {
      transform: translateX(-100%) !important;
    }
    .v-list-item {
      font-size: 18px;
    }
  }
}
</style>

<style lang="scss">
.v-navigation-drawer__content {
  overflow: hidden;
}
</style>
