import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper} from "@mui/material";
import {handleFetch} from "../Hooks/useFetch";
import '../Components/ToolParamsTable/style.css';

const styleObject = {
    tableContainer: {
        width: "100%",
        padding: '10px'
    }
}

const restrictedParamsName = ['type', 'id'];

export const ToolParamsTableForSetTool = ({tool}) => {
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

    return <TableContainer component={Paper} sx={styleObject.tableContainer}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className='tableCell'>
                        Parameter name
                    </TableCell>
                    <TableCell className='tableCell'>
                        Value
                    </TableCell>
                    <TableCell className='tableCell'>
                        Unity
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Object.entries(tool)
                        .filter((tool) => !restrictedParamsName.includes(tool[0]))
                        .filter(([,value]) => value)
                        .map(([name, value], index) => <TableRow key={index}>
                        <TableCell className='tableCell'>{name}</TableCell>
                        <TableCell className='tableCell'>{value}</TableCell>
                        <TableCell className='tableCell'>{getUnityByParamName(name)}</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
    </TableContainer>
}