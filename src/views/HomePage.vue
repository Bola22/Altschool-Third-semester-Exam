<template>
<div class="loader" v-if="!repos">Loading...
</div>
<div v-else>

<h1 class=" header"><font-awesome-icon icon="fa-brands fa-github" /> Repositories {{ repos.length }}</h1>



<div class="repo-section">
  <router-link v-for="repos in slicedRepos" :key="repos.id" class="repo-tiles" :to="{ name: 'RepoPage', params: { id: repos.name }}">
    <h2 class="title" >{{ repos.name }}</h2>
    <p class="description">{{ repos.description }}</p>
    <div class="wrapper1">
      <div class="wrapper2">
        <p>{{ repos.language }}</p>
        <div class="fork"><font-awesome-icon icon="fa-solid fa-code-fork" /><p>{{ repos.forks_count }}</p></div>
    </div>
    <p>{{ repos.size }} KB</p>
    </div>
  </router-link>
</div>


  <div class="pagination">
          Pages {{pages}} of {{ Math.ceil(repos.length / usersPerPage)}}

          <div>
            <button
          :disabled="pages <= 1"
          @click="pages--"
       
        >
          Prev
        </button>

        <button
        v-for="btn in Math.ceil(repos.length / usersPerPage)"
            :key="btn"
            :class="{active: pages === btn}"
            @click="pages = btn"
          >
            {{btn}}
          </button>
        <button
          :disabled="pages >= repos.length / usersPerPage"
          @click="pages++"
        >
          Next
        </button>
          </div>
  </div>
        

</div>
</template>


<script setup>
import {ref, computed, onMounted} from "vue"
const repos = ref([]);
  const loading = ref(false);
  const usersPerPage = 5;
  const pages = ref(1);
  const fetchData = async () => {
      try {
        loading.value = true;
        const response = await fetch(
          "https://api.github.com/users/Bola22/repos"
        );
       const data = await response.json() ;
        repos.value = data
        
        console.log(repos.value)
        loading.value =false;
      } catch (error) {
        console.log(error)
      }
    };
    const slicedRepos = computed(() => {
        return repos.value.slice((pages.value - 1) * usersPerPage, pages.value * usersPerPage);
     
    })
    onMounted(() => {
        fetchData()
    })
</script>

<style>
body{
  font-family: var(--font-sans);
  padding: 30px;
}

.loader{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

.header{
  padding-bottom: 50px;
  text-align: center;
  font-size: 40px;
}
.repo-section{
  display: grid;
  grid-template: 1fr 1fr/ 1fr 1fr;
  row-gap: 50px;
  column-gap: 50px;
  padding: 0 100px;
}
/* .repo{
  text-decoration: none;
  border: 1px solid black;
  padding: 10px;
  font-family: var(--font-mono);
  color: black;
  border-radius: 5px;
  width: 350px;
  background-color: white ;
} */
.repo-tiles{
  display: block;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: white ;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0.479);
  padding: 10px;
  font-family: var(--font-mono);
  color: black;
  border-radius: 5px;
  /* width: 350px; */
  background-color: white ;
}

.title{
  margin-bottom: 10px;
}

.wrapper1{
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-top: 10px;
  /* flex-direction:column ; */
}
.wrapper2{
  display: flex;
  /* flex-direction:column ; */
}
.fork{
  display: flex;
  margin-left: 10px;
}

.pagination{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  margin-top: 50px;
}

button{
  padding: 10px;
  font-family: var(--font-mono);
  margin-right: 3px;
}

</style>