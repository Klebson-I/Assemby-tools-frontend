import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper} from "@mui/material";

export const ToolParamsTable = ({tool}) => {
    return <TableContainer component={Paper}>
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
                    Object.entries(tool).map((paramWithValue) => <TableRow>
                        <TableCell>{paramWithValue[0]}</TableCell>
                        <TableCell>Description of the param</TableCell>
                        <TableCell>{paramWithValue[1]}</TableCell>
                        <TableCell>Unity</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
    </TableContainer>
}