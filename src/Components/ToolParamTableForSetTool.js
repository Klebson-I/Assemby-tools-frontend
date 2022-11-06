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
        padding: '10px'
    }
}

const restrictedParamsName = ['type', 'id'];

export const ToolParamsTableForSetTool = ({tool}) => {
    return <TableContainer component={Paper} sx={styleObject.tableContainer}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Parameter name
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
                        .filter((tool) => !restrictedParamsName.includes(tool[0]))
                        .map((paramWithValue, index) => <TableRow key={index}>
                        <TableCell>{paramWithValue[0]}</TableCell>
                        <TableCell>{paramWithValue[1]}</TableCell>
                        <TableCell>Unity</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
    </TableContainer>
}