import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { RenderStrategy } from "../../../render/canvas-renderer";
import { AppContext } from "../../context";
import { Button } from "../button";
import { Card } from "../card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { Row } from "../layout/row";
import { Column } from "../layout/column";
import { FormRow } from "../form/form-row";
import { Select } from "../form/select";
import { RangeInput } from "../form/range-input";
import { Switch } from "../form/switch";

const renderThemes = [
    {label: 'Default', value: 'default'},
    {label: 'Genesis', value: 'genesis'},
    {label: 'Energy', value: 'energy'},
];

export const ControlsCard = observer(() => {
    const {gameStore} = useContext(AppContext);

    return (
        <Card>
            <FormRow label="Map theme">
                <Select onSelect={(value) => gameStore.changeRenderTheme(value as RenderStrategy)} options={renderThemes} value={gameStore.getRenderTheme()} />
            </FormRow>
            <Switch value={gameStore.isRenderingDisabled()} label="Disable rendering" onChange={(value) => gameStore.setRenderingDisabled(value)} />
            <FormRow label="Step delay">
                <RangeInput min={1} max={1000} step={1} onChange={(value) => gameStore.changeStepDelay(value)} value={gameStore.getStepDelay()} />
            </FormRow>
            <Row>
                <Column>
                    {gameStore.isPaused() &&
                        <Button apperance="success" width="100%" onClick={() => gameStore.start()}>
                            <FontAwesomeIcon icon={faPlay} /> Start
                        </Button>
                    }
                    {! gameStore.isPaused() &&
                        <Button width="100%" onClick={() => gameStore.pause()}>
                            <FontAwesomeIcon icon={faPause} /> Pause
                        </Button>
                    }
                </Column>
                <Column width={70}>
                    <Button width="100%" onClick={() => gameStore.makeStep()}>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                </Column>
            </Row>
        </Card>
    );
});