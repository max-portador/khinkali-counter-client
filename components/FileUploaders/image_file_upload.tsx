import React, {FC} from "react";
import FileUpload from "./FileUpload";
import {Button, Typography} from "@mui/material";

export const ImageFileUpload: FC<MyFileUploadProps> = ({picture, setPicture}) => {
    return <FileUpload accept={'image/*'} setFile={setPicture}>
        <Button variant="outlined" sx={{height: 55}} color='primary'>
            {
                picture
                    ? <Typography>Изменить изображение</Typography>
                    : <Typography>Загрузите изображение</Typography>
            }
        </Button>
    </FileUpload>
}

interface MyFileUploadProps {
    picture: Blob | null,
    setPicture: Function
}