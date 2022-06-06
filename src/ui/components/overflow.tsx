import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
    children?: React.ReactNode;
    root: HTMLElement;
    onLoseFocus?: () => any;
}

const OverflowStyled = styled.div`
    position: fixed;
`;

export const Overflow = ({root, children, onLoseFocus}: Props) => {
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [ready, setReady] = useState(false);
    const overflowRef = useRef<any>();

    useEffect(() => {
        if (root && overflowRef.current) {
            const rect = root.getBoundingClientRect();

            setTop(rect.top + rect.height);

            if (rect.left + overflowRef.current.getBoundingClientRect().width > window.innerWidth) {
                setLeft(Math.max(0, window.innerWidth - overflowRef.current.getBoundingClientRect().width));
            } else {
                setLeft(Math.max(0, rect.left));
            }
            
            setReady(true);
        }

        const blurHandler = (e: MouseEvent) => {
            if (! root.contains(e.target as Element)) {
                onLoseFocus && onLoseFocus();
            }
        };

        window.addEventListener('mousedown', blurHandler);

        return () => {
            window.removeEventListener('mousedown', blurHandler);
        };
    });

    return (
        <OverflowStyled style={{left: left, top: top, display: ready ? null : 'none'}} ref={overflowRef}>
            {children}
        </OverflowStyled>
    );
}