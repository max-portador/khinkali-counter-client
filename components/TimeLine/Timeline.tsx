import React, {FC, useEffect, useRef, useState} from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {ArrowForwardIosRounded} from "@mui/icons-material";
import {ModifiedEvent} from "../../types/event";
import {EditOptions, formatDate} from "../../utils/dateHelper";
import styled from "styled-components";
import {LineItem} from "./LineItem";


const Timeline: FC<PropsType> = ({active, setActive, events}) => {

    const [x, setX] = useState(0)
    const [progressBarWidth, setProgressBarWidth] = useState(null)
    let progressBarRef = useRef<HTMLDivElement>(null)
    let itemRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (progressBarRef) {
            setProgressBarWidth(progressBarRef.current.offsetWidth)

        }
    }, [progressBarRef])


    const clickHandler = function (index: number) {
        setActive(([prev, direction]) => {
            const newDirection = prev - index > 0 ? -1000 : 1000
            return [index, newDirection]
        })
    }
    const moveProgressBar = (sh: number) => {
        let delta = Math.ceil((Math.sign(sh) * progressBarWidth) / (30)) * (30)
        let minShift = progressBarWidth - scaleWidth(events.length - 1) - 10
        let maxShift = 0
        setX((x) => maxShift - 40 <= x + delta
            ? maxShift
            : x + delta <= minShift + 40
                ? minShift
                : x + delta)

    }

    const scaleWidth = (index: number = active) => {
        if (index === 0 || isNaN(index) || progressBarWidth === null) {
            return 1
        }
        let marginsSum = events.slice(0, index + 1)
            .reduce((acc, event) => {
                let distInPixels = 20 * event.daysFromPrev
                if (distInPixels < progressBarWidth) return distInPixels + acc
                return distInPixels %  progressBarWidth + progressBarWidth * 0.5 + acc
            }, 0)
        return marginsSum + (15 * index) - 7
    }



    return (
        <>
            <Wrapper>
                <IconButton aria-label="back"
                            onClick={() => moveProgressBar(1)}
                            disabled={x === 0}
                >
                    <ArrowBackIosRoundedIcon/>
                </IconButton>
                <Container ref={itemRef}>
                    <div style={{
                        transform: `translateX(${x}px)`,
                        transition: 'transform .3s ease-in'
                    }}>
                        <Scale width={scaleWidth()}/>
                        <Scale width={scaleWidth(events.length - 1) + 100 } style={{
                            backgroundColor: 'grey',
                            position: 'fixed',
                            zIndex: -1
                        }}/>
                        <ProgressBar ref={progressBarRef}>
                            {
                                events.map((event, i) => {
                                    return <LineItem key={formatDate(event.date, EditOptions)}
                                                     total={events.length}
                                                     event={event}
                                                     i={i}
                                                     onClick={() => clickHandler(i)}
                                                     viewportwidth={progressBarWidth}
                                                     active={active}
                                    >
                                        {formatDate(event.date, EditOptions)}
                                    </LineItem>
                                })
                            }
                        </ProgressBar>
                    </div>

                </Container>
                <IconButton aria-label="forward"
                            disabled={scaleWidth(events.length) <= -x + progressBarWidth}
                            onClick={() => moveProgressBar(-1)}>
                    <ArrowForwardIosRounded/>
                </IconButton>
            </Wrapper>
        </>
    );
}

export default Timeline;

type PropsType = {
    active: number,
    setActive: React.Dispatch<React.SetStateAction<[number, number]>>,
    events: ModifiedEvent[]
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`

const Container = styled.div`
  width: 65vw;
  height: 15vh;
  overflow-x: hidden;
`

const Scale = styled.div<{ width: number }>`
  background-color: darkred;
  height: 3px;
  position: relative;
  top: 8px;
  margin-left: 50px;
  left: 7px;
  transition: width .3s linear;
  width: ${props => props.width + 'px'};
`

const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 50px;
`


