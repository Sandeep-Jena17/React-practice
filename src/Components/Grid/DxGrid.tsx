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
  SortByGroupSummaryInfo,
  GroupItem,
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
        "Media Mather.xlsx"
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
  
    // const [totalClicks, setTotalClicks] = useState(0);
    // const [totalCommission, setTotalCommission] = useState(0.0);

    let totalClicks=0;
    let totalCommission=0.0;
    let finalCommission=0.0;
    const calculateCustomColumns=(options: DataGridTypes.CustomSummaryInfo)=>{


 if(options.name==='CPC'){
if (options.summaryProcess === 'start') {
  options.totalValue = 0;
}

if (options.summaryProcess === 'calculate') {
  if (options.value){
    const clicks = options.value.CLICKS;
    const commission = parseFloat(options.value["Total Commission"].replace("$ ", ""));
      totalClicks+=clicks;
      totalCommission+=commission
  }
}
if (options.summaryProcess === 'finalize') {
  if (totalClicks > 0) {
    options.totalValue = (totalCommission / totalClicks).toFixed(2);
  }
}
 }else if(options.name==='CTR'){
       options.totalValue=totalSummary.finalAverageCTR
 }else if(options.name==='commission'){
  // let totalCommission=0.0;
      if (options.summaryProcess === 'start') {
        options.totalValue = 0;
        // totalClicks=0
      //  totalCommission=0.0
      }

      if (options.summaryProcess === 'calculate') {
        if (options.value){
          const commissionValue=parseFloat(options.value["Total Commission"].replace("$ ", ""))
          finalCommission+= commissionValue
        }
      }

      if (options.summaryProcess === 'finalize') {
       
          options.totalValue = finalCommission.toFixed(2);
        
      }


// options.totalValue=totalSummary.finalCommission
 }else if(options.name==="clickSummary"){
  // console.log("Option",+ " " +"name  "+ options.name+"value"+"  " +options.value)
  if (options.summaryProcess === 'start') {
    options.totalValue = 0;
  }

  if (options.value){
    options.totalValue +=options.value.CLICKS
  }
 
 }else if(options.name==="requestSummary"){
  if (options.summaryProcess === 'start') {
    options.totalValue = 0;
  }
  if (options.value){
    options.totalValue +=options.value.Ad_Requests
  }
  // options.totalValue +=options.value
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
      {/* <TotalItem
        name="clickSummary"
        summaryType="count"
        // valueFormat="currency"
        // displayFormat="Sum: {0}"
        showInColumn="CLICKS"
      /> */}
        <GroupItem
        showInColumn="CLICKS"
        summaryType="custom"
        displayFormat="Sum: {0}"
        alignByColumn={true}
        name="clickSummary"
        showInGroupFooter={true}
      />
          <GroupItem
         showInColumn="Ad_Requests"
        summaryType="custom"
        displayFormat="Sum: {0}"
        alignByColumn={true}
        name="requestSummary"
        showInGroupFooter={true}
      />
          <GroupItem
        showInColumn="CPC"
        summaryType="custom"
        displayFormat="Average CPC: $ {0}"
        alignByColumn={true}
        name="CPC"
        showInGroupFooter={true}
      />
           <GroupItem
        showInColumn="Total Commission"
        summaryType="custom"
        displayFormat="Commission: $ {0}"
        alignByColumn={true}
        name="commission"
        showInGroupFooter={true}
      />
       {/* <TotalItem
        name="requestSummary"
        summaryType="count"
        // valueFormat="currency"
        // displayFormat="Sum: {0}"
          
      />
        <TotalItem
        name="CPC"
        summaryType="custom"
        // valueFormat="currency"
        displayFormat="Average CPC: $ {0}"
        showInColumn="CPC"
      />
       <TotalItem
        name="commission"
        summaryType="custom"
        // valueFormat="currency"
        displayFormat="Commission: $ {0}"
        showInColumn="Total Commission"
        // showInGroupFooter={true}
      />
       <TotalItem
        name="CTR"
        summaryType="custom"
        // valueFormat="currency"
        displayFormat="Average CTR: {0}"
        showInColumn="CTR"
      /> */}
    </Summary>
    <SortByGroupSummaryInfo  />
  </DataGrid>
)};

export default DxGrid;
