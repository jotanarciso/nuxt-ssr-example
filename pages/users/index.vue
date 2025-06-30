<template>
  <div class="container">
    <h1>Lista de Usuários (SSR)</h1>
    <NuxtLink to="/" class="back-link">← Voltar</NuxtLink>
    
    <div class="users-info">
      <p>Esta lista foi carregada no servidor em: <strong>{{ loadTime }}</strong></p>
      <p>Total de usuários: <strong>{{ users.length }}</strong></p>
    </div>

    <div class="users-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-header">
          <h3>{{ user.name }}</h3>
          <span class="user-username">@{{ user.username }}</span>
        </div>
        
        <div class="user-info">
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Telefone:</strong> {{ user.phone }}</p>
          <p><strong>Website:</strong> {{ user.website }}</p>
          <p><strong>Empresa:</strong> {{ user.company.name }}</p>
        </div>

        <div class="user-address">
          <h4>Endereço:</h4>
          <p>{{ user.address.street }}, {{ user.address.suite }}</p>
          <p>{{ user.address.city }} - {{ user.address.zipcode }}</p>
        </div>

        <NuxtLink :to="`/users/${user.id}`" class="view-details">
          Ver Detalhes →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags para SEO
useSeoMeta({
  title: 'Lista de Usuários - SSR Demo',
  description: 'Lista de usuários carregada via Server-Side Rendering'
})

// Carrega usuários no servidor
const users = await $fetch('https://jsonplaceholder.typicode.com/users')
const loadTime = new Date().toLocaleString('pt-BR')

// Log no servidor para debug
if (process.server) {
  console.log(`Usuários carregados no servidor às ${loadTime}`)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
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
  margin-bottom: 1rem;
}

.users-info {
  background: #f0f9ff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.users-info p {
  margin: 0.5rem 0;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.user-card {
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
  transition: transform 0.2s ease;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-header {
  margin-bottom: 1rem;
}

.user-header h3 {
  margin: 0;
  color: #2c3e50;
}

.user-username {
  color: #666;
  font-size: 0.9rem;
}

.user-info p {
  margin: 0.5rem 0;
  color: #555;
}

.user-address {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.user-address h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.user-address p {
  margin: 0.25rem 0;
  color: #666;
}

.view-details {
  display: inline-block;
  margin-top: 1rem;
  color: #00dc82;
  text-decoration: none;
  font-weight: bold;
}

.view-details:hover {
  text-decoration: underline;
}
</style>
