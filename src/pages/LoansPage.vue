<template>
  <q-page class="q-pa-md">
    <h4>Empréstimos (mock)</h4>
    <div v-if="!store.currentUser">
      <q-banner dense>Faça login para ver seus empréstimos.</q-banner>
    </div>
    <div v-else>
      <q-table :rows="userLoans" :columns="cols" row-key="id" />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useLibraryStore } from 'src/stores/libraryStore'
const store = useLibraryStore()
onMounted(() => store.loadMockData())
const userLoans = computed(() => store.loans.filter(l => l.userId === (store.currentUser?.id || -1)))
const cols = [
  { name: 'book', label: 'Livro', field: row => store.getBookById(row.bookId)?.title || '—' },
  { name: 'loanDate', label: 'Data Empréstimo', field: 'loanDate' },
  { name: 'dueDate', label: 'Data Devolução', field: 'dueDate' },
  { name: 'returned', label: 'Devolvido', field: row => row.returned ? 'Sim' : 'Não' }
]
</script>
