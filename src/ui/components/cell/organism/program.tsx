import * as React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { CellOrganism, Command, Organ } from "../../../../simulation/types/cells";
import { chunk } from "../../../../common/array-utils";
import { getOrganIndex, getParameter } from "../../../../simulation/cell/type/organism/abstract-instruction";
import { getEnergyFromParameter } from "../../../../simulation/cell/type/organism/organ/fermenter";
import { getTargetFromParameter, TargetType } from "../../../../simulation/cell/type/organism/organ/eye";
import { getPowerFromParameter } from "../../../../simulation/cell/type/organism/organ/mouth";
import { getMovementTypeFromParameter, MovementType } from "../../../../simulation/cell/type/organism/organ/fin";

interface InstructionProps {
    organism: CellOrganism,
    command: number,
    argument: number,
    goto: number,
}

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
    gap: 6px 0;
`;

const Line = styled.div`
    display: contents;
`;

const LineNumber = styled.div<{active: boolean}>`
    padding-right: 10px;
    color: ${({active}) => active ? "#00ff00" : "#808080"};
`;

const Instruction = observer((props: InstructionProps) => {
    if (props.command === Command.NOTHING) {
        return <NothingInstruction />;
    }

    if (props.command === Command.GOTO) {
        return <GotoInstruction {...props} />;
    }

    if (props.command === Command.SENSE) {
        return <SenseInstruction {...props} />;
    }

    if (props.command === Command.ACTION) {
        return <ActionInstruction {...props} />;
    }
});

const InvalidInstruction = observer(() => (
    <span>Invalid instruction</span>
));

const NothingInstruction = observer(() => (
    <span>Nothing</span>
));

const GotoInstruction = observer(({goto}: InstructionProps) => (
    <span>Goto line {goto}</span>
));

const ActionInstruction = observer(({organism, argument}: InstructionProps) => {
    const organIndex = getOrganIndex(argument);
    const parameter = getParameter(argument);
    const organ = organism.genome.organs[organIndex];

    if (organ === Organ.CHLOROPLAST) {
        return <span>Photosynthesis</span>
    }

    if (organ === Organ.OXIDIZER) {
        return <span>Chemosynthesis</span>
    }

    if (organ === Organ.FIN) {
        const movementType = getMovementTypeFromParameter(parameter);
        
        if (movementType === MovementType.ROTATE_LEFT) {
            return <span>Turn left</span>
        }

        if (movementType === MovementType.ROTATE_RIGHT) {
            return <span>Turn right</span>
        }
        
        if (movementType === MovementType.MOVE_FORWARD) {
            return <span>Move forward</span>
        }
    }

    if (organ === Organ.MOUTH) {
        const power = getPowerFromParameter(parameter);
        return <span>Eat with power {power}</span>
    }

    if (organ === Organ.REPRODUCTOR) {
        return <span>Give birth to a child</span>
    }

    return <InvalidInstruction />
});

const SenseInstruction = observer(({organism, argument, goto}: InstructionProps) => {
    const organIndex = getOrganIndex(argument);
    const parameter = getParameter(argument);
    const organ = organism.genome.organs[organIndex];

    if (organ === Organ.FERMENTER) {
        const energy = getEnergyFromParameter(parameter);
        return <span>Goto line {goto} if energy &gt;= {energy}</span>
    }

    if (organ === Organ.EYE) {
        const target = getTargetFromParameter(parameter);
        let targetText = '';

        if (target === TargetType.EMPTY) {
            targetText = 'empty';
        } else if (target === TargetType.WALL) {
            targetText = 'a wall';
        } else if (target === TargetType.ORGANIC) {
            targetText = 'organics';
        } else if (target === TargetType.ORGANISM_SIMILAR) {
            targetText = 'related organism';
        } else if (target === TargetType.ORGANISM_OTHER) {
            targetText = 'alien organism';
        }

        return <span>Goto line {goto} if the eye sees {targetText}</span>
    }

    return <InvalidInstruction />
});

export const Program = observer(({organism}: {organism: CellOrganism}) => (
    <Container>
        <Title>Program</Title>
        <Listing>
            {chunk(organism.genome.program, 3).map(([command, argument, goto], i) => (
                <Line key={i}>
                    <LineNumber active={i === organism.programCounter}>{i}</LineNumber>
                    <Instruction organism={organism} command={command} argument={argument} goto={goto} />
                </Line>
            ))}
        </Listing>
    </Container>
));