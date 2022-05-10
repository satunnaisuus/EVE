import { observer } from "mobx-react-lite";
import * as React from "react";
import { useContext } from "react";
import { StoreContext } from "../../context";
import { Card } from "../card";

export const StatisticsCard = observer(() => {
    const store = useContext(StoreContext);

    return (
        <Card>
            <div>Step: {store.getStep()}</div>
            <div>Steps per second: {store.getStepsPerSecond()}</div>
            <div>Organisms: {store.getOrganismCount()}</div>
        </Card>
    );
});