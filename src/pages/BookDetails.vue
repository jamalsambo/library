<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h5">{{ book.title }}</div>
        <div class="text-subtitle2">Autor: {{ book.author }} — {{ book.year }}</div>
      </q-card-section>

      <q-card-section>
        <p>{{ book.description }}</p>
        <p>Categoria: <strong>{{ getCategoryName(book.categoryId) }}</strong></p>
        <p>Cópias disponíveis: <strong>{{ book.availableCopies }}</strong></p>
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="Voltar" @click="$router.back()" />
        <q-btn color="primary" label="Reservar (mock)" @click="reserve" :disable="!canReserve" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLibraryStore } from 'src/stores/libraryStore'

const route = useRoute()
const store = useLibraryStore()
onMounted(() => store.loadMockData())

const book = store.getBookById(route.params.id) || {}
const getCategoryName = id => {
  const c = store.categories.find(x => x.id === id)
  return c ? c.name : '—'
}
const canReserve = book.availableCopies > 0

const reserve = () => {
  if (!store.currentUser) {
    return window.alert('Precisa entrar (login) para reservar.')
  }
  const ok = store.reserveBook(book.id)
  window.alert(ok ? 'Reserva efetuada (mock).' : 'Não foi possível reservar.')
}
</script>
