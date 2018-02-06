import * as React from 'react';
import { Link } from "react-router-dom";
import RightContainer from './RightContainer';
import Loader from 'react-loader-advanced';
import { HomeTestDrive } from '../../home/model';


interface HomeRightTestDrivesProps {
    updateUI: (any) => any;
    ui: any;
    upcomingTestDrive: HomeTestDrive[];
    upcomingTestDriveLoading: boolean;
    activeTestDrive: HomeTestDrive[];
    activeTestDriveLoading: boolean;
};
class HomeRightTestDrives extends React.Component<HomeRightTestDrivesProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {
            ui,
            updateUI,
            upcomingTestDrive,
            upcomingTestDriveLoading,
            activeTestDrive,
            activeTestDriveLoading
        } = this.props
        return (<div className="col-md-4 black_box_right pull-right black_box">
            <div className="row">
                <div className="well">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#up_drives" data-toggle="tab">UPCOMING TEST DRIVES</a></li>
                        <li className="pull-right"><a href="#active_drives" data-toggle="tab">ACTIVE TEST DRIVES</a></li>
                    </ul>

                    <div id="myTabContent" className="tab-content">

                        <div className="tab-pane active in" id="up_drives">
                            <Loader show={upcomingTestDriveLoading} message={'Loading test drives...'}>
                                <div className="col-md-12">
                                    {
                                        upcomingTestDrive && upcomingTestDrive.map((testDrive, index) => {
                                            return (
                                                <RightContainer
                                                    key={index}
                                                    testDriveId={index + 1}
                                                    testDriveName={testDrive.title}
                                                    endDate={testDrive.enddate}
                                                    participants={testDrive.participants}
                                                    checkPortion={"upTestDrive"}
                                                ></RightContainer>)
                                        })
                                    }
                                    {upcomingTestDrive.length == 0 && <p>There are no upcomming test drives.</p>}
                                </div>
                            </Loader>
                        </div>


                        <div className="tab-pane fade" id="active_drives">
                            <Loader show={activeTestDriveLoading} message={'Loading test drives...'}>
                                <div className="col-md-12">
                                    {
                                        activeTestDrive && activeTestDrive.map((testDrive, index) => {
                                            return (
                                                <RightContainer
                                                    key={index}
                                                    testDriveId={index + 1}
                                                    testDriveName={testDrive.title}
                                                    endDate={testDrive.enddate}
                                                    participants={testDrive.participants}
                                                    checkPortion={"activeTestDrive"}></RightContainer>)
                                        })
                                    }
                                    {activeTestDrive.length == 0 && <p>There are no active test drives.</p>}
                                </div>
                            </Loader>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }
}

export default HomeRightTestDrives;