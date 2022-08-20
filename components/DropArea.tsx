import React, {ChangeEvent, DragEvent, FC, useRef} from 'react';
import styled from "styled-components";
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import {Typography} from "@mui/material";


const DropArea: FC<PropsType> = ({setPicture, picture, text, textWidth, minHeight}) => {

    const ref = useRef(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPicture(e.target.files[0])
    }

    const createSrc = (picture: Blob | string) => {
        if (typeof picture === 'string') {
            return picture
        }
        return URL.createObjectURL(picture)
    }

    const dragHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const dropHandler = async (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const files = event.dataTransfer.files

        if (files?.length) {
            let file = files[0]
            if (file.type.match('image/*')) {
                setPicture(files[0])
            }
        }
    }

    return (
        <Container
            minHeight={minHeight}
            onDragEnter={dragHandler}
            onDragLeave={dragHandler}
            onDragOver={dragHandler}
            onDrop={dropHandler}
            onClick={() => ref.current.click()}
        >
            {
                picture ? <>
                        <BlurImage src={createSrc(picture)}/>
                        <UploadedImage src={createSrc(picture)} alt={'photo here'}/>
                    </>
                    : <Typography
                        width={textWidth}
                        textAlign={'center'}>
                        {text || 'Или перетащите изображения сюда'}
                    </Typography>
            }
            <Clear onClick={(e) => {
                e.stopPropagation()
                setPicture(null)
            }}/>
            <input type={"file"} ref={ref} onChange={onChange} style={{display: 'none'}}/>
        </Container>

    );
};

export default DropArea;


type PropsType = {
    picture: Blob | string | null,
    setPicture: Function
    text?: string,
    textWidth?: string | number,
    minHeight?: string | number
}

const Container = styled.div<{ minHeight?: string | number }>`
  position: relative;
  width: 100%;
  min-width: 200px;
  min-height: ${props => props.minHeight || '50vh'};
  object-fit: scale-down;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 2px dashed #1976d2;
  color: gray;

  &:hover {
    color: steelblue;
    border: 1px solid #1976d2;
  }

`

const BlurImage = styled.img`
  position: absolute;
  width: 98%;
  height: 98%;
  object-fit: fill;
  filter: blur(10px);
`

const UploadedImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: scale-down;
`

const Clear = styled((props) => <CancelPresentationRoundedIcon {...props} fontSize='large' color='error'/>)`
  position: absolute;
  top: 10px;
  right: 10px;
`