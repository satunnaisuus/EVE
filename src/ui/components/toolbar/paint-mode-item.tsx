import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { faPaintbrush } from "@fortawesome/free-solid-svg-icons/faPaintbrush";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToolbarItem } from "./item";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { Overflow } from "../overflow";
import { ContextMenu } from "../context-menu";
import { RadioGroup } from "../form/radio-group";
import { FormRow } from "../form/form-row";
import { RangeRow } from "../form/range-row";
import { Checkbox } from "../form/checkbox";
import { Button } from "../form/button";
import { CellType } from "../../../simulation/types/cells";
import { BrushType } from "../../stores/paint-mode";
import { SimulationContext } from "../simulation";

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
    {label: 'Square', value: BrushType.SQUARE},
    {label: 'Circle', value: BrushType.CIRCLE},
];

const paintTypeOptions = [
    {label: 'Empty', value: CellType.EMPTY},
    {label: 'Wall', value: CellType.WALL},
    {label: 'Organic', value: CellType.ORGANIC},
    {label: 'Organism', value: CellType.ORGANISM},
];

export const PaintModeItem = observer(() => {
    const {renderer} = useContext(SimulationContext);
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
                        <RadioGroup choices={paintTypeOptions} value={paintMode.getType()} onChange={(v) => paintMode.setType(v)} />
                    </FormRow>
                    <FormRow label="Brush shape">
                        <RadioGroup<BrushType> choices={paintBrushOptions} value={paintMode.getBrush()} onChange={(v) => paintMode.setBrush(v)} />
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
                    <Button onClick={() => paintMode.clearClipboard()}>Reset clipboard</Button>
                </ContextMenu>
            </Overflow>}
        </div>
    );
});