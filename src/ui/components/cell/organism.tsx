import * as React from "react";
import styled from "styled-components";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Visualization } from "./organism/visualization";
import { CellType } from "../../../simulation/types/cells";
import { Program } from "./organism/program";
import { Button } from "../form/button";
import { SidebarTab } from "../../stores/simulation-ui-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimulationContext } from "../simulation";
import { RootStoreContext } from "../../stores/root-store";

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const DangerText = styled.span`
    color: #ff0000;
`;

const SuccessText = styled.span`
    color: #00ff00;
`;

const SaveButton = styled(Button)`
    margin-bottom: 10px;
`;

export const OrganismCell = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const {ui, selectedCell} = useContext(SimulationContext);
    const genomeStore = rootStore.getGenomeStore();
    const cell = selectedCell.getCell();

    if (cell.type !== CellType.ORGANISM) {
        return;
    }

    const addGenome = () => {
        genomeStore.addGenome(cell.genome).then(() => {
            ui.setActiveTab(SidebarTab.GENOMES);
        });
    };

    return (
        <>
            <Container>
                <div>
                    <SaveButton apperance='primary' width="100%" onClick={() => addGenome()}>
                        <FontAwesomeIcon icon={faFloppyDisk} /> Save genome
                    </SaveButton>
                    <Visualization genome={cell.genome} />
                    <Row>
                        <span>Status</span>
                        {selectedCell.isAlive() ? <SuccessText>Alive</SuccessText> : <DangerText>Dead</DangerText>}
                    </Row>
                    <Row>
                        <span>Energy</span>
                        <span>{cell.energy}</span>
                    </Row>
                    <Row>
                        <span>Lifetime</span>
                        <span>{cell.lifetime}</span>
                    </Row>
                    <Row>
                        <span>Divide limit</span>
                        <span>{cell.genome.divideLimit}</span>
                    </Row>
                    <Program organism={cell} />
                </div>
            </Container>
        </>
    );
});