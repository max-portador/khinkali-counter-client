import styled from "styled-components";
import {Stack} from "@mui/material";
import React, {FC, MouseEvent} from "react";
import Box from "@mui/material/Box";
import {ModifiedEvent} from "../../types/event";


export const LineItem: FC<OuterPropsType> = (props) => {
    const {children, total, event, i, active, viewportwidth,  onClick} = props
    return <StyledListItem event={event} i={i} onClick={onClick}
                           active={active} total={total}
                           viewportwidth={viewportwidth}
    >
        <Circle i={i} active={active}/>
         <Label i={i} active={active}>
                {children}
            </Label>
    </StyledListItem>
}

const COLOR_ACTIVE = 'darkred'
const COLOR_NORMAL = 'black'

const StyledListItem = styled((props: ItemPropsType) => {
    return <Stack direction={'column'} {...props} />
})`
  margin-left: ${(props => props.i === 0
          ? 0
          : 20 * props.event.daysFromPrev < props.viewportwidth
                  ? 20 * props.event.daysFromPrev + 'px'
                  : ((20 * props.event.daysFromPrev) % props.viewportwidth + props.viewportwidth * 0.5) + 'px'
  )};
  //margin-right: ${(props => props.i === props.total - 1 ? 0 : '20px')};
  z-index: 1;
`
const Circle = styled((props: InnerCircleProps) => <Box {...props}/>)`
  width: 14px;
  height: 14px;
  display: block;
  margin-bottom: 5px;
  border-radius: 50%;
  background-color: ${props => props.i === props.active ? COLOR_ACTIVE : 'white'};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.i <= props.active ? COLOR_ACTIVE : COLOR_NORMAL};
  color: ${props => props.i < props.active ? COLOR_ACTIVE : COLOR_NORMAL};
`
const Label = styled((props: InnerProps) => <Box {...props}/>)`
  float: left;
  width: 20px;
  text-align: center;
  margin-left: -30px;
  margin-top: 60px;
  transform: rotate(-60deg);
  color: ${props => props.i === props.active ? COLOR_ACTIVE : COLOR_NORMAL};
`

type OuterPropsType = {
    total: number
    event: ModifiedEvent,
    active: number,
    i: number,
    viewportwidth: number,
    onClick: (e: MouseEvent<HTMLDivElement>) => void,
    children?: React.ReactNode,
}


type ItemPropsType = {
    total: number,
    event: ModifiedEvent,
    active: number,
    viewportwidth: number,
    i: number,
    children?: React.ReactNode,
    onClick: (e: MouseEvent<HTMLDivElement>) => void,
}

type InnerCircleProps = {
    i: number,
    active: number,
    children?: React.ReactNode,
}

type InnerProps = {  ref: any } & InnerCircleProps