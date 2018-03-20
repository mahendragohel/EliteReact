import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import Pager from 'react-pager';
import Services from '../../common/services/services';
import Promise from "ts-promise";
import {
    model,
    loadMyCompletedTestDrives,
    MyTestDrivesCompletedItem,
    MyTestDrivesInProgressItem
} from '../../test_drive';
import { Messages } from '../../common/services/constants';

interface MyTestDrivesContainerProps {
    myCompletedTestDrives: model.MyTestDrive[]
    myCompletedTestDrivesLoading: boolean,
    myInprogressTestDrives: model.MyTestDrive[],
    myInprogressTestDrivesLoading: boolean,
    loadMyCompletedTestDrives: (skip: number, top: number) => any;
    loadMyInprogressTestDrives: (skip: number, top: number) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        itemsPerPage: 3,
        total: 11,
        completedItemCurrent: 0,
        inprogressItemCurrent: 0,
        completedItems: [],
        inprogressItems: [],
        visiblePages: 4,
        visibleItems: [],
        myCompletedTestDrivesLoading: false,
        myCompletedTestDrives: [],
        myInprogressTestDrivesLoading: false,
        myInprogressTestDrives: []
    }
})
class MyTestDrivesContainer extends React.Component<MyTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        var self = this;
        var Promisses = [];
            self.props.updateUI({
                myCompletedTestDrivesLoading: true,
                myInprogressTestDrivesLoading: true,
            });

            Services.getMyCompletedTestDrives(0, 1000).then(data=>{
                self.props.updateUI({
                    myCompletedTestDrivesLoading: false,
                    myCompletedTestDrives: data || [],
                });
                this.initialize();
            });

            Services.getMyInProgressTestDrives(0, 1000).then(data=>{
                self.props.updateUI({
                    myInprogressTestDrivesLoading: false,
                    myInprogressTestDrives: data || []
                });
                this.initialize();
            });
    }


    getVisibleItems(newPage: number, array: any[], visibleItems: string, currentPage: string) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            // [currentPage]: newPage,
            [visibleItems]: array.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    initialize() {
        const { ui, updateUI } = this.props;
        const {
            myCompletedTestDrivesLoading,
            myCompletedTestDrives,
            myInprogressTestDrives,
            myInprogressTestDrivesLoading
        } = ui;

        if (!myCompletedTestDrivesLoading && myCompletedTestDrives && myCompletedTestDrives.length && !ui.completedItems.length) {
            var currentPage = ui.completedItemCurrent;
            if (ui.completedItems.length < ui.completedItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, myCompletedTestDrives, 'completedItems', 'completedItemCurrent');
        }
        if (!myInprogressTestDrivesLoading && myInprogressTestDrives && myInprogressTestDrives.length && !ui.inprogressItems.length) {
            var currentPage = ui.inprogressItemCurrent;
            if (ui.inprogressItems.length < ui.inprogressItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent');
        }
    }

    render() {
        const { ui, updateUI,
            loadMyInprogressTestDrives, loadMyCompletedTestDrives } = this.props;
        const {
            myCompletedTestDrivesLoading,
            myCompletedTestDrives,
            myInprogressTestDrives,
            myInprogressTestDrivesLoading
        } = ui;

        const loading = myCompletedTestDrivesLoading && myInprogressTestDrivesLoading;
        this.initialize();
        return (
            <div>
                {ui.isCreaseTestDriveVisible ? <div className="centralbox_button">
                    <div className="button type1 nextBtn btn-lg pull-right animated_button">
                        <Link to={"/testdrive"} >Create Test Drive</Link>
                    </div>
                </div> : ''}
                <Tabs selected={0}>
                    <Pane label="TEST DRIVES IN PROGRESS">
                        <div>
                            <Loader show={myCompletedTestDrivesLoading} message={'Loading...'}>
                                {
                                    (!myInprogressTestDrivesLoading && ui.inprogressItems && ui.inprogressItems.length) ?
                                        ui.inprogressItems.map((testDriveObj: any, index) => {
                                            return (<MyTestDrivesCompletedItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive}
                                                participants={testDriveObj.participants}
                                                testDriveResponse={testDriveObj.testDriveResponse}
                                                checkPortion={'inProgressTestDrive'}
                                                index={index}
                                                isCompleted={false}
                                            />)
                                        }) : (!loading && <div className="no-data-message">{Messages.TEST_DRIVE_INPROGRESS_MSG}</div>)
                                }
                                {
                                    (!myInprogressTestDrivesLoading && ui.inprogressItems && ui.inprogressItems.length > 0) ?
                                        <div className="row">
                                            <Pager
                                                total={Math.ceil(myInprogressTestDrives.length / ui.itemsPerPage)}
                                                current={ui.inprogressItemCurrent}
                                                visiblePages={ui.visiblePages}
                                                titles={{ first: '<', last: '>' }}
                                                className="pagination-sm pull-right"
                                                onPageChanged={(newPage) => this.getVisibleItems(newPage, myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent')}
                                            />
                                        </div> : ''

                                }

                            </Loader>
                        </div>
                    </Pane>
                    <Pane label="COMPLETED TEST DRIVES">
                        <div>
                            <Loader show={myCompletedTestDrivesLoading} message={'Loading...'}>
                                <div className="row">{
                                    (!myCompletedTestDrivesLoading && ui.completedItems && ui.completedItems.length) ?
                                        ui.completedItems.map((testDriveObj, index) => {
                                            return (<MyTestDrivesCompletedItem
                                                key={index}
                                                testDrive={testDriveObj.testDrive}
                                                participants={testDriveObj.participants}
                                                testDriveResponse={testDriveObj.testDriveResponse}
                                                checkPortion={'completedTestDrive'}
                                                index={index}
                                                isCompleted={true}
                                            />)
                                        }) : (!loading && <div className="no-data-message">{Messages.TEST_DRIVE_COMPLETED_MSG}</div>)
                                } </div>
                                {
                                    (!myCompletedTestDrivesLoading && ui.completedItems && ui.completedItems.length > 0) ?
                                        <div className="row">
                                            <Pager
                                                total={Math.ceil(myCompletedTestDrives.length / ui.itemsPerPage)}
                                                current={ui.completedItemCurrent}
                                                visiblePages={ui.visiblePages}
                                                titles={{ first: '<', last: '>' }}
                                                className="pagination-sm pull-right"
                                                onPageChanged={(newPage) => this.getVisibleItems(newPage, myCompletedTestDrives, 'completedItems', 'completedItemCurrent')}
                                            />
                                        </div> : ''
                                }
                            </Loader>
                        </div>
                    </Pane>
                </Tabs>
            </div>)
    }
}

export default MyTestDrivesContainer;
