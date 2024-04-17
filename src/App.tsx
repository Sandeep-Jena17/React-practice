/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

// import './App.css'
import { Box } from '@mui/material'
import DataGrid from './Components/DataGrid'
import ExportGrid from './Components/Grid/ExportGrid'
import DxGrid from './Components/Grid/DxGrid'

function App() {


  return (
    <Box>
{/* <ExportGrid /> */}
 <DxGrid/>
    {/* <DataGrid/> */}
    </Box>
  )
}

export default App
