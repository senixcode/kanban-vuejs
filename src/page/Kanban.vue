<template>
  <div class="container">
    <div v-for="category in categories" class="drop-zone section" @drop="handleOnDrop($event, category.id)" @dragenter.prevent
      @dragover.prevent>
      <div v-if="refCategory.status && refCategory.id === category.id">
        <input v-model="refCategory.text" @keyup.enter="renameCategory(category.id)" autofocus>
      </div>
      <div v-else class="list-container">
        <h5 class="list-title" @dblclick="handleEditTitleCategory(category.title, category.id)">{{ category.title }}</h5>
        <span @click="addItemCard(category.id)" class="btn-add">+</span>
      </div>
      <div v-if="refCard.status && refCard.id === category.id" draggable="true">
        <input type="text" v-model="refCard.text" @keyup.enter="handleAddCategory(category.id)" class="drag-el" autofocus>
      </div>
      <div v-for="item in getByCardCategoryId(category.id)" :key="item.id" class="drag-el" draggable="true"
        @dragstart="startDrag($event, item)">
        <h6>{{ item.title }}</h6>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue'
import { useCategories } from '../composables/useCategories'
import {useCards} from '../composables/useCards'
import {useDragAndOnDrop} from '../composables/useDragAndOnDrop'

export default {
  setup() {
    const { 
      categories,
      getByCategoryId,
      getByCategoryTitle
    } = useCategories()
    
    const {
      getByCardId,
      addCard,
      getByCardCategoryId,
    } = useCards(getByCategoryTitle)

    const {startDrag, onDrop} = useDragAndOnDrop()

    const refCategory = ref({
      status: false,
      text: 'Nuevo Category',
      id: 0,
    })

    const refCard = ref({
      status: false,
      text: 'Nuevo Card',
      id: 0,
    })

    const addItemCard = (categoryId) => {
      const category = getByCategoryId(categoryId)
      refCard.value.text = `Nuevo ${category.title}`
      refCard.value.status = !refCard.value.status
      refCard.value.id = categoryId
    }

    const handleEditTitleCategory = (title, categoryId) => {
      refCategory.value.status = !refCategory.value.status
      refCategory.value.id = categoryId
      refCategory.value.text = title
    }

    const handleAddCategory = (categoryId) => {
      const title = refCard.value.text
      addCard(title, categoryId)
      refCard.value.status = !refCard.value.status
    }

    const renameCategory = (categoryId) => {
      const item = getByCategoryId(categoryId)
      item.title = refCategory.value.text
      refCategory.value.status = !refCategory.value.status
    }

    const handleOnDrop = (event, categoryId) => {
      onDrop(event, (cardID) => {
        const card = getByCardId(cardID)
        card.categoryId = categoryId
      })

    }

    return {
      handleAddCategory,
      handleEditTitleCategory,
      addItemCard,
      refCategory,
      categories,
      refCard,
      getByCardCategoryId,
      handleOnDrop,
      startDrag,
      renameCategory,
    }
  }
}
</script>
  
<style setup>
.container {
  margin: 1em 2em;
  display: inline-flex;
  gap: 1em;
}

.section {
  max-width: 400px;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
}

.list-container {
  display: flex;
  justify-content: space-between;
}

.list-title {
  padding: 5px;
}

.btn-add {
  cursor: pointer;
  font-size: larger;
}

input {
  background-color: var(--color-primary-ligth);
  border: none;
  color: #ffff;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 8px;
}





.drop-zone {
  background-color: var(--color-primary);
  padding: 10px;
  /* min-height: 10px; */
}

.drag-el {
  background-color: var(--color-primary-ligth);
  color: white;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 8px;
}
</style>