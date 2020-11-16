"use strict";

const fileSystemModule = require("tns-core-modules/file-system");
import { v4 as uuid } from 'uuid';

class Recipe {

  /*
    Recipe(string, int, int, int, Array(string), Array(string))
  */
  constructor(title, peopleCount, preparationDuration, cookingDuration, ingredients, description, uuid) {
    this.title = title;
    this.peopleCount = peopleCount;
    this.preparationDuration = preparationDuration;
    this.cookingDuration = cookingDuration;
    this.ingredients = ingredients;
    this.description = description;
    this.uuid = uuid;
  }

  // keyword has to be lowercased to avoid calling the method multiple times
  isKeyWordInsideIngredients(keyword) {
    return this.ingredients.filter(e => e.toLowerCase().includes(keyword)).length > 0;
  }

  // keyword has to be lowercased to avoid calling the method multiple times
  isKeyWordInsideTitle(keyword) {
    return this.title.toLowerCase().includes(keyword);
  }

  // save the recipe to file system
  saveToFileSystem() {
    const documentsFolder = fileSystemModule.knownFolders.documents();
    if (documentsFolder._path) {
      let path_file = fileSystemModule.path.join(documentsFolder, this.uuid);
      let file = fileSystemModule.File.fromPath(path_file);

      file.writeText(JSON.stringify(this)).then((result) => {
        alert("Sauvegarde réussie");
      }).catch((error) => {
        alert({
          title: "Erreur lors de la sauvegarde ...",
          message: "Une erreur empêche de créer la recette dans le système de fichire : " + error.message,
          okButtonText: "OK"
        });
      });
    }
  }

  // Parsing and dumping for file system interaction
  toJSON() {
    return {
      title: this.title,
      peopleCount: this.peopleCount,
      preparationDuration: this.preparationDuration,
      cookingDuration: this.cookingDuration,
      ingredients: this.ingredients,
      description: this.description,
      uuid: this.uuid
    }
  }

  static fromJSON(recipeObject) {
    return new this(recipeObject);
  }

}

module.exports = Recipe;
