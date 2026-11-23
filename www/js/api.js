class ApiService {
  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl;
  }

  async getCategories() {
    const res = await fetch(`${this.baseUrl}/categories`);
    if (!res.ok) throw new Error("Error al obtner las categorias");
    return await res.json();
  }

  async createCategory(name) {
    const res = await fetch(`${this.baseUrl}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Error al crear la categoría");
    return await res.json();
  }

  async deleteCategory(id) {
    const res = await fetch(`${this.baseUrl}/categories/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw Error("Error al eliminar categoria");
  }

  async getSitesByCategory(catId) {
    const res = await fetch(`${this.baseUrl}/sites?categoryId=${catId}`);
    if (!res.ok) throw new Error("Error al obtner los sitios");
    //devuelve todos los sitios y los filta por la categoria
    const todosLosSitios = await res.json();
    return todosLosSitios.filter((sitio) => sitio.categoryId == catId);
  }

  async createSite(data) {
    const { categoryId, name, url, user, password} = data;
    const res = await fetch(`${this.baseUrl}/categories/${categoryId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, url, user, password }),
    });
    if (!res.ok) throw new Error("Error al crear sitio");
    return await res.json();
  }

  async deleteSite(id) {
    const res = await fetch(`${this.baseUrl}/sites/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar sito");
  }
}
const api = new ApiService();