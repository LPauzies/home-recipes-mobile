<template>
  <Page>

    <ActionBar :title="title">
      <NavigationButton text="Save" ios.systemIcon="save" android.systemIcon="ic_menu_save" ios.position="right" android.position="actionBar" @tap="pushRecipe" />
    </ActionBar>

    <StackLayout>

      <TextField hint="Titre de la recette" v-model="recipeTitle" />

      <Label text="Nombre de personnes :" class="vertical-align" />
      <ListPicker :items="peopleCountList" selectedIndex="2" v-model="peopleCount" class="vertical-align reduce-picker" />

      <TabView>

        <TabViewItem title="Durées">
          <StackLayout>
            <Label text="Préparation (min) :" class="vertical-align" />
            <ListPicker :items="preparationDurationList" selectedIndex="0" v-model="preparationDuration" class="vertical-align" />

            <Label text="Cuisson (min) :" class="vertical-align" />
            <ListPicker :items="cookingDurationList" selectedIndex="0" v-model="cookingDuration" class="vertical-align" />
          </StackLayout>
        </TabViewItem>

        <TabViewItem title="Ingrédients">
          <StackLayout>
            <Label text="Ingrédients :" class="vertical-align" />
            <TextView v-model="ingredientList" class="vertical-align" />
          </StackLayout>
        </TabViewItem>

        <TabViewItem title="Préparation">
          <StackLayout>
            <Label text="Préparation :" class="vertical-align" />
            <TextView v-model="cookingProcess" class="vertical-align" />
          </StackLayout>
        </TabViewItem>

      </TabView>

    </StackLayout>
  </Page>
</template>

<script >
  import ENVIRONEMENT from "../../static/static.js";
  const Recipe = require("../../static/model.js");

  export default {
    data: function() {
      return {
        //Fixed
        title: ENVIRONEMENT.title,
        peopleCountList: this.generatePeopleCountList(),
        preparationDurationList: this.generateDurationList(1, 600),
        cookingDurationList: this.generateDurationList(1, 600),
        //Changing
        recipeTitle: "",
        peopleCountIndex: 0,
        preparationDurationIndex: 0,
        cookingDurationIndex: 0,
        ingredientList: "",
        cookingProcess: ""
      }
    },
    methods: {
      pushRecipe: function() {
        let recipeTitle = this.recipeTitle.trim();
        let peopleCount = this.peopleCountList[this.peopleCountIndex];
        let preparationDuration = this.preparationDurationList[this.preparationDurationIndex];
        let cookingDuration = this.cookingDurationList[this.cookingDurationIndex];
        let ingredientList = this.ingredientList.trim();
        let cookingProcess = this.cookingProcess.trim();
        //Check the entries
        /*
        if (recipeTitle.length === 0) {
          this.pushAlertSave("Le titre de la recette est vide");
          return;
        }
        if (peopleCount == 0) {
          this.pushAlertSave("Le nombre de personnes pour la recette vaut 0...");
          return;
        }
        if (ingredientList.length === 0) {
          this.pushAlertSave("La liste d'ingrédients est vide...");
          return;
        }
        if (cookingProcess.length === 0) {
          this.pushAlertSave("La préparation de la recette est vide...");
          return;
        }
        */
        //Push to file system
        let pushedRecipe = new Recipe(this.recipeTitle, peopleCount, preparationDuration, cookingDuration, ingredientList, cookingProcess);

        pushedRecipe.saveToFileSystem();
      },
      generatePeopleCountList: function() {
        return Array(12).fill().map((_, index) => index);
      },
      minutesToHourString: function(minutes) {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        return h + ":" + m;
      },
      generateDurationList: function(start, end) {
        return Array(end - start + 1).fill().map((_, index) => this.minutesToHourString(index));
      },
      pushAlertSave: function(message) {
        alert({
          title: "Impossibilité de faire la sauvegarde ...",
          message: message,
          okButtonText: "OK"
        });
      }
    }
  }
</script>

<style scoped>

    ActionBar, Button {
      background-color: #9000c2; /* Purple */
      color: #ffffff;
    }

    StackLayout {
      padding: 30px;
    }

    .vertical-align {
      vertical-align: center;
    }

</style>
