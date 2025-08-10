<template>
  <q-page class="q-pa-md">
    <h4>Histórico geral (mock)</h4>
    <q-list bordered>
      <q-item v-for="l in store.loans" :key="l.id">
        <q-item-section>
          <q-item-label>{{ store.getBookById(l.bookId)?.title || '—' }}</q-item-label>
          <q-item-label caption>Usuário: {{ getUserName(l.userId) }} | Empréstimo: {{ l.loanDate }} | Devolvido: {{ l.returned ? 'Sim' : 'Não' }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLibraryStore } from 'src/stores/libraryStore'
const store = useLibraryStore()
onMounted(() => store.loadMockData())
const getUserName = id => store.users.find(u => u.id === id)?.name || '—'
</script>
