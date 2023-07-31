import { ref } from "vue"
import {uuidv4} from '../utils/uuid'


export const useCards = (getByCategoryTitle) => {
    const cards = ref([
        { id: uuidv4(), title: "Para editar la categoria dale doble click", categoryId: getByCategoryTitle('Backlog').id },
        { id: uuidv4(), title: "Para agregar mas categoria", categoryId: getByCategoryTitle('Backlog').id },
        { id: uuidv4(), title: "Item C", categoryId: getByCategoryTitle('Priority').id },
      ])
  
    const getByCardId = (id) => cards.value.find((card) => card.id === id)
    const getByCardTitle = (title) => cards.value.find((card) => card.title === title)
    const getByCardCategoryId = (categoryId) => cards.value.filter((card) => card.categoryId === categoryId)
    
    const addCard = (title, categoryId) => {
        const newList = {
            id: uuidv4(),
            title,
            categoryId
        }
        cards.value.push(newList)
    } 

    const updatedCard = (id, title, categoryId) => {
       const found = getByCardId(id)
       found.title = title
       found.categoryId = categoryId
    } 

    return {
        cards,
        getByCardId,
        getByCardTitle,
        getByCardCategoryId,
        addCard,
        updatedCard
    }
}