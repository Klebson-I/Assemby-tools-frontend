import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper} from "@mui/material";

const styleObject = {
    tableContainer: {
        width: "100%",
    }
}

export const ToolParamsTable = ({tool, params}) => {
    const getDescriptionByParamName = (name) => (params.find(({param_id}) => name === param_id))?.description;

    const getUnityByParamName = (name) => (params.find(({param_id}) => name === param_id))?.unit || "---"

    return <TableContainer component={Paper} sx={styleObject.tableContainer}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Parameter name
                    </TableCell>
                    <TableCell>
                        Description
                    </TableCell>
                    <TableCell>
                        Value
                    </TableCell>
                    <TableCell>
                        Unity
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Object.entries(tool)
                        .filter(([,value]) => value !== null)
                        .map((paramWithValue, index) => <TableRow key={index}>
                        <TableCell>{paramWithValue[0]}</TableCell>
                        <TableCell sx={{maxWidth: '200px'}}>{getDescriptionByParamName(paramWithValue[0])}</TableCell>
                        <TableCell>{paramWithValue[1]}</TableCell>
                        <TableCell>{getUnityByParamName(paramWithValue[0])}</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
    </TableContainer>
}