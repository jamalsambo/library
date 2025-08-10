import MainLayout from 'src/layouts/MainLayout.vue'
import BooksPage from 'src/pages/BooksPage.vue'
import BookDetails from 'src/pages/BookDetails.vue'
import LoginPage from 'src/pages/LoginPage.vue'
import AdminPage from 'src/pages/AdminPage.vue'
import LoansPage from 'src/pages/LoansPage.vue'
import HistoryPage from 'src/pages/HistoryPage.vue'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/books' },
      { path: 'books', component: BooksPage },
      { path: 'books/:id', component: BookDetails, props: true },
      { path: 'admin', component: AdminPage },
      { path: 'loans', component: LoansPage },
      { path: 'history', component: HistoryPage }
    ]
  },
  {
  path: '/login',
  component: () => import('layouts/LoginLayout.vue'), // layout simples só pro login
  children: [
    { path: '', component: LoginPage }
  ]
}


]
