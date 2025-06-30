<template>
  <div class="container">
    <div v-if="pending" class="loading">
      Carregando usuário...
    </div>
    
    <div v-else-if="error" class="error">
      <h2>Usuário não encontrado</h2>
      <p>O usuário com ID {{ $route.params.id }} não foi encontrado.</p>
    </div>

    <div v-else class="user-details">
      <div class="navigation">
        <NuxtLink to="/users" class="back-link">← Voltar para lista</NuxtLink>
        <NuxtLink to="/" class="home-link">🏠 Início</NuxtLink>
      </div>

      <div class="user-profile">
        <div class="profile-header">
          <div class="avatar">{{ user.name.charAt(0) }}</div>
          <div class="profile-info">
            <h1>{{ user.name }}</h1>
            <p class="username">@{{ user.username }}</p>
            <p class="catchphrase">"{{ user.company.catchPhrase }}"</p>
          </div>
        </div>

        <div class="details-grid">
          <div class="detail-card">
            <h3>📧 Contato</h3>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Telefone:</strong> {{ user.phone }}</p>
            <p><strong>Website:</strong> <a :href="`http://${user.website}`" target="_blank">{{ user.website }}</a></p>
          </div>

          <div class="detail-card">
            <h3>🏢 Empresa</h3>
            <p><strong>Nome:</strong> {{ user.company.name }}</p>
            <p><strong>Slogan:</strong> {{ user.company.catchPhrase }}</p>
            <p><strong>Negócio:</strong> {{ user.company.bs }}</p>
          </div>

          <div class="detail-card">
            <h3>📍 Endereço</h3>
            <p><strong>Rua:</strong> {{ user.address.street }}, {{ user.address.suite }}</p>
            <p><strong>Cidade:</strong> {{ user.address.city }}</p>
            <p><strong>CEP:</strong> {{ user.address.zipcode }}</p>
            <p><strong>Coordenadas:</strong> {{ user.address.geo.lat }}, {{ user.address.geo.lng }}</p>
          </div>
        </div>

        <div class="posts-section">
          <h3>📝 Posts do Usuário</h3>
          <div v-if="userPosts.length > 0" class="posts-list">
            <div v-for="post in userPosts" :key="post.id" class="post-card">
              <h4>{{ post.title }}</h4>
              <p>{{ post.body }}</p>
            </div>
          </div>
          <p v-else>Carregando posts...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pega o ID da rota
const route = useRoute()
const userId = route.params.id

// Carrega dados do usuário com tratamento de erro
const { data: user, pending, error } = await useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

// Carrega posts do usuário
const { data: userPosts } = await useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
// Ou usando $fetch diretamente:
// const userPosts = await $fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

// Meta tags dinâmicas baseadas no usuário
useSeoMeta({
  title: () => user.value ? `${user.value.name} - Perfil do Usuário` : 'Usuário não encontrado',
  description: () => user.value ? `Perfil de ${user.value.name} - ${user.value.email}` : 'Usuário não encontrado'
})

// Log no servidor
if (process.server && user.value) {
  console.log(`Carregando usuário ${user.value.name} (ID: ${userId}) no servidor`)
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #e74c3c;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.back-link, .home-link {
  color: #00dc82;
  text-decoration: none;
}

.back-link:hover, .home-link:hover {
  text-decoration: underline;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin-right: 2rem;
}

.profile-info h1 {
  margin: 0 0 0.5rem 0;
}

.username {
  margin: 0 0 1rem 0;
  opacity: 0.8;
}

.catchphrase {
  margin: 0;
  font-style: italic;
  opacity: 0.9;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-card {
  padding: 1.5rem;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background: white;
}

.detail-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.detail-card p {
  margin: 0.5rem 0;
  color: #555;
}

.detail-card a {
  color: #00dc82;
}

.posts-section {
  margin-top: 2rem;
}

.posts-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.posts-list {
  display: grid;
  gap: 1rem;
}

.post-card {
  padding: 1.5rem;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  background: #f8f9fa;
}

.post-card h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  text-transform: capitalize;
}

.post-card p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}
</style>
