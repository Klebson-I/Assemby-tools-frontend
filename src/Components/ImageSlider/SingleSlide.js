import React from "react";
import './style.css';
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";

export const SingleSlide = ({src, imagesQuantity}) => {
    const dispatchPopup = useGlobalPopupDispatchState();

    const openPopup = () => {
        dispatchPopup(addToGlobalPopupState({
            isOpen: true,
            component: <img src={src}/>,
            styles: {

            },
        }))
    };
    return <div
        className={'singleSlide'}
        style={{
            width: imagesQuantity >= 3 ? `${90/imagesQuantity}%` : '30%'
        }}
        onClick={openPopup}
    >
        <img src={src} className='miniImage'/>
    </div>
}