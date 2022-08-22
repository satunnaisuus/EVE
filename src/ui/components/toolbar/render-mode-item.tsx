import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { RenderMode } from "../../../renderer/renderer";
import { Overflow } from "../overflow";
import { ContextMenu } from "../context-menu";
import { RadioGroup } from "../form/radio-group";
import { SimulationContext } from "../simulation";
import { FormRow } from "../form/form-row";

const Caret = styled.div`
    margin-left: 5px;
`;

const modeOptions = [
    {label: 'Default', value: 'default'},
    {label: 'Energy', value: 'energy'},
    {label: 'Lifetime', value: 'lifetime'},
    {label: 'Genesis', value: 'genesis'},
    {label: 'Supply', value: 'supply'},
];

const frequencyOptions = [
    {label: 'Every step', value: 1},
    {label: 'Every 25 steps', value: 25},
    {label: 'Every 50 steps', value: 50},
    {label: 'Every 100 steps', value: 100},
    {label: 'Every 250 steps', value: 250},
];

export const RenderModeItem = observer(() => {
    const {renderer, simulation} = useContext(SimulationContext);

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
                    <FormRow label="Render mode">
                        <RadioGroup choices={modeOptions} value={renderer.getRenderMode()} onChange={(v: RenderMode) => renderer.setRenderMode(v)} />
                    </FormRow>
                    <FormRow label="Render frequency">
                        <RadioGroup choices={frequencyOptions} value={simulation.getRendererUpdateFrequency()} onChange={v => simulation.setRendererUpdateFrequency(v)} />
                    </FormRow>
                </ContextMenu>
            </Overflow>}
        </div>
    );
});