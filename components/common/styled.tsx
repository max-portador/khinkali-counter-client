import styled from "styled-components";
import {Avatar, Button, Card} from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-self: center;
  padding: 5px 20px;
  border: 0.5px solid lightgray;
  background-color: #b8c6db;
  width: min-content;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
`
export const StyledImage = styled((props) => <Avatar {...props} variant={"rounded"}/>)`
  margin: 30px;
  height: 300px;
  width: 200px;
`

export const SaveButton = styled((props) =>
    <Button variant="outlined"  startIcon={<SaveIcon/>} {...props} />)`
    
    `
export const DeleteButton = styled((props) =>
    <Button variant="outlined"  color={'error'}  startIcon={<DeleteIcon/>} {...props} />)`
    `

export const CancelButton = styled((props) =>
    <Button variant="outlined"  color={'error'}  startIcon={<CancelIcon/>} {...props} />)`
    `

export const CancelCornerIcon = styled((props) => <CancelPresentationRoundedIcon color={'error'} {...props}/>)`
    margin: 0;
    padding: 0;
`