import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../context";
import { Card } from "../card";

export const StatisticsCard = observer(() => {
    const {gameStore} = useContext(AppContext);

    return (
        <Card>
            <div>Step: {gameStore.getStep()}</div>
            <div>Steps per second: {gameStore.getStepsPerSecond()}</div>
            <div>Organisms: {gameStore.getOrganismCount()}</div>
        </Card>
    );
});