import React, { useState, useRef, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import {
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  SelectionState,
  IntegratedSelection,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  TableSummaryRow,
  TableSelection,
  DragDropProvider,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import saveAs from 'file-saver';

import { orders } from '../../Mock/ExportGrid';

const DateFormatter = ({ value }) => (
  <span>
    {value.toLocaleDateString()}
  </span>
);

const DateTypeProvider = props => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

const onSave = (workbook) => {
    console.log("workbook", workbook)
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  });
};


console.log("Orders", orders)
const columns = [
  { name: 'Employee', title: 'Employee' },
  { name: 'OrderNumber', title: 'Invoice Number' },
  { name: 'OrderDate', title: 'Order Date' },
  { name: 'CustomerStoreCity', title: 'City' },
  { name: 'CustomerStoreState', title: 'State' },
  { name: 'SaleAmount', title: 'Sale Amount' },
];
const dateColumns = ['OrderDate'];
const groupSummaryItems = [
  { columnName: 'OrderNumber', type: 'count' },
  { columnName: 'SaleAmount', type: 'max' },
];
const totalSummaryItems = [
  { columnName: 'OrderNumber', type: 'count' },
  { columnName: 'SaleAmount', type: 'sum' },
];
const defaultExpandedGroups = ['Todd Hoffman', 'Todd Hoffman|Denver', 'Todd Hoffman|Casper'];

const ExportGrid= () => {
  const [grouping, setGrouping] = useState([
    { columnName: 'Employee' }, { columnName: 'CustomerStoreCity' },
  ]);
  const [selection, setSelection] = useState([14, 30, 38]);
  const exporterRef = useRef(null);

  const startExport = useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);

  return (
    <Paper>
      <Grid
        rows={orders}
        columns={columns}
      >
        <DragDropProvider />
        <DateTypeProvider for={dateColumns} />
        <GroupingState
          defaultExpandedGroups={defaultExpandedGroups}
          grouping={grouping}
          onGroupingChange={setGrouping}
        />
        <SummaryState
          totalItems={totalSummaryItems}
          groupItems={groupSummaryItems}
        />
        <SelectionState selection={selection} onSelectionChange={setSelection} />
        <IntegratedGrouping />
        <IntegratedSummary />
        <IntegratedSelection />
        <Table />
        <TableHeaderRow />
        <TableSelection />
        <TableGroupRow />
        <TableSummaryRow />
        <Toolbar />
        <GroupingPanel />
        <ExportPanel startExport={startExport} />
      </Grid>

      <GridExporter
        ref={exporterRef}
        rows={orders}
        columns={columns}
        grouping={grouping}
        totalSummaryItems={totalSummaryItems}
        groupSummaryItems={groupSummaryItems}
        selection={selection}
        onSave={onSave}
      />
    </Paper>
  );
};

export default ExportGrid;