import React, {useEffect, useState} from "react";
import {Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {handleFetch} from "../../Hooks/useFetch";

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

const isValueEqual = (name, value, toolArray) => {
    const [firstItem, secondItem] = toolArray;
    if (firstItem[name] === secondItem[name]) {
        return {
            backgroundColor: '#cef6be'
        }
    }
    return {};
};

export const CompareTable = ({toolArray}) => {

    const [params, setParams] = useState([]);
    useEffect(() => {
        (async() => {
            const data = await handleFetch('GET',
                {},
                `params`,
                () => {},
                () => {},
            )
            setParams(data);
        })();
    },[setParams]);
    const getUnityByParamName = (name) => (params.find(({param_id}) => name === param_id))?.unit || "---"

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
                                .filter(([,value]) => value)
                                .map(([name, value], index) =>
                                <TableRow key={index} sx={isValueEqual(name, value, toolArray)}>
                                <TableCell>{name}</TableCell>
                                <TableCell sx={{maxWidth: '200px'}}>Description of the param</TableCell>
                                <TableCell>{value}</TableCell>
                                <TableCell>{getUnityByParamName(name)}</TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>)
        }
    </div>
}