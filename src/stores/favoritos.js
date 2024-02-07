import { ref, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useBebidasStore } from './bebidas';
export const useFavoritosStore = defineStore('favoritos', () => {

    const bebidas = useBebidasStore()
    const favoritos = ref([])

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })
    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })
    const sincronizarLocalStorage = () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }
    function handleClickFavorito() {
        favoritos.value.push(bebidas.receta)
    }
    return {
        favoritos,
        handleClickFavorito
    }
})