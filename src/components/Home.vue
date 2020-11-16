<template>
  <Page>
    <ActionBar :title="title"/>
      <GridLayout rows="60, *, 60">
        <SearchBar row="0" :hint="placeholder" v-model="query" @textChange="onQueryChanged" @submit="onQuerySubmit" />
        <Button row="2" :text="buttonAddRecipeLabel" dock="bottom" @tap="onAddRecipe" />
      </GridLayout>
  </Page>
</template>

<script >
  import ENVIRONEMENT from '../static/static.js';
  import AddRecipe from '@/components/views/AddRecipe.vue';

  export default {
    data: function() {
      return {
        //Fixed
        title: ENVIRONEMENT.title,
        placeholder: "Recettes, ingrédients...",
        buttonAddRecipeLabel: "Ajouter une recette",
        //Changing
        query: ""
      }
    },
    methods: {
      onQueryChanged: function() {
        console.log(this.query);
      },
      onQuerySubmit: function() {
        console.log("Go to search result page");
      },
      onAddRecipe: function() {
        this.$navigateTo(AddRecipe);
      }
    }
  }
</script>

<style scoped>

    ActionBar, Button {
      background-color: #9000c2; /* Purple */
      color: #ffffff;
    }

</style>
