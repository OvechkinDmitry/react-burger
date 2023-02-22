import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";

const ConstructorUnit = React.memo(({ingredient, handleClose, index, moveCard}) => {
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        // Вызывается, когда перетаскиваемый элемент оказывается над ингредиентом,
        // индекс которого у нас задан в пропсах props.index
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    // Задаем функционал перетаскивания для элементов внутри списка
    // ингредиентов заказа
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => {
            return { ...ingredient, index: index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // Добавляем перетаскиваемому элементу прозрачность 0,
    // чтобы на его месте визуально появилось пустое пространство
    const opacity = isDragging ? 0 : 1;
    // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
    drag(drop(ref));
    // Прерываем базовую функция для onDrop
    // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
    const preventDefault = (e) => e.preventDefault()
    return (<li key={index} style={{opacity}} ref={ref} data-handler-id={handlerId}>
                    <div className={"ml-4"}>
                        <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement extraClass={`ml-2`}
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        handleClose={() => handleClose(index)}
                    />
            </li>)
})

export default ConstructorUnit;