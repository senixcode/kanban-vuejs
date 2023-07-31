export const useDragAndOnDrop = () => {
    const startDrag = (event, cardId) => {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('cardID', cardId)
    }

    const onDrop = (event, collback) => {
        const cardID = event.dataTransfer.getData('cardID')
        collback(cardID)
    }

    return {
        startDrag,
        onDrop
    }
}