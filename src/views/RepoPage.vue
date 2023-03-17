<template>
  <h1>Repository Details</h1>
<div class="main">
  <p><strong>Name: </strong>{{ repo.name }}</p>
  <p><strong>Description: </strong>{{ repo.description }}</p>
  <p><strong>Visibility: </strong>{{ repo.visibility }}</p>
  <p><strong>Repository was created at: </strong>{{ repo.created_at }}</p>
  <p><strong>Size: </strong>{{ repo.size }} KB</p> 
</div>
</template>

<!-- <script>
import {useRoute } from "vue-router"
// import {ref} from "vue"

const route = useRoute()

export default {
    name: 'RepoPage',

    data() {
      return {
        repoData: null
      };
    },
    methods: {
      async fetchRepoData() {      
        const response = await fetch(`https://api.github.com/repos/Bola22/${route.params.id}`);
        // const response = await fetch("https://api.github.com/repos/Bola22/Password-Generator");      
        this.repoData = await response.json();
      },    
    },
    mounted() {
      this.fetchRepoData();
    },
}
</script> -->

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const repo = ref({});
const loading =ref(false);
  
const {params} = useRoute();
// const router = useRouter()
const url = `https://api.github.com/repos/Bola22/${params.id}`;
const fetchData = async () => {
      try {
        loading.value = true;
        const response = await fetch(
         url
        );
       const data = await response.json() ;
        repo.value = data
        
        console.log(repo.value)
        loading.value =false;
      } catch (error) {
        console.log(error)
      }
    };
    onMounted(() => {
        fetchData()
    })
</script>

<style>
body{
  font-family: var(--font-mono);
}
h1{
  font-size: 40px;
  margin-bottom: 20px;
  text-align: center;
}
.main{
  padding: 30px;
  background: white;
}
</style>