<template>
    <div v-for="category in categories" class="drop-zone section" @drop="onDrop($event, category.id)" @dragenter.prevent
        @dragover.prevent>
        <div v-if="editCategory.status && editCategory.id === category.id">
          <input v-model="editTitleInput" @keyup.enter="renameCategory(category.id)" autofocus>
        </div>
        <div v-else class="list-container">
          <h5  class="list-title" @dblclick="handleEditTitleCategory(category.title, category.id)">{{ category.title }}</h5>
          <span @click="addItemCard(category.id)" class="btn-add">+</span>
        </div>
        <div v-if="addCard.status && addCard.id === category.id" draggable="true">
          <input type="text" v-model="addCard.text" @keyup.enter="addCategory(category.id)" class="drag-el" autofocus>
        </div>
        <div v-for="item in getList(category.id)" :key="item.id" class="drag-el" draggable="true"
          @dragstart="startDrag($event, item)">
          <h6>{{ item.title }}</h6>
        </div>
      </div>
</template>

<script>
    
</script>