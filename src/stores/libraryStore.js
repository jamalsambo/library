import { defineStore } from 'pinia'
import { users, categories, books } from 'src/data/mockLibrary'

export const useLibraryStore = defineStore('library', {
  state: () => ({
    users: [],
    categories: [],
    books: [],
    currentUser: null,
    loans: [] // { id, userId, bookId, loanDate, dueDate, returned }
  }),
  actions: {
    loadMockData() {
      this.users = users
      this.categories = categories
      this.books = books
      // some mock loans
      this.loans = [
        { id: 1, userId: 1, bookId: 2, loanDate: '2025-07-01', dueDate: '2025-07-15', returned: false },
        { id: 2, userId: 2, bookId: 1, loanDate: '2025-06-20', dueDate: '2025-07-04', returned: true }
      ]
    },
    getBookById(id) {
      return this.books.find(b => b.id === Number(id))
    },
    login(email) {
      const u = this.users.find(x => x.email === email)
      if (u) this.currentUser = u
      return !!u
    },
    logout() { this.currentUser = null },
    reserveBook(bookId) {
      // mock: decrement availableCopies
      const b = this.getBookById(bookId)
      if (b && b.availableCopies > 0) {
        b.availableCopies -= 1
        const newLoan = { id: Date.now(), userId: this.currentUser?.id || null, bookId, loanDate: new Date().toISOString().slice(0,10), dueDate: null, returned: false }
        this.loans.push(newLoan)
        return true
      }
      return false
    }
  }
})
