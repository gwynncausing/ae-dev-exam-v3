<template>
  <div id="header">
    <section class="upper-panel">
      <v-btn @click="$emit('drawerClicked', true)" class="drawer">
        <v-icon>mdi-menu</v-icon>
        AE
      </v-btn>
      <Button color="white-100" class="blue-text">Pages</Button>
      <div>
        <v-icon>mdi-magnify</v-icon>
        <v-icon>mdi-message</v-icon>
        <span>flag</span>
        <span>Hi, <strong>Admin</strong></span>
        <v-avatar>A</v-avatar>
      </div>
    </section>
    <hr />
    <section class="lower-panel">
      <div class="contact-search">
        <strong>Contacts</strong>
        |
        <div class="search-input">
          <input
            class="search"
            type="text"
            placeholder="Search..."
            @input="$emit('searchChanged', $event.target.value)"
          />
          <v-icon class="search-icon">mdi-magnify</v-icon>
        </div>
      </div>
      <div>
        <Button
          color="white-100"
          class="blue-text add-contact"
          @click="$emit('addDialog', true)"
        >
          Add Contact
        </Button>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "@/components/global/Button";
export default {
  name: "Header",
  components: { Button },
};
</script>
<style lang="scss" scoped>
#header {
  width: 100%;
  background-color: #fff;
  .blue-text {
    color: $blue-100;
  }
}
.upper-panel {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .drawer {
    display: none;
    box-shadow: none;
    background-color: #fff;
    .v-icon {
      padding-right: 4px;
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .v-avatar {
    color: #39b9b3;
    background-color: #c9f7f5;
    border-radius: 8px;
    height: 34px !important;
    min-width: 34px !important;
    width: 34px !important;
    cursor: pointer;
  }
}
.lower-panel {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  div {
    display: flex;
    align-items: center;
    margin: 5px;

    &.contact-search {
      gap: 10px;

      .search-input {
        min-width: 100px;
        position: relative;

        .search {
          position: relative;
          background-color: #f2f6f9;
          padding: 8px 36px 8px 8px;
          outline: none;
          border-radius: 4px;
        }
        .search-icon {
          position: absolute;
          right: 0;
          top: 0;
          margin: 10px;
        }
      }
    }
  }

  .add-contact {
    background-color: #e0f0ff !important;
  }
}

@media screen and (max-width: 500px) {
  #header {
    .upper-panel {
      .drawer {
        display: block;
      }
    }
  }
}
</style>
