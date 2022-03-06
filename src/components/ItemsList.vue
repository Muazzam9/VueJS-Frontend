<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Item List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(item, index) in Items"
          :key="index"
          @click="setActiveItem(item, index)"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="move-button">
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllItems">
        Remove All
      </button>
      <button class="m-3 btn btn-sm btn-danger" @click="refreshList">
        Refresh
      </button>
       <div v-if="currentItem">
        <div>
        <router-link :to="'/Items/' + currentItem.id" class="m-3 btn btn-sm btn-danger">Edit</router-link>
      </div>
    </div>
    </div>
    </div>
    <div class="col-md-6">
      <div v-if="currentItem">
        <h4>Details</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentItem.id }}
        </div>
        <div>
          <label><strong>Title:</strong></label> {{ currentItem.title }}
        </div>
        
        <div>
           <div class="thing-details-keys">
          <label><strong>Keywords:</strong></label> 
          <div 
                v-for="keyword in currentItem.keywords"
                :key="keyword"
                class="keyword"
            >

          {{ keyword }}
          </div>
          </div>

        </div>
        <div class="flagged">
          <label><strong>Status:</strong></label> {{ currentItem.flagged ? "Flagged" : "Unflagged" }}
        </div>

        
      </div>
      <div v-else>
        <br />
        <p>Please click on an item...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ItemDataService from "../services/ItemDataService";

export default {
  name: "items-list",
  data() {
    return {
      Items: [],
      currentItem: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveItems() {
      ItemDataService.getAll()
        .then(response => {
          this.Items = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveItems();
      this.currentItem = null;
      this.currentIndex = -1;
    },

    setActiveItem(item, index) {
      this.currentItem = item;
      this.currentIndex = index;
    },

    removeAllItems() {
      ItemDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      ItemDataService.findByTitle(this.title)
        .then(response => {
          this.Items = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveItems();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
  padding: 10px;
}
.move-button{
          display: flex;
          flex-direction: row;
          padding: 2px;
          position: absolute;
          left: 470px;


}
.thing-details-keys{
            display: flex;
            flex-direction: row;
            
            padding: 0px;

}
.keyword {
  border: 1px solid grey;
                border-radius: 5px;
                border-color:#0d6efd ;
                padding: 0px 8px;
                margin-left: 2px;
                margin-left: 2px;
            
}
.flagged{
  color: red;
}

</style>
