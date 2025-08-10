<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title @click="router.push('/books')">📚 Biblioteca Virtual</q-toolbar-title>

        <!-- Ícone de menu -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="q-mr-sm lt-md"
          @click="drawerOpen = !drawerOpen"
        />

        <!-- Navegação com router-link -->
        <div class="gt-sm row items-center">
          <div class="q-gutter-sm">
            <q-btn flat to="/books" label="Livros" />
            <q-btn flat to="/loans" label="Empréstimos" />
            <q-btn flat to="/history" label="Histórico" />
            <q-btn flat to="/admin" label="Admin" v-if="isStaff" />
          </div>
          <div style="margin-left: auto">
            <q-btn flat @click="goLogin" :label="userLabel" />
          </div>
        </div>
      </q-toolbar>

      <!-- Drawer para mobile -->
      <q-drawer v-model="drawerOpen" side="left" overlay>
        <q-list>
          <q-item class="text-black" to="/books" clickable v-close-popup>
            <q-item-section>Livros</q-item-section>
          </q-item>

          <q-item class="text-black" clickable to="/loans" v-close-popup>
            <q-item-section>Empréstimos</q-item-section>
          </q-item>

          <q-item class="text-black" clickable to="/history" v-close-popup>
            <q-item-section>Histórico</q-item-section>
          </q-item>

          <q-item class="text-black" to="/admin" clickable v-close-popup v-if="isStaff">
            <q-item-section>Admin</q-item-section>
          </q-item>

          <q-item class="text-black" clickable @click="goLogin" v-close-popup>
            <q-item-section>{{ userLabel }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-center">
      <div class="q-pa-sm">© Biblioteca Virtual - Template</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLibraryStore } from 'src/stores/libraryStore'
import { ref } from 'vue'
const router = useRouter()
const store = useLibraryStore()
const drawerOpen = ref(false)
store.loadMockData()
const goLogin = () => router.push('/login')
const userLabel = store.currentUser ? store.currentUser.name : 'Entrar'
const isStaff = !!(store.currentUser && store.currentUser.role === 'staff')
</script>
<style scoped>
.logo {
  width: 120px;
}

.full-height {
  height: 400px;
}

/* Para ocultar as abas em telas pequenas */
.lt-md {
  display: none;
}

/* Para exibir as abas apenas em telas maiores */
.gt-sm {
  display: flex;
}

/* Estilos responsivos usando Quasar */
@media (max-width: 600px) {
  .lt-md {
    display: flex;
  }
  .gt-sm {
    display: none;
  }
}
</style>
