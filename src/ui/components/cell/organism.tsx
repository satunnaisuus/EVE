import * as React from "react";
import styled from "styled-components";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk";
import { observer } from "mobx-react-lite";
import { GenomeBankContext, SimulationContext } from "../../context";
import { useContext } from "react";
import { Visualization } from "./organism/visualization";
import { Command } from "../../../simulation/types/cells";
import { Program } from "./organism/program";
import { Button } from "../button";
import { SidebarTab } from "../../stores/simulation-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const simulation = useContext(SimulationContext);
    const genomeBank = useContext(GenomeBankContext);
    const selectedCell = simulation.getSelectedCell();
    const cell = selectedCell.getCell();

    if (cell.type !== 'organism') {
        return;
    }

    const addGenome = () => {
        genomeBank.addGenome(cell.genome).then(() => {
            simulation.getUI().setActiveTab(SidebarTab.GENOMES);
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