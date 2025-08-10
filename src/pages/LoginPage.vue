<template>
  <q-page class="flex flex-center">
    <q-card style="max-width: 800px; width: 100%">

      <!-- Cabeçalho -->
      <q-card-section class="bg-red text-white row items-center justify-between">
        <div class="text-subtitle1">Entrar no repositório</div>
        <q-btn flat dense class="text-white" label="Ajuda..." />
      </q-card-section>

      <!-- Mensagem de instrução -->
      <q-card-section>
        <div class="q-mb-md">
          Introduza o seu endereço de correio electrónico e palavra de acesso no formulário em baixo.
        </div>

        <!-- Formulário -->
        <q-form @submit.prevent="login">
          <div class="q-mb-md">
            <q-input
              v-model="email"
              label="Endereço de correio electrónico:"
              outlined
              clearable
            >
              <template #append>
                <q-icon name="email" color="red" />
              </template>
            </q-input>
          </div>

          <div class="q-mb-md">
            <q-input
              v-model="password"
              label="Palavra de acesso:"
              type="password"
              outlined
              clearable
            >
              <template #append>
                <q-icon name="lock" color="red" />
              </template>
            </q-input>
          </div>

          <!-- Botão Entrar -->
          <div class="q-mt-lg flex flex-center">
            <q-btn
              label="Entrar"
              color="red"
              type="submit"
              no-caps
              class="q-px-xl"
            />
          </div>
        </q-form>

        <!-- Link Esqueceu -->
        <div class="q-mt-md">
          <q-btn
            flat
            color="primary"
            label="Esqueceu a sua palavra de acesso?"
            class="q-pa-none"
            to="/reset-password"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function login() {
  console.log('Email:', email.value)
  console.log('Senha:', password.value)
  // lógica de login aqui
}
</script>
