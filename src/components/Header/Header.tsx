'use client'

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import useGeolocation from "../../hooks/useGeolocation";

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

    return (
        <HeaderContainer>
            <Nav>
                <Link href="/">Home</Link>
                <Link href="/completed">Tarefas Concluídas</Link>
                <Link href="/pending">Tarefas Pendentes</Link>
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