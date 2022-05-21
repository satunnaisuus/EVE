import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../context";
import { Card } from "../card";

export const StatisticsCard = observer(() => {
    const {simulationStore} = useContext(AppContext);

    return (
        <Card>
            <div>Step: {simulationStore.getStep()}</div>
            <div>Steps per second: {simulationStore.getStepsPerSecond()}</div>
            <div>Organisms: {simulationStore.getOrganismCount()}</div>
        </Card>
    );
});