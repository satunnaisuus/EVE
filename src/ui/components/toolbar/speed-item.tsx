import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { Overflow } from "../overflow";
import { ContextMenu } from "../context-menu";
import { RadioGroup } from "../form/radio-group";
import { SimulationContext } from "../simulation";
import { FormRow } from "../form/form-row";

const Caret = styled.div`
    margin-left: 5px;
`;

const options = [
    {label: '0 ms', value: 0},
    {label: '50 ms', value: 50},
    {label: '100 ms', value: 100},
    {label: '250 ms', value: 250},
    {label: '500 ms', value: 500},
    {label: '1000 ms', value: 1000},
];

export const SpeedItem = observer(() => {
    const {simulation} = useContext(SimulationContext);

    const [contextMenuOpened, setContextMenuOpened] = useState(false);
    const ref = useRef();

    return (
        <div ref={ref}>
            <ToolbarItem focused={contextMenuOpened} onClick={() => setContextMenuOpened(! contextMenuOpened)}>
                <FontAwesomeIcon icon={faClock} />
                <Caret><FontAwesomeIcon icon={faCaretDown} /></Caret>
            </ToolbarItem>
            {contextMenuOpened && <Overflow root={ref.current} onLoseFocus={() => setContextMenuOpened(false)}>
                <ContextMenu>
                    <FormRow label="Delay between steps">
                        <RadioGroup choices={options} value={simulation.getStepDelay()} onChange={(v: number) => simulation.setStepDelay(v)} />
                    </FormRow>
                </ContextMenu>
            </Overflow>}
        </div>
    );
});