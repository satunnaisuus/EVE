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