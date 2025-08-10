<template>
  <q-page class="q-pa-md">
    <div v-if="!isStaff">
      <q-banner dense>Área restrita: precisa ser funcionário.</q-banner>
    </div>

    <div v-else>
      <h4>Admin — Gestão de Livros (mock)</h4>
      <q-table :rows="store.books" :columns="columns" row-key="id">
        <template v-slot:body-cell-actions="props">
          <q-td align="right">
            <q-btn dense flat label="Editar" @click="edit(props.row.id)"/>
            <q-btn dense flat color="negative" label="Remover" @click="remove(props.row.id)"/>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useLibraryStore } from 'src/stores/libraryStore'
const store = useLibraryStore()
onMounted(() => store.loadMockData())
const isStaff = computed(() => !!(store.currentUser && store.currentUser.role === 'staff'))
const columns = [
  { name: 'title', label: 'Título', field: 'title' },
  { name: 'author', label: 'Autor', field: 'author' },
  { name: 'year', label: 'Ano', field: 'year' },
  { name: 'availableCopies', label: 'Cópias', field: 'availableCopies' },
  { name: 'actions', label: 'Ações' }
]
const edit = id => window.alert('Editar mock: ' + id)
const remove = id => {
  const idx = store.books.findIndex(b => b.id === id)
  if (idx > -1) store.books.splice(idx,1)
}
</script>
