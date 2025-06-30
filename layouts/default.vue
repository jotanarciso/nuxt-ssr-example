<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="logo">
          🚀 Nuxt SSR Examples
        </NuxtLink>
        
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">Início</NuxtLink>
          <NuxtLink to="/ssr-examples" class="nav-link">SSR Examples</NuxtLink>
          <NuxtLink to="/users" class="nav-link">Usuários</NuxtLink>
          <NuxtLink to="/blog" class="nav-link">Blog</NuxtLink>
        </div>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>&copy; 2024 Nuxt SSR Examples - Demonstrações de Server-Side Rendering</p>
    </footer>
  </div>
</template>

<script setup>
// Configurações globais do layout
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  border-bottom: 1px solid #e1e8ed;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.logo:hover {
  color: #00dc82;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #00dc82;
}

.main {
  flex: 1;
  background: #f8f9fa;
}

.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
}

/* Responsivo */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}
</style>

<style>
/* Estilos globais */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: #2c3e50;
}

a {
  color: inherit;
  text-decoration: none;
}

.router-link-active {
  color: #00dc82 !important;
}
</style> 