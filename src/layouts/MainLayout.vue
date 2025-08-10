<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
       <q-toolbar-title class="row items-center">
          <q-avatar>
            <img src="../assets/logo.png" />
          </q-avatar>
          <span class="q-ml-md">Biblioteca Virtual</span>
        </q-toolbar-title>

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

    <footer class="bg-primary">
     <div class="bg-primary text-white">
    <q-toolbar>
      <div class="row full-width q-pa-md">
        <div class="col-12 col-md-4 q-pa-md">
          <div class="text-h6 q-mb-md">Contatos</div>
          <div class="q-mb-sm">
            <q-icon name="phone" size="1rem" class="q-mr-sm" />
            <span
              > 84 026 6518  /
              82 56 68 060  /
              21420247</span
            >
          </div>
          <div class="q-mb-sm">
            <q-icon name="email" size="1rem" class="q-mr-sm" />
            <span>catmoz@geral.com</span>
          </div>
        </div>
        <div class="col-12 col-md-4 q-pa-md">
          <div class="text-h6 q-mb-md">Localização</div>
          <div class="q-mb-sm">
            <q-icon name="place" size="1rem" class="q-mr-sm" />
            <span>{{ institution?.address }}</span>
          </div>
          <div>
            <q-icon name="map" size="1rem" class="q-mr-sm" />
            <span
              >{{ institution?.neighborhood }},
              {{ institution?.district?.name }}</span
            >
          </div>
        </div>
        <div class="col-12 col-md-4 q-pa-md text-white">
          <div class="text-h6 q-mb-md">Redes Sociais</div>
          <div class="row q-gutter-sm">
            <q-btn round flat icon="fab fa-facebook" />
            <q-btn round flat icon="fab fa-instagram" />
            <q-btn round flat icon="fab fa-twitter" />
            <q-btn round flat icon="fab fa-youtube" />
            <q-btn round flat icon="fab fa-linkedin" />
          </div>
        </div>
      </div>
    </q-toolbar>
    <div class="text-center q-pa-sm bg-primary">
      © 2025. Instituto Medio Tecnico Profissional
    </div>
  </div>
    </footer>
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
