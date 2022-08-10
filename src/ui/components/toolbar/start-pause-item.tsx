import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";

export const StartPauseItem = observer(() => {
    const simulation = useContext(SimulationContext);

    if (simulation.isPaused()) {
        return (
            <ToolbarItem onClick={() => simulation.start()}>
                <FontAwesomeIcon icon={faPlay} />
            </ToolbarItem>
        );
    } else {
        return (
            <ToolbarItem onClick={() => simulation.pause()}>
                <FontAwesomeIcon icon={faPause} />
            </ToolbarItem>
        );
    }
});