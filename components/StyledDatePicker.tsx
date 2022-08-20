import React, {FC} from 'react';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {SxProps, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {Theme} from "@mui/system";

const formats = {
    normalDate: "dd.MM.yyyy",
    keyboardDate: "dd.MM.yyyy",
};

const StyledDatePicker: FC<PropsType> = ({eventDate, setEventDate, sx}) => {
    return (
            <LocalizationProvider dateAdapter={AdapterDateFns} dateFormats={formats}>
                <DatePicker
                    label="Дата"
                    value={eventDate}
                    onChange={(newValue) => {
                        setEventDate(newValue);
                    }}
                    renderInput={(params) =>
                        <TextField sx={sx} {...params}
                        />}
                />
            </LocalizationProvider>
    );
};

export default StyledDatePicker;

type PropsType = {
    eventDate: string | Date;
    setEventDate: Function;
    sx?: SxProps<Theme>
}