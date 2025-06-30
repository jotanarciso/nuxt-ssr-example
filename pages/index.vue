<template>
  <div class="container">
    <h1>Exemplos de SSR com Nuxt.js</h1>
    <p>Escolha um exemplo para testar o Server-Side Rendering:</p>
    
    <div class="menu">
      <NuxtLink to="/ssr-examples" class="menu-item">
        <h3>📄 Exemplos de SSR</h3>
        <p>Demonstração de renderização server-side</p>
      </NuxtLink>
      
      <NuxtLink to="/users" class="menu-item">
        <h3>👥 Lista de Usuários</h3>
        <p>SSR com dados dinâmicos de uma API</p>
      </NuxtLink>
      
      <NuxtLink to="/blog" class="menu-item">
        <h3>📝 Blog</h3>
        <p>Posts renderizados no servidor</p>
      </NuxtLink>
    </div>
    
    <div class="info">
      <h2>Sobre SSR</h2>
      <p>
        Server-Side Rendering (SSR) renderiza as páginas no servidor, 
        proporcionando melhor SEO e performance inicial.
      </p>
      <ul>
        <li>✅ Melhor SEO</li>
        <li>✅ Carregamento inicial mais rápido</li>
        <li>✅ Melhor experiência para usuários com conexão lenta</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Meta tags para SEO
useSeoMeta({
  title: 'Exemplos de SSR - Nuxt.js',
  description: 'Demonstrações de Server-Side Rendering com Nuxt.js',
  ogTitle: 'Exemplos de SSR - Nuxt.js',
  ogDescription: 'Demonstrações de Server-Side Rendering com Nuxt.js'
})

// Dados renderizados no servidor
const serverTime = await $fetch('/api/hello')
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

.menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.menu-item {
  display: block;
  padding: 1.5rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background: white;
}

.menu-item:hover {
  border-color: #00dc82;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 220, 130, 0.15);
}

.menu-item h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.menu-item p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.info {
  margin-top: 3rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.info h2 {
  color: #2c3e50;
  margin-top: 0;
}

.info ul {
  list-style: none;
  padding: 0;
}

.info li {
  padding: 0.25rem 0;
  color: #2c3e50;
}
</style>
