import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons/faPaintbrush";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../../context";
import { ToolbarItem } from "./item";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { Overflow } from "../overflow";
import { ContextMenu } from "../context-menu";
import { RadioGroup } from "../form/radio-group";
import { FormRow } from "../form/form-row";
import { RangeRow } from "../form/range-row";
import { Checkbox } from "../form/checkbox";

interface Props {
    
}

const Caret = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5px;

    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }
`;

const Toggler = styled.div`
    margin-left: 5px;
    display: flex;
    align-items: center;
    padding: 0 5px;
`;

const StyledToolbarItem = styled(ToolbarItem)`
    align-items: stretch;
    padding: 0;
    gap: 0;
`;

const paintBrushOptions = [
    {label: 'Square', value: 'square'},
    {label: 'Circle', value: 'circle'},
];

const paintTypeOptions = [
    {label: 'Empty', value: 'empty'},
    {label: 'Wall', value: 'wall'},
    {label: 'Organic', value: 'organic'},
    {label: 'Organism', value: 'organism'},
];

export const PaintModeItem = observer(({}: Props) => {
    const simulation = useContext(SimulationContext);
    const renderer = simulation.getRenderer();
    const paintMode = renderer.getPaintMode();

    const [contextMenuOpened, setContextMenuOpened] = useState(false);
    const renderModeButtonRef = useRef();

    return (
        <div ref={renderModeButtonRef}>
            <StyledToolbarItem focused={contextMenuOpened} enabled={paintMode.isEnabled()}>
                <Toggler onClick={() => paintMode.setEnabled(! paintMode.isEnabled())}>
                    <FontAwesomeIcon icon={faPaintbrush} />
                </Toggler>
                <Caret onClick={() => {setContextMenuOpened(! contextMenuOpened); ! paintMode.isEnabled() && paintMode.setEnabled(true)}}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </Caret>
            </StyledToolbarItem>
            {contextMenuOpened && <Overflow root={renderModeButtonRef.current} onLoseFocus={() => setContextMenuOpened(false)}>
                <ContextMenu>
                    <FormRow label="Type of paint">
                        <RadioGroup choices={paintTypeOptions} value={paintMode.getType()} onChange={(v) => paintMode.setType(v as any)} />
                    </FormRow>
                    <FormRow label="Brush shape">
                        <RadioGroup choices={paintBrushOptions} value={paintMode.getBrush()} onChange={(v) => paintMode.setBrush(v as any)} />
                    </FormRow>
                    <FormRow label="Ignore">
                        {paintTypeOptions.map((option, i) => (
                            <Checkbox
                                key={i}
                                label={option.label}
                                checked={paintMode.isIgnore(option.value)}
                                onChange={(checked) => checked ? paintMode.addIgnore(option.value) : paintMode.removeIgnore(option.value)}
                            />
                        ))}
                    </FormRow>
                    <RangeRow label="Brush size" min={1} max={20} step={1} onChange={(v) => paintMode.setSize(v)} value={paintMode.getSize()} />
                </ContextMenu>
            </Overflow>}
        </div>
    );
});