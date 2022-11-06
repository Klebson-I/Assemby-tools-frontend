import React from "react";
import {Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

const styleObject = {
    tableContainer: {
        width: "50%",
        flexDirection: 'column',
        alignItems: 'center',
    },
    tablesContainer: {
        display: 'flex',
        minWidth: '100%',
    },
    heading: {
        textAlign: 'center',
        width: '100%',
    },
}

const restrictedParamsName = ['type', 'id'];

const isValueEqual = (paramWithValue, toolArray) => {
    const [firstItem, secondItem] = toolArray;
    if (firstItem[paramWithValue[0]] === secondItem[paramWithValue[0]]) {
        return {
            backgroundColor: '#cef6be'
        }
    }
    return {};
};

export const CompareTable = ({toolArray}) => {

    return <div style={styleObject.tablesContainer}>
        {
            toolArray.map((tool, index) => <TableContainer component={Paper} sx={styleObject.tableContainer} key={index}>
                <h2 style={styleObject.heading}>{tool.name}</h2>
                <Table >
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
                                .filter((tool) => !restrictedParamsName.includes(tool[0]))
                                .map((paramWithValue, index) =>
                                <TableRow key={index} sx={isValueEqual(paramWithValue, toolArray)}>
                                <TableCell>{paramWithValue[0]}</TableCell>
                                <TableCell sx={{maxWidth: '200px'}}>Description of the param</TableCell>
                                <TableCell>{paramWithValue[1]}</TableCell>
                                <TableCell>Unity</TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>)
        }
    </div>
}