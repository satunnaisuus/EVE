import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";

interface Props {
    
}

export const InfoItem = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const ui = simulation.getUI();

    return (
        <ToolbarItem onClick={() => ui.setInfoOpened(! ui.isInfoOpened())} enabled={ui.isInfoOpened()}>
            <FontAwesomeIcon icon={faInfo} />
        </ToolbarItem>
    );
});