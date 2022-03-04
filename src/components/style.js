import styled from "styled-components"

export const Button = styled.button`
    padding: 3px 20px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
    background: ${props => `${props.background}`};
    font-size: 18px;
    cursor: pointer;
    transition: all ease .2s;
    &:hover{
        background: ${props => `${props.backgroundHover}`};
        color: #fff;
    }
`
export const DivPopup = styled.div`
    display: ${props => props.display};
`