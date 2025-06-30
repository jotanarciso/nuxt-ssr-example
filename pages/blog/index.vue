<template>
  <div class="container mx-auto px-4">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Blog SSR
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Sistema de blog completo com posts carregados via Server-Side Rendering, 
        filtros e paginação integrada.
      </p>
    </div>
    
    <!-- Filtros e busca -->
    <div class="card mb-8">
      <div class="grid md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Buscar posts..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="debouncedSearch"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tag
          </label>
          <select 
            v-model="selectedTag"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="applyFilters"
          >
            <option value="">Todas as tags</option>
            <option v-for="tag in availableTags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <select 
            v-model="sortBy"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="applyFilters"
          >
            <option value="createdAt">Data</option>
            <option value="title">Título</option>
            <option value="id">ID</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ordem
          </label>
          <select 
            v-model="sortOrder"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="applyFilters"
          >
            <option value="desc">Decrescente</option>
            <option value="asc">Crescente</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Info de renderização -->
    <div class="card bg-purple-50 border-purple-200 mb-8">
      <div class="flex items-center mb-2">
        <div class="text-purple-600 mr-2">📝</div>
        <strong class="text-purple-800">Blog com SSR + API Local</strong>
      </div>
      <div class="text-sm text-purple-700 grid md:grid-cols-2 gap-4">
        <div>
          <div>Status: {{ pending ? 'Carregando...' : 'Carregado' }}</div>
          <div>Posts: {{ blogData?.posts?.length || 0 }}</div>
        </div>
        <div>
          <div>Página: {{ blogData?.pagination?.page || 1 }} de {{ blogData?.pagination?.totalPages || 1 }}</div>
          <div>Total: {{ blogData?.pagination?.total || 0 }} posts</div>
        </div>
      </div>
    </div>
    
    <!-- Loading state -->
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p class="mt-4 text-gray-600">Carregando posts...</p>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error">
      <h3>Erro ao carregar posts</h3>
      <p>{{ error.message }}</p>
      <button @click="refresh()" class="button mt-4">
        Tentar novamente
      </button>
    </div>
    
    <!-- Posts grid -->
    <div v-else-if="blogData?.posts?.length" class="space-y-6">
      <article 
        v-for="post in blogData.posts" 
        :key="post.id"
        class="card hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
              <NuxtLink :to="`/blog/${post.id}`">
                {{ post.title }}
              </NuxtLink>
            </h2>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(post.createdAt) }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Usuário #{{ post.userId }}
              </div>
            </div>
          </div>
          <div class="text-sm text-gray-400">
            #{{ post.id }}
          </div>
        </div>
        
        <p class="text-gray-600 mb-4 line-clamp-3">
          {{ post.body }}
        </p>
        
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full cursor-pointer hover:bg-blue-200"
              @click="filterByTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
          
          <NuxtLink 
            :to="`/blog/${post.id}`"
            class="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Ler mais →
          </NuxtLink>
        </div>
      </article>
    </div>
    
    <!-- Empty state -->
    <div v-else class="text-center py-16">
      <div class="text-4xl mb-4">📝</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        Nenhum post encontrado
      </h3>
      <p class="text-gray-600 mb-4">
        Tente ajustar os filtros ou buscar por outros termos.
      </p>
      <button @click="clearFilters" class="button">
        Limpar filtros
      </button>
    </div>
    
    <!-- Paginação -->
    <div v-if="blogData?.pagination" class="mt-12">
      <nav class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          Mostrando {{ ((blogData.pagination.page - 1) * blogData.pagination.limit) + 1 }} 
          a {{ Math.min(blogData.pagination.page * blogData.pagination.limit, blogData.pagination.total) }} 
          de {{ blogData.pagination.total }} posts
        </div>
        
        <div class="flex gap-2">
          <button 
            :disabled="!blogData.pagination.hasPrev"
            @click="goToPage(blogData.pagination.page - 1)"
            class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          <button 
            v-for="page in getPageNumbers()"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            :class="page === blogData.pagination.page 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'text-gray-700'"
          >
            {{ page }}
          </button>
          
          <button 
            :disabled="!blogData.pagination.hasNext"
            @click="goToPage(blogData.pagination.page + 1)"
            class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'Blog',
  meta: [
    { name: 'description', content: 'Blog com posts carregados via Server-Side Rendering' },
    { name: 'keywords', content: 'blog, posts, ssr, nuxt, artigos' }
  ]
})

// Estados reativos para filtros
const searchQuery = ref('')
const selectedTag = ref('')
const sortBy = ref('createdAt')
const sortOrder = ref('desc')
const currentPage = ref(1)

// Computed para query params
const queryParams = computed(() => ({
  page: currentPage.value,
  limit: 6,
  search: searchQuery.value,
  tag: selectedTag.value,
  sortBy: sortBy.value,
  sortOrder: sortOrder.value
}))

// Busca dados dos posts
const { 
  data: blogData, 
  pending, 
  error, 
  refresh 
} = await useFetch('/api/posts', {
  key: 'blog-posts',
  query: queryParams,
  server: true,
  default: () => ({ posts: [], pagination: null, availableTags: [] })
})

// Tags disponíveis para o filtro
const availableTags = computed(() => blogData.value?.availableTags || [])

// Debounce para busca
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

// Funções de filtro e navegação
const applyFilters = () => {
  currentPage.value = 1
  refresh()
}

const filterByTag = (tag) => {
  selectedTag.value = selectedTag.value === tag ? '' : tag
  applyFilters()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = ''
  sortBy.value = 'createdAt'
  sortOrder.value = 'desc'
  currentPage.value = 1
  refresh()
}

const goToPage = (page) => {
  currentPage.value = page
  refresh()
}

const getPageNumbers = () => {
  const pagination = blogData.value?.pagination
  if (!pagination) return []
  
  const pages = []
  const totalPages = pagination.totalPages
  const current = pagination.page
  
  // Mostra até 5 páginas
  let start = Math.max(1, current - 2)
  let end = Math.min(totalPages, current + 2)
  
  // Ajusta se estivermos no início ou fim
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(totalPages, start + 4)
    } else {
      start = Math.max(1, end - 4)
    }
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
}

// Helper para formatação de data
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Log para debug
console.log('Blog data:', {
  server: process.server,
  postsCount: blogData.value?.posts?.length || 0,
  currentPage: currentPage.value,
  pending: pending.value
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>