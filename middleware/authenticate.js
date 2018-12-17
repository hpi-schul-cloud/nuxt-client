export default async (ctx) => {
    const { store } = ctx
  
    try {
      await store.dispatch('auth/authenticate')
    } catch (e) {
      store.dispatch('auth/logout')
    }
  }
  