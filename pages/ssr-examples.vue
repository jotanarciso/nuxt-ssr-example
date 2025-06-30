<template>
  <div class="container">
    <h1>Exemplos de SSR</h1>
    <NuxtLink to="/" class="back-link">← Voltar</NuxtLink>
    
    <div class="examples">
      <div class="example-card">
        <h2>🕐 Hora do Servidor</h2>
        <p>Esta hora foi renderizada no servidor:</p>
        <div class="server-time">{{ serverTime.timestamp || serverTime }}</div>
        <small>Recarregue a página para ver a diferença</small>
      </div>

      <div class="example-card">
        <h2>📊 Dados da API</h2>
        <p>Posts carregados via SSR:</p>
        <div class="posts-list">
          <div v-for="post in posts" :key="post.id" class="post-item">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body.slice(0, 100) }}...</p>
          </div>
        </div>
      </div>

      <div class="example-card">
        <h2>🌐 Headers do Request</h2>
        <p>Informações do request renderizadas no servidor:</p>
        <div class="request-info">
          <p><strong>User Agent:</strong> {{ userAgent }}</p>
          <p><strong>IP:</strong> {{ clientIP }}</p>
          <p><strong>Timestamp:</strong> {{ timestamp }}</p>
        </div>
      </div>

      <div class="example-card">
        <h2>🔄 Hidratação</h2>
        <p>Contador que demonstra a hidratação:</p>
        <div class="hydration-demo">
          <p>Contador: {{ count }}</p>
          <button @click="increment" class="btn">Incrementar (só funciona após hidratação)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useSeoMeta({
  title: 'Exemplos de SSR - Server-Side Rendering',
  description: 'Demonstrações práticas de renderização no servidor com Nuxt.js'
})

// Estado reativo
const count = ref(0)

// Dados renderizados no servidor
const serverTime = await $fetch('/api/hello')
const posts = await $fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')

// Informações do request (disponível apenas no servidor)
const event = useRequestEvent()
const userAgent = process.server ? event?.node.req.headers['user-agent'] : 'N/A'
const clientIP = process.server ? (event?.node.req.headers['x-forwarded-for'] || event?.node.req.headers['x-real-ip'] || 'unknown') : 'N/A'
const timestamp = new Date().toISOString()

// Função para incrementar contador
const increment = () => {
  count.value++
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  color: #00dc82;
  text-decoration: none;
  margin-bottom: 1rem;
  display: inline-block;
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.examples {
  display: grid;
  gap: 2rem;
}

.example-card {
  padding: 1.5rem;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background: white;
}

.example-card h2 {
  color: #2c3e50;
  margin-top: 0;
}

.server-time {
  font-size: 1.2rem;
  font-weight: bold;
  color: #00dc82;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 4px;
  margin: 1rem 0;
}

.posts-list {
  margin-top: 1rem;
}

.post-item {
  padding: 1rem;
  border-left: 3px solid #00dc82;
  margin-bottom: 1rem;
  background: #f8f9fa;
}

.post-item h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.post-item p {
  margin: 0;
  color: #666;
}

.request-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
}

.request-info p {
  margin: 0.5rem 0;
}

.hydration-demo {
  text-align: center;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 4px;
}

.btn {
  background: #00dc82;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.btn:hover {
  background: #00b66d;
}
</style>
