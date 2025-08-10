<template>
  <q-page class="q-pa-md" padding>
    <!-- Filtro no topo -->
    <img
    src="../assets/img-library.png"
    ratio="3/2"
    spinner-color="primary"
    class="responsive-image"
  />
    <div class="q-mb-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Filtros</div>
        </q-card-section>

        <q-card-section>
          <q-select
            filled
            v-model="selectedCategory"
            :options="categoryOptions"
            label="Filtrar por categoria"
            emit-value
            map-options
            clearable
          />
        </q-card-section>

        <q-separator />
      </q-card>
    </div>

    <!-- Lista de livros em cards -->
    <div class="row q-col-gutter-md">
      <div
        v-for="book in paginatedBooks"
        :key="book.id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer"
        @click="openDetails(book.id)"
      >
        <q-card>
          <img
            :src="`https://placehold.co/600x400?text=${encodeURIComponent(book.title)}`"
            :alt="book.title"
            ratio="3/2"
            spinner-color="primary"
          />
          <q-card-section>
            <div class="text-h6">{{ book.title }}</div>
            <q-item-label caption>
              Autor: {{ book.author }} | Ano: {{ book.year }} | Categoria:
              {{ getCategoryName(book.categoryId) }}
            </q-item-label>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Paginação -->
    <div class="q-mt-lg flex justify-center">
      <q-pagination
        v-model="currentPage"
        :max="maxPage"
        color="primary"
        boundary-numbers
        max-pages="7"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLibraryStore } from 'src/stores/libraryStore'

const store = useLibraryStore()
const router = useRouter()
const selectedCategory = ref(null)
const currentPage = ref(1)
const perPage = 8

onMounted(() => store.loadMockData())

const categoryOptions = computed(() =>
  store.categories.map((c) => ({ label: c.name, value: c.id })),
)

const getCategoryName = (id) => {
  const c = store.categories.find((x) => x.id === id)
  return c ? c.name : '—'
}

const filteredBooks = computed(() => {
  if (!selectedCategory.value) return store.books
  return store.books.filter((b) => b.categoryId === selectedCategory.value)
})

const maxPage = computed(() => Math.ceil(filteredBooks.value.length / perPage))

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredBooks.value.slice(start, start + perPage)
})

const openDetails = (id) => router.push({ path: `/books/${id}` })
</script>
<style scoped>


@media (max-width: 600px) { /* telas de celular */
  .responsive-image {
    max-width: 250px; /* reduz no telemóvel */
  }
}
</style>
