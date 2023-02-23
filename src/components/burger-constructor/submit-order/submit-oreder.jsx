import React, {useCallback, useState} from 'react';
import styles from "../burger-constructor.module.css";
import Price from "../../ui/price/price";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import {postOrder} from "../../../utils/post-order";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {deleteId} from "../../../services/reducers/order-details-slice";

const SubmitOreder = ({totalPrice, idS}) => {
    const dispatch = useDispatch()
    const [isOpen, setOpen] = useState(false)
    const handleClose = useCallback(() => {
        dispatch(deleteId())
        setOpen(false)
    }, [dispatch])
    const handleClick = useCallback(() => {
        setOpen(true)
        dispatch(postOrder(idS))
    }, [idS, dispatch])
    return (<>
                <div className={`${styles.submit} mt-10 mr-8`}>
                    <Price text={totalPrice} size={'medium'} extraClass={"mr-10"}/>
                    <Button disabled={!totalPrice} onClick={handleClick} htmlType="button" type="primary" size="medium">
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

SubmitOreder.propTypes = {
    totalPrice: PropTypes.number.isRequired,
    idS: PropTypes.arrayOf(PropTypes.string)
}

export default SubmitOreder;