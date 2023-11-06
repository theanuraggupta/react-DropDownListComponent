import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';

import { PropertyPane } from './property-pane';
const Filtering = () => {
    let treegridInstance = useRef(null);
    const modes = [
        { text: "Parent", value: "Parent" },
        { text: "Child", value: "Child" },
        { text: "Both", value: "Both" },
        { text: "None", value: "None" },
    ];
    const onChange = (sel) => {
        let mode = sel.value.toString();
        treegridInstance.current.filterSettings.hierarchyMode = mode;
        treegridInstance.current.clearFiltering();
    };
    return (<div className="control-pane">
      <div className="control-section">
        <div className="col-md-9">
          <TreeGridComponent dataSource={sampleData} ref={treegridInstance} treeColumnIndex={1} childMapping="subtasks" height="350" allowPaging={true} allowFiltering={true} filterSettings={{
            mode: "Immediate",
            type: "FilterBar",
            hierarchyMode: "Parent",
        }}>
            <ColumnsDirective>
              <ColumnDirective field="taskID" headerText="Task ID" width="90" textAlign="Right"></ColumnDirective>
              <ColumnDirective field="taskName" headerText="Task Name" width="200"></ColumnDirective>
              <ColumnDirective field="startDate" headerText="Start Date" width="120" format="yMd" textAlign="Right"/>
              <ColumnDirective field="duration" headerText="Duration" width="110" textAlign="Right"/>
              <ColumnDirective field="progress" headerText="Progress" width="110" textAlign="Right"/>
            </ColumnsDirective>
            <Inject services={[Filter, Page]}/>
          </TreeGridComponent>
        </div>
        <div className="col-md-3 property-section">
          <PropertyPane title="Properties">
            <table id="property" title="Properties" className="property-panel-table" style={{ width: "100%" }}>
              <tr>
                <td style={{ width: "30%" }}>
                  <div style={{ paddingTop: "10px" }}> Hierarchy Mode </div>
                </td>
                <td style={{ width: "70%" }}>
                  <div>
                    <DropDownListComponent width="100px" id="selmode" change={onChange.bind(this)} dataSource={modes} value="Parent"/>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
    </div>);
};
export default Filtering;

const root = createRoot(document.getElementById('sample'));
root.render(<Filtering />);