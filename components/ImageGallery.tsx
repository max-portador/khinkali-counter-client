import React, {FC} from 'react';
import styled from "styled-components";
import {wrap} from "popmotion";
import {AnimatePresence, motion} from "framer-motion";
import {ModifiedEvent} from "../types/event";
import {serverURL} from "../api/baseApi";

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        }
    }
}

const ImageGallery: FC<PropsType> = ({active, direction, paginate, events}) => {

    const imageIndex = wrap(0, events.length, active)
    return (<Container>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={active}
                    src={ serverURL + '/' + events[imageIndex].imageName}
                    custom={direction}
                    variants={variants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                        x: {type: 'spring', stiffness: 300, damping: 30},
                        opacity: {duration: 0.2}
                    }}
                    className={'galleryImage'}
                >

                </motion.img>

            </AnimatePresence>

            {active < events.length - 1 &&
                <button className="next"
                        onClick={() => paginate(1)}>
                    {"‣"}
                </button>}


            {active > 0 &&
                <button className="prev"
                        onClick={() => paginate(-1)}>
                    {"‣"}
                </button>
            }
            <div

                style={{
                    color: 'steelblue',
                    fontSize: 64,
                    textAlign: "center",
                    position: 'fixed',
                    transform: 'translateX(35vw)'
                }}
            >
                <div>{events[active].amount}</div>
                <div>хинкали</div>
            </div>
        </Container>

    )
        ;
};

export default ImageGallery;

type PropsType = {
    active: number,
    direction: number,
    events: ModifiedEvent[],
    paginate: (newDirection: number) => void
}

const Container = styled.div`
  height: calc(95vh - 100px - 120px);;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20vw;
`
