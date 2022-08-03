import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { RenderMode } from "../../../renderer/renderer";
import { Overflow } from "../overflow";
import { ContextMenu } from "../context-menu";
import { RadioGroup } from "../form/radio-group";

interface Props {
    
}

const Caret = styled.div`
    margin-left: 5px;
`;

const rendererOptions = [
    {label: 'Default', value: 'default'},
    {label: 'Energy', value: 'energy'},
    {label: 'Lifetime', value: 'lifetime'},
    {label: 'Genesis', value: 'genesis'},
    {label: 'Supply', value: 'supply'},
];

export const RenderModeItem = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const renderer = simulation.getRenderer();

    const [renderModeOpened, setRendererModeOpened] = useState(false);
    const renderModeButtonRef = useRef();

    return (
        <div ref={renderModeButtonRef}>
            <ToolbarItem focused={renderModeOpened} onClick={() => setRendererModeOpened(! renderModeOpened)}>
                <FontAwesomeIcon icon={faEye} />
                <Caret><FontAwesomeIcon icon={faCaretDown} /></Caret>
            </ToolbarItem>
            {renderModeOpened && <Overflow root={renderModeButtonRef.current} onLoseFocus={() => setRendererModeOpened(false)}>
                <ContextMenu>
                    <RadioGroup choices={rendererOptions} value={renderer.getRenderMode()} onChange={(v: RenderMode) => renderer.setRenderMode(v)} />
                </ContextMenu>
            </Overflow>}
        </div>
    );
});