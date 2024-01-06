import React from "react";
import { useSelector } from "react-redux";

import { State } from '../../interfaces/store';
import { failure } from "../../constants/alert";

const AlertBox: React.FC = () => {
    const { message, type, show } = useSelector((state: State) => state.alert);

    return (
        <div className={`max-w-lg flex items-center gap-2 fixed z-20 top-3 right-100p pointer-events-none opacity-0 transition-all duration-300 bg-white shadow-modal rounded-md px-3 py-1 text-textcolor ${show && "pointer-events-auto opacity-100 right-3"}`}>
            <i className={`text-20px md:text-22px ${type === failure ? "ri-error-warning-line text-secondarydark" : "ri-checkbox-circle-line text-primary"}`}></i>
            <span>{message}</span>
        </div>
    )
};

export default AlertBox;