import { ref } from "vue"
import {uuidv4} from '../utils/uuid'

export const useCategories = () => {
    const categories = ref([
        { id: uuidv4(), title: 'Backlog' },
        { id: uuidv4(), title: 'Priority' },
        { id: uuidv4(), title: 'In Proggress' },
        { id: uuidv4(), title: 'Done' },
        //{ id: uuidv4(), title: 'Add another list' },
      ])
    const getByCategoryId = (id) => categories.value.find((category) => category.id === id)
    const getByCategoryTitle = (title) => categories.value.find((category) => category.title === title)
    const addCategory = (title) => {
        const newList = {
            id: uuidv4(),
            title
        }
        categories.value.push(newList)
    } 

    const updatedCategory = (id, title) => {
       const found = getByCategoryId(id)
       found.title = title
    } 

    return {
        categories,
        getByCategoryId,
        getByCategoryTitle,
        addCategory,
        updatedCategory
    }
}