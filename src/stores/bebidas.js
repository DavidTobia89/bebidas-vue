import { ref, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '../service/APIService'


export const useBebidasStore = defineStore('bebidas', () => {

    const categorias = ref([])
    const busqueda = reactive({
            nombre: '',
            categoria:''
    })
    const recetas = ref([])
    onMounted(async function() {
        const {data: {drinks}} = await ApiService.obtenerCategorias()
        categorias.value = drinks
    })

    async function obtenerRecetas() {
            const {data:{drinks} }= await ApiService.buscarRecetas(busqueda)
            recetas.value = drinks
    }

    return {
        categorias, busqueda, obtenerRecetas, recetas
    }
})