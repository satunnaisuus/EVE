import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext, useState } from "react";
import { StoreContext } from "../../context";
import { Button } from "../button";
import { Card } from "../card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Row } from "../layout/row";
import { Column } from "../layout/column";
import { FormRow } from "../form/form-row";
import { NumberInput } from "../form/number-input";
import { Select } from "../form/select";
import { LoopType } from "../../../game/grid";

const LoopTypes = [
    {label: 'None', value: 'none'},
    {label: 'Full', value: 'full'},
    {label: 'Horizontal', value: 'horizontal'},
    {label: 'Vertical', value: 'vertical'},
]

export const NewSimulationCard = observer(() => {
    const store = useContext(StoreContext);
    const [showOptions, setShowOptions] = useState(false);
    const options = store.getOptions();

    return (
        <Card>
            {showOptions && <>
                <FormRow label="Grid width">
                    <NumberInput onChange={(value) => options.setWidth(value)} value={options.getWidth()} />
                </FormRow>
                <FormRow label="Grid height">
                    <NumberInput onChange={(value) => options.setHeight(value)} value={options.getHeight()} />
                </FormRow>
                <FormRow label="Loop">
                    <Select onSelect={(value) => options.setLoop(value as LoopType)} options={LoopTypes} value={options.getLoop()} />
                </FormRow>
            </>}
            <Row>
                <Column>
                    <Button width="100%" onClick={() => store.newGame()}>New simulation</Button>
                </Column>
                <Column width={60}>
                    <Button width="100%" onClick={() => setShowOptions(! showOptions)}>
                        <FontAwesomeIcon icon={faGear} />
                    </Button>
                </Column>
            </Row>
        </Card>
    );
});