/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

// import './App.css'
import { AppBar, Box, Container, Typography } from '@mui/material'
import DataGrid from './Components/DataGrid'
import ExportGrid from './Components/Grid/ExportGrid'
import DxGrid from './Components/Grid/DxGrid'

function App() {


  return (
    <Container>
      <AppBar sx={{height:"22px"}}>
        Data grid POC
      </AppBar>
      <main style={{marginTop:"50px"}}>
      <Typography component={'h1'}>The below data grid supports row grouping, column resizing, export to CSV, and custom aggregation of each row.</Typography>
         <DxGrid/>
      </main>
 
    {/* <DataGrid/> */}
    </Container>
  )
}

export default App
