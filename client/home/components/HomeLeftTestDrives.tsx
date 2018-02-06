import * as React from 'react';
import { Link } from "react-router-dom";
import MyTestDrives from './LeftContainer';
import Loader from 'react-loader-advanced';
import { HomeTestDrive, TestDrive } from '../../home/model';
import LeftContainer from './LeftContainer';

interface HomeLeftTestDrivesProps {
    updateUI: (any) => any;
    ui: any;
    mytestDrive: HomeTestDrive[];
    myTestDriveLoading: boolean;
    testDriveThatIRun: HomeTestDrive[];
    testDriveThatIRunLoading: boolean;
};
class HomeLeftTestDrives extends React.Component<HomeLeftTestDrivesProps> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            ui,
            updateUI,
            mytestDrive,
            myTestDriveLoading,
            testDriveThatIRun,
            testDriveThatIRunLoading
        } = this.props;

        return (<div className="col-md-4 black_box black_box_left pull-left">
            <div className="row">
                <div className="well">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#home" data-toggle="tab">MY TEST DRIVES</a></li>
                        <li className="pull-right"><a href="#profile" data-toggle="tab">TEST DRIEVES I RUN</a></li>
                    </ul>
                    <div id="myTabContent" className="tab-content">
                        <div className="tab-pane active in" id="home">
                            <Loader show={myTestDriveLoading} message={'Loading test drives...'}>
                                <div className="col-md-12">
                                    {
                                        mytestDrive && mytestDrive.map((testDrive, index) => {
                                            return (<LeftContainer
                                                key={index}
                                                testDriveId={index + 1}
                                                testDriveName={testDrive.title}
                                                endDate={testDrive.enddate}
                                                participants={testDrive.participants}
                                                checkPortion={"myTestDrive"}
                                                testDrive = {testDrive.testDrive} />)
                                        })

                                         
                                    }
                                    {mytestDrive.length == 0 && <p>You have not participated in any test dirve yet.</p>}
                                </div>
                            </Loader>
                        </div>
                        <div className="tab-pane fade" id="profile">
                            <Loader show={testDriveThatIRunLoading} message={'Loading test drives...'}>
                                <div className="col-md-12">
                                    {
                                        testDriveThatIRun && testDriveThatIRun.map((testDrive, index) => {
                                            return (<LeftContainer
                                                key={index}
                                                testDriveId={index + 1}
                                                testDriveName={testDrive.title}
                                                endDate={testDrive.enddate}
                                                participants={testDrive.participants}
                                                checkPortion={"testDriveThatIRun"}
                                                testDrive = {testDrive.testDrive} />)
                                        })
                                    }
                                    {testDriveThatIRun.length == 0  && <p>You have not created any test dive yet.</p>}
                                </div>
                            </Loader>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default HomeLeftTestDrives;