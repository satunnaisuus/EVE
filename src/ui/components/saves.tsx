import * as React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { AppContext, SaveContext, SimulationContext } from "../context";
import { useContext } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faRotate } from "@fortawesome/free-solid-svg-icons/faRotate";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";
import { SaveItem } from "../stores/save/save-item";
import { SaveStore } from "../stores/save-store";

const ListHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
    gap: 5px;
`;

const ItemStyled = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background: #10161e;
    display: flex;
`;

const Load = styled.button`
    display: block;
    flex-grow: 1;
    padding: 0;
    background: none;
    border: none;
    text-align: left;
    color: #fff;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const ActionButton = styled(Button)`
    padding: 8px 10px;
`;

const MainButton = styled(Button)`
    flex-grow: 1;
`;

async function download(item: SaveItem, store: SaveStore) {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(
        new Blob(
            [JSON.stringify(await store.serialize(item))],
            {type: "octet/stream"}
        )
    );
    a.href = url;
    a.setAttribute('download', item.getId() + '.save');
    a.click();
    window.URL.revokeObjectURL(url);
}

export const Item = observer(({item}: {item: SaveItem}) => {
    const saveStore = useContext(SaveContext);
    const store = useContext(AppContext);

    const load = async () => {
        store.loadSimulation(
            await saveStore.getDump(item),
            item.getRenderMode()
        )
    };

    return (
        <ItemStyled>
            <Load onClick={load}>
                <div>{new Date(item.getCreatedAt()).toLocaleString()}</div>
                <div>Step: {item.getStep()}</div>
            </Load>
            <ButtonsWrapper>
                <ActionButton onClick={() => {download(item, saveStore)}}>
                    <FontAwesomeIcon icon={faDownload} />
                </ActionButton>
                <ActionButton onClick={() => {saveStore.delete(item)}}>
                    <FontAwesomeIcon icon={faTrash} />
                </ActionButton>
            </ButtonsWrapper>
        </ItemStyled>
    );
});

export const Saves = observer(() => {
    const saveStore = useContext(SaveContext);
    const simulation = useContext(SimulationContext);
    const store = useContext(AppContext);

    const upload = () => {
        const input = document.createElement('input');
        input.type = 'file';

        input.addEventListener('change', (e) => {
            for (const file of input.files) {
                file.text().then((value) => {
                    try {
                        const data = JSON.parse(value) as any;

                        saveStore.addSave(new SaveItem(
                            data.id,
                            +Date.now(),
                            data.step,
                            data.renderMode,
                            data.version
                        ), data.data);
                    } catch (e) {
                        alert('File parsing error');
                    }
                });
            }
        });

        input.click();
    };

    return (
        <>
            <ListHeader>
                {! store.getSimulation() && <>
                    <MainButton apperance='primary' onClick={() => upload()}>
                        <FontAwesomeIcon icon={faUpload} /> Import
                    </MainButton>
                </>}

                {store.getSimulation() && <>
                    <MainButton apperance='primary' onClick={() => simulation.save()}>
                        Save
                    </MainButton>
                    <Button onClick={() => upload()}><FontAwesomeIcon icon={faUpload} /></Button>
                </>}
                
                <Button onClick={() => saveStore.refresh()}><FontAwesomeIcon icon={faRotate} /></Button>
            </ListHeader>
            <>
                {saveStore.getItems().map((item) => <Item item={item} key={item.getId()} />)}
            </>
        </>
    );
});