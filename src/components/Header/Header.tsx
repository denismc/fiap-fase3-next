'use client'

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import useGeolocation from "../../hooks/useGeolocation";
import { useTrash } from "../../contexts/TrashContext";

const HeaderContainer = styled.header`
    position: relative;
    display: flex;
    background-color: #ed145b;
    color: white;
    justify-content: center;
    padding:  20px;
`

const Nav = styled.nav`
    display: flex;
    gap: 15px;
`

const TrashButton = styled.button`
    background: none;
    border: none;
    color: white;
    font: inherit;
    cursor: pointer;
    padding: 0;

    &:focus-visible {
        outline: 2px solid white;
    }
`

const Badge = styled.span`
    display: inline-block;
    background: white;
    color: #ed145b;
    border-radius: 999px;
    font-size: 0.7rem;
    line-height: 1;
    padding: 3px 6px;
    margin-left: 4px;
`

const GeoBox = styled.span`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.6rem;
    line-height: 1.4;
    text-align: right;
`

const Header: React.FC = () => {
    const { coordinates, permission } = useGeolocation();
    const { trashedTasks, openTrash } = useTrash();

    return (
        <HeaderContainer>
            <Nav>
                <Link href="/">Home</Link>
                <Link href="/completed">Tarefas Concluídas</Link>
                <Link href="/pending">Tarefas Pendentes</Link>
                <TrashButton type="button" onClick={openTrash}>
                    Lixeira{trashedTasks.length > 0 && <Badge>{trashedTasks.length}</Badge>}
                </TrashButton>
            </Nav>
            <GeoBox>
                Lat: {coordinates.latitude ?? "..."} <br/>
                Long: {coordinates.longitude ?? "..."} <br/>
                Permissão: {permission}
            </GeoBox>
        </HeaderContainer>
    )
}

export default Header;