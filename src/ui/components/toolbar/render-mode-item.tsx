import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { RenderMode } from "../../../renderer/renderer";
import { Overflow } from "../overflow";
import { ContextMenu, ContextMenuItem } from "../context-menu";

interface Props {
    
}

const ContextMenuRadio = styled.div`
    width: 20px;
`;

const Caret = styled.div`
    margin-left: 5px;
`;

const rendererOptions = [
    {label: 'Default', value: 'default'},
    {label: 'Energy', value: 'energy'},
    {label: 'Lifetime', value: 'lifetime'},
];

export const RenderModeItem = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const renderer = simulation.getRenderer();

    const [renderModeOpened, setRendererModeOpened] = useState(false);
    const renderModeButtonRef = useRef();

    const selectMode = (mode: RenderMode) => {
        renderer.setMode(mode);
        setRendererModeOpened(false);
    }

    return (
        <div ref={renderModeButtonRef}>
            <ToolbarItem focused={renderModeOpened} onClick={() => setRendererModeOpened(! renderModeOpened)}>
                <FontAwesomeIcon icon={faEye} />
                <Caret><FontAwesomeIcon icon={faCaretDown} /></Caret>
            </ToolbarItem>
            {renderModeOpened && <Overflow root={renderModeButtonRef.current} onLoseFocus={() => setRendererModeOpened(false)}>
                <ContextMenu>
                    {rendererOptions.map(({label, value}, index) => {
                        return (
                            <ContextMenuItem key={index} onClick={() => selectMode(value as RenderMode)}>
                                <ContextMenuRadio>
                                    {value === renderer.getMode() && <FontAwesomeIcon icon={faCheck} />}
                                </ContextMenuRadio>
                                {label}
                            </ContextMenuItem>
                        );
                    })}
                </ContextMenu>
            </Overflow>}
        </div>
    );
});