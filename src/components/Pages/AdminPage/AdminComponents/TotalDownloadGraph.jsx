
import React, {useState} from 'react'
import '../AdminPage.scss'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


function TotalDownloadGraph() {

    const [acceptvalue, setAcceptValue] = useState(70);
    const [rejectvalue, setRejectValue] = useState(30);

    let accept = {
        value: 'Accept',
         area: acceptvalue
    }
    let reject = {
        value: 'Reject',
        area: rejectvalue 
    }
    const data = [
        accept,
        reject  
        
    ];

    return (
        <div className="totaldownloadgraph">
            <h1>Download Graph</h1>
            <Paper className= "Paper">
                <Chart
                data={data}
                >
                <PieSeries
                    valueField="area"
                    argumentField="value"
                    
                />
                <Animation />
                </Chart>
            </Paper>
        </div>
    )
}

export default TotalDownloadGraph





