import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { CellOrganism, Command } from "../../../../simulation/types/cells";
import { chunk } from "../../../../common/array-utils";

const Container = styled.div`
margin: 20px 0;
`;

const Title = styled.div`
    margin-bottom: 10px;
`;

const Listing = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Line = styled.div`
    display: contents;
    white-space: nowrap;
`;

const LineNumber = styled.div<{active: boolean}>`
    padding-right: 10px;
    color: ${({active}) => active ? "#00ff00" : "#808080"};
    margin-bottom: 3px;
`;

const Instruction = styled.div`
`;

const Branch = styled.div`
    border-radius: 3px;
    display: inline-block;
    background: purple;
    padding: 0 3px;
    margin-left: 5px;
`;

export const Program = observer(({organism}: {organism: CellOrganism}) => (
    <Container>
        <Title>Program</Title>
        <Listing>
            {chunk(organism.genome.program, 3).map(([command, argument, goto], i) => (
                <Line key={i}>
                    <LineNumber active={i === organism.programCounter}>{i}</LineNumber>
                    <Instruction>
                        {Command[command]}
                        <span>({argument})</span>
                        <Branch>{goto}</Branch>
                    </Instruction>
                </Line>
            ))}
        </Listing>
    </Container>
));