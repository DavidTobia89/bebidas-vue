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
    function sincronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }
    function existeFavorito(id) {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
    }
    function handleClickFavorito() {
        if (existeFavorito(bebidas.receta.idDrink )){

        } else {
            favoritos.value.push(bebidas.receta)
        }
        
    }
    return {
        favoritos,
        handleClickFavorito, existeFavorito
    }
})