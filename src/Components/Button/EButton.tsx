import { Button } from '@mui/material'
import React from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const EButton = ( props:any) => {

  console.log("get message ", props.getMessage())
  return (
    <Button variant="outlined" startIcon={<FileDownloadIcon />}   onClick={props.onToggle} >
  Export
</Button>
  )
}

export default EButton