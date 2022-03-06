<template>
  <div v-if="currentItem" class="edit-form">
    <h4>Details</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentItem.title"
        />
      </div>
      <div class="form-group">
        <label for="keywords">Keywords</label>
        <input type="text" class="form-control" id="keywords"
          v-model="currentItem.keywords"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentItem.flagged ? "Flagged" : "Unflagged" }}
      </div>
    </form>

    <button class="m-3 btn btn-sm btn-danger" 
      v-if="currentItem.flagged"
      @click="updatePublished(false)"
    >
      Unflag
    </button>
    <button v-else class="m-3 btn btn-sm btn-danger" 
      @click="updatePublished(true)"
    >
      Flag
    </button>

    <button class="m-3 btn btn-sm btn-danger" 
      @click="deleteItem"
    >
      Delete
    </button>

    <button type="submit" class="m-3 btn btn-sm btn-danger" 
      @click="updateItem"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Item...</p>
  </div>
</template>

<script>
import ItemDataService from "../services/ItemDataService";

export default {
  title: "item",
  data() {
    return {
      currentItem: null,
      message: ''
    };
  },
  methods: {
    getItem(id) {
      ItemDataService.get(id)
        .then(response => {
          this.currentItem = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentItem.id,
        title: this.currentItem.title,
        keywords: this.currentItem.keywords,
        flagged: status
      };

      ItemDataService.update(this.currentItem.id, data)
        .then(response => {
          this.currentItem.flagged = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateItem() {
      ItemDataService.update(this.currentItem.id, this.currentItem)
        .then(response => {
          console.log(response.data);
          this.message = 'The item was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteItem() {
      ItemDataService.delete(this.currentItem.id)
        .then(response => {
          console.log(response.data);
          this.message = 'The item was deleted successfully!';
          this.$router.push({ name: "Items" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getItem(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

