<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="item.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="keywords">Keywords</label>
        <input
          class="form-control"
          id="keywords"
          required
          v-model="item.keywords"
          name="keywords"
        />
      </div>
      <div class="sub-button">
      <button @click="saveItem" class="btn btn-success">Submit</button>
      </div>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newItem">Add</button>
    </div>
  </div>
</template>

<script>
import ItemDataService from "../services/ItemDataService";

export default {
  name: "add-item",
  data() {
    return {
      item: {
        id: null,
        title: "",
        keywords: "",
        published: false
        
      },
      submitted: false
    };
  },
  methods: {
    saveItem() {
      var data = {
        title: this.item.title,
        keywords: this.item.keywords.split(",")
      };

      ItemDataService.create(data)
        .then(response => {
          this.item.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newItem() {
      this.submitted = false;
      this.item = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.sub-button{
  padding: 10px;
}
</style>
