import React, { useCallback, useState } from "react";
import 'devextreme/dist/css/dx.light.css';
import DataGrid, {
  Column,
  Export,
  Selection,
  
  GroupPanel,
  Grouping,
  DataGridTypes,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import { employees } from "./data.ts";
import { rows , intraDayRows, columns} from "../../Mock/GridConstants.ts";
import { calculateMetrics } from "../../utils/index.ts";

// import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box';
import { ColumnResizeMode } from 'devextreme/common/grids';


const resizingModes: ColumnResizeMode[] = ['nextColumn', 'widget'];
// const columnResizingModeLabel = { 'aria-label': 'Column Resizing Mode' };

const onExporting = (e: DataGridTypes.ExportingEvent) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Main sheet");

  exportDataGrid({
    component: e.component,
    worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "DataGrid.xlsx"
      );
    });
  });
};

const totalSummary=calculateMetrics(intraDayRows)
const  DxGrid= () => {
    const [mode, setMode] = useState(resizingModes[0]);

    // const changeResizingMode = useCallback((data: SelectBoxTypes.ValueChangedEvent) => {
    //   setMode(data.value);
    // }, []);
  



    const calculateCustomColumns=(options: DataGridTypes.CustomSummaryInfo)=>{

 console.log("options", options)

 console.log("totalSummary", totalSummary)

 if(options.name==='CPC'){
options.totalValue=totalSummary.finalAverageCPC
 }else if(options.name==='CTR'){
       options.totalValue=totalSummary.finalAverageCTR
 }else if(options.name==='commission'){
options.totalValue=totalSummary.finalCommission
 }
    }
    
    return(
  <DataGrid
    id="gridContainer"
    dataSource={intraDayRows}
    keyExpr="ID"
    width="100%"
    showBorders={true}
    onExporting={onExporting}
    allowColumnResizing={true}
    columnResizingMode={mode}
    columnMinWidth={50}
    columnAutoWidth={true}
    showRowLines={true}
  >
 <GroupPanel visible={true} />
<Grouping autoExpandAll={true} /> 
    {
        columns.map((column, index)=>{
            if( column.field=== "Date/Time"){
                return  <Column dataField={column.field} name={column.headerName} key={index} groupIndex={0} />
            }else{
                return  <Column dataField={column.field} name={column.headerName} key={index}  alignment="center" />
            }
            
        })
    }
    <Export enabled={true} />
    <Summary calculateCustomSummary={calculateCustomColumns} >
      <TotalItem
        name="clickSummary"
        summaryType="count"
        // valueFormat="currency"
        // displayFormat="Sum: {0}"
        showInColumn="CLICKS"
      />
       <TotalItem
        name="requestSummary"
        summaryType="count"
        // valueFormat="currency"
        // displayFormat="Sum: {0}"
        showInColumn="Ad_Requests"
      />
        <TotalItem
        name="CPC"
        summaryType="custom"
        // valueFormat="currency"
        displayFormat="Average CPC: {0}"
        showInColumn="CPC"
      />
       <TotalItem
        name="commission"
        summaryType="custom"
        // valueFormat="currency"
        displayFormat="Commission: {0}"
        showInColumn="Total Commission"
      />
       <TotalItem
        name="CTR"
        summaryType="custom"
        // valueFormat="currency"
        displayFormat="Average CTR: {0}"
        showInColumn="CTR"
      />
    </Summary>
  </DataGrid>
)};

export default DxGrid;
