import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { SimulationContext } from "../simulation";

export const InfoItem = observer(() => {
    const {ui} = useContext(SimulationContext);

    return (
        <ToolbarItem onClick={() => ui.setInfoOpened(! ui.isInfoOpened())} enabled={ui.isInfoOpened()}>
            <FontAwesomeIcon icon={faInfo} />
        </ToolbarItem>
    );
});