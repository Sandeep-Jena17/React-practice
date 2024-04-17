import React, { useCallback, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
    SortingState,
    IntegratedSorting,
  } from '@devexpress/dx-react-grid';
  import { GridExporter } from '@devexpress/dx-react-grid-export';
import { columns, rows, advColumns, intraDayRows } from '../Mock/GridConstants';
import saveAs from "file-saver";
import EButton from './Button/EButton';
// import { generateRows } from '../../../demo-data/generator';

  
 const DataGrid=() => {
  const [columns1, setColumns1] = useState(columns.map((column)=>(
    {
        name: column.field, title: column.headerName
    }
)));
//   const [rows] = useState(generateRows({ length: 8 }));
const onSave = (workbook:any) => {
    workbook.xlsx.writeBuffer().then((buffer:any) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "DataGrid.xlsx"
      );
    });
  };
const exporterRef = useRef(null);

const startExport = useCallback(() => {
  exporterRef.current.exportGrid();
}, [exporterRef]);


console.log('exporterRef', exporterRef)
  return (
    <Paper>
      <Grid
        rows={intraDayRows}
        columns={columns1}
      >
          <SortingState
          defaultSorting={[{ columnName:'campaignName', direction: 'asc' }]}
        />
        <IntegratedSorting />
        <GroupingState
          grouping={[{ columnName: 'Date/Time' }]}
        />
        <IntegratedGrouping /> 

        <Table />
              <TableHeaderRow  showSortingControls />
              <Toolbar />
              <ExportPanel startExport={startExport}  toggleButtonComponent={EButton}/>
        <TableGroupRow />
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={intraDayRows}
        columns={columns1}
        onSave={onSave}
        // grouping={{ columnName: 'Date/Time' }}
      />
    </Paper>
  );
};


export default DataGrid