import http from "../http-common";

class ItemDataService {
  getAll() {
    return http.get("/Items");
  }

  get(id) {
    return http.get(`/Items/${id}`);
  }

  create(data) {
    return http.post("/Items", data);
  }

  update(id, data) {
    return http.put(`/Items/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Items/${id}`);
  }

  deleteAll() {
    return http.delete(`/Items`);
  }

  findByTitle(title) {
    return http.get(`/Items?title=${title}`);
  }
}

export default new ItemDataService();

// This is my frontend running on a seperate localhost server.