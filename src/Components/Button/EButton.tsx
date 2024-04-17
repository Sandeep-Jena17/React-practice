import { Button } from '@mui/material'
import React from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const EButton = () => {
  return (
    <Button variant="outlined" startIcon={<FileDownloadIcon />}>
  Export
</Button>
  )
}

export default EButton