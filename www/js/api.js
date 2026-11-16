class ApiService {
    constructor(baseUrl = "http://localhost:3000") {
        this.baseUrl = baseUrl;
    }

    async getCategories() {
        const res = await fetch(`${this.baseUrl}/categories`);
        if(!res.ok) throw new Error("Error al obtner las categorias");
        return await res.json();
    }

    async createCategory(name) {
        const res = await fetch(`${this.baseUrl}/categories`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({name}),
        });
        if(!res.ok) throw new Error("Error al crear la categoría");
        return await res.json();
    }

    async deleteCategory(id) {
        const res = await fetch(`${this.baseUrl}/categories/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw Error ("Error al eliminar categoria");
        }
}
const api = new ApiService();