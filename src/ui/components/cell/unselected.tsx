import * as React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import styled from "styled-components";

interface Props {
    
}

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

export const UnselectedCell = observer(({}: Props) => {
    return (
        <>
            Select a cell on the map
        </>
    );
});