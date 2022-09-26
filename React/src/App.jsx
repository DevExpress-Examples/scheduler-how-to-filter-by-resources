import React, { useCallback, useState } from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

import Scheduler from 'devextreme-react/scheduler';
import TagBox from 'devextreme-react/tag-box';

import { data, assignees, places } from './data';

const groups = ['assigneeId'];
const views = ['day'];

const currentDate = new Date(2021, 3, 26)
const defaultAssignees = assignees.map(item => item.id);

const App = () => {
    const [resources, setResources] = useState([
        {
            fieldExpr: 'assigneeId',
            dataSource: assignees,
            label: 'Assignee',
        }, {
            fieldExpr: 'placeId',
            dataSource: places,
            label: 'Place',
            useColorAsDefault: true,
        }
    ]);


    const onTagBoxValueChanged = useCallback((e) => {
        const selectedValues = assignees.filter((item) => e.value.includes(item.id));
        setResources([
            {
                fieldExpr: 'assigneeId',
                dataSource: selectedValues,
                label: 'Assignee',
            }, {
                fieldExpr: 'placeId',
                dataSource: places,
                label: 'Place',
                useColorAsDefault: true,
            }
        ]);
    }, []);

    return (
        <div>
            <TagBox
                className='resources'
                dataSource={assignees}
                defaultValue={defaultAssignees}
                valueExpr='id'
                displayExpr='text'
                searchEnabled={true}
                showSelectionControls={true}
                onValueChanged={onTagBoxValueChanged}
            >
            </TagBox>
            <Scheduler
                timeZone='America/Los_Angeles'
                dataSource={data}
                views={views}
                currentView='day'
                currentDate={currentDate}
                startDayHour={9}
                endDayHour={19}
                groups={groups}
                resources={resources}
                height={600}
            >
            </Scheduler>
        </div>
    )
}

export default App;