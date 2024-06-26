import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBebidasStore } from './bebidas';
import { useModalStore } from './modal';
import { useNotificacionStore} from './notificaciones';
export const useFavoritosStore = defineStore('favoritos', () => {

    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificaciones = useNotificacionStore()
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
    function existeFavorito() {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink )
    }
    function agregarFavoritoFavorito () {
        
        favoritos.value.push(bebidas.receta)
        notificaciones.mostrar = true
        notificaciones.texto = 'Se agrego a favoritos'
    }
    function eliminarFavorito () {
        notificaciones.mostrar = true
        notificaciones.error = true
        notificaciones.texto = 'Se elimino de favoritos'
        return favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink )
    }

    function handleClickFavorito() {
        if (existeFavorito()){
            eliminarFavorito ()
          
        } else {
            agregarFavoritoFavorito ()
          
        }
        modal.handleClickModal() 
    }

    const noFavoritos = computed(()=>favoritos.value.length === 0)
    return {
        favoritos,
        handleClickFavorito, 
        existeFavorito,
        noFavoritos
    }
})