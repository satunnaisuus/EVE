import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faForwardStep } from "@fortawesome/free-solid-svg-icons/faForwardStep";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";

interface Props {
    
}

export const StepItem = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);

    if (simulation.isPaused()) {
        return (
            <ToolbarItem onClick={() => simulation.makeStep()}>
                <FontAwesomeIcon icon={faForwardStep} />
            </ToolbarItem>
        );
    }
    
    return null;
});