import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../context";
import { Button } from "../button";
import { Card } from "../card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons/faForwardStep';
import { Row } from "../layout/row";
import { Column } from "../layout/column";
import { FormRow } from "../form/form-row";
import { Select } from "../form/select";
import { Switch } from "../form/switch";

const renderThemes = [
    {label: 'Default', value: 'default'},
    {label: 'Genesis', value: 'genesis'},
    {label: 'Energy', value: 'energy'},
];

export const ControlsCard = observer(() => {
    const {simulationStore} = useContext(AppContext);

    return (
        <Card>
            <Row>
                <Column>
                    {simulationStore.isPaused() &&
                        <Button apperance="success" width="100%" onClick={() => simulationStore.start()}>
                            <FontAwesomeIcon icon={faPlay} /> Start
                        </Button>
                    }
                    {! simulationStore.isPaused() &&
                        <Button width="100%" onClick={() => simulationStore.pause()}>
                            <FontAwesomeIcon icon={faPause} /> Pause
                        </Button>
                    }
                </Column>
                {simulationStore.isPaused() &&
                    <Column width={70}>
                        <Button width="100%" onClick={() => simulationStore.makeStep()}>
                            <FontAwesomeIcon icon={faForwardStep} />
                        </Button>
                    </Column>
                }
            </Row>
        </Card>
    );
});