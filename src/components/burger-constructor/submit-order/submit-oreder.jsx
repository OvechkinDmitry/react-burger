import React, {useCallback, useMemo, useState} from 'react';
import styles from "../burger-constructor.module.css";
import Price from "../../ui/price/price";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import {postOrder} from "../../../utils/post-order";
import Bun from "../ui/bun/bun";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {deleteId, updateId} from "../../../services/reducers/order-details-slice";

const SubmitOreder = ({totalPrice, ingredients}) => {
    const dispatch = useDispatch()
    const [isOpen, setOpen] = useState(false)
    const handleClose = useCallback(() => {
        dispatch(deleteId())
        setOpen(false)
    }, [])
    const idS = useMemo(() => ingredients.map(el => el["_id"]), [ingredients])
    const handleClick = useCallback(() => {
        setOpen(true)
        postOrder(idS).then(res =>
            dispatch(updateId({id : res?.id})))
            .catch(e => console.log(e.message))
    }, [idS])
    return (<>
                <div className={`${styles.submit} mt-10 mr-8`}>
                    <Price text={totalPrice} size={'medium'} extraClass={"mr-10"}/>
                    <Button onClick={handleClick} htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
                {
                    isOpen && (<Modal handleClose={handleClose}>
                        <OrderDetails/>
                    </Modal>)
                }
        </>
    )
}

Bun.propTypes = {
    totalPrice: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string)
}

export default SubmitOreder;