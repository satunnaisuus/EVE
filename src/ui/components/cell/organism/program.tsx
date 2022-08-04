import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { CellOrganism, Command } from "../../../../simulation/types/cells";

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

const Argument = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 40px;
    vertical-align: middle;
    text-align: center;
`;

export const Program = observer(({organism}: {organism: CellOrganism}) => (
    <Container>
        <Title>Program</Title>
        <Listing>
            {organism.genome.program.map((instruction, i) => (
                <Line key={i}>
                    <LineNumber active={i === organism.programCounter}>{i}</LineNumber>
                    <Instruction>
                        {Command[instruction.code]}
                        ({instruction.args.map((arg, j) => (
                            <span key={j}>
                                <Argument title={arg.toString()} >{arg}</Argument>
                                {instruction.args.length - 1 === j ? '' : ', '}
                            </span>
                        ))})
                        {instruction.branches.map((branch, j) => <Branch key={j}>{branch}</Branch>)}
                    </Instruction>
                </Line>
            ))}
        </Listing>
    </Container>
));