import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import services from '../../common/services/services';
import { TestDrive } from '../../test_drive/model';
import Footer from '../../common/components/Footer';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';

import {
  ApprovalPendingContainer,
  MyTestDrivesContainer,
  TestDrivesIRunContainer,
  TestDriveIRunItem,
  model,
  editTestDrive,
  deleteTestDrive,
  loadTestDrives,
  loadMyCompletedTestDrives,
  loadMyInprogressTestDrives,
  loadInProgressTestDrivesIRun,
  loadUpcommingTestDrivesIRun,
  loadCompletedTestDrivesIRun,
  loadDraftedTestDrivesIRun,
  loadSubmittedTestDrivesIRun,
  loadActiveTestDrives,
  loadUpCommingTestDrives,
  loadApprovedTestDrives,
  loadTestDrivesWaitingForApproval,
  approveTestDrive
} from '../../test_drive';


import ActiveTestDrivesContainer from '../../test_drive/components/ActiveTestDrivesContainer';
import UpCommingTestdrivesContainer from '../../test_drive/components/UpCommingTestdrivesContainer';

interface AppProps {
  testDriveState: model.IState;
  testDriveIRun: model.TestDrive[];
  dispatch: Dispatch<{}>;
  myCompletedTestDrives: model.MyTestDrive[];
  myCompletedTestDrivesLoading: boolean;
  myInprogressTestDrives: model.MyTestDrive[];
  myInprogressTestDrivesLoading: boolean;
  inProgressTestDrivesIRun: model.TestDriveIRun[];
  inProgressTestDrivesIRunLoading: boolean;
  upcommingTestDrivesIRun: TestDrive[]
  upcommingTestDrivesIRunLoading: boolean;
  completedTestDrivesIRun: model.TestDriveIRun[];
  completedTestDrivesIRunLoading: boolean;
  draftedTestDrivesIRun: TestDrive[];
  draftedTestDrivesIRunLoading: boolean;
  submittedTestDrivesIRun: TestDrive[];
  submittedTestDrivesIRunLoading: boolean;
  activeTestDrives: TestDrive[];
  activeTestDrivesLoading: boolean;
  upCommingTestDrives: TestDrive[];
  upCommingTestDrivesLoading: boolean;
  approvedTestDrives: TestDrive[];
  approvedTestDrivesLoading: boolean;
  testDrivesWaitingForApproval: TestDrive[];
  testDrivesWaitingForApprovalLoading: boolean;
  saveTestDriveApprovalLoading: boolean;
}

@ui({
  // Save all state within the 'testDrives' key of the UI reducer
  key: "testDrives"
})

class TestDrivesCentralContainer extends React.Component<AppProps> {

  componentDidMount() {
    document.body.className = "black-bg";
    this.props.dispatch(loadTestDrives(services.getCurrentUserID()));
  }

  render() {
    const { testDriveState, testDriveIRun, dispatch,
      myCompletedTestDrives,
      myCompletedTestDrivesLoading,
      myInprogressTestDrives,
      myInprogressTestDrivesLoading,
      inProgressTestDrivesIRun,
      inProgressTestDrivesIRunLoading,
      upcommingTestDrivesIRun,
      upcommingTestDrivesIRunLoading,
      completedTestDrivesIRun,
      completedTestDrivesIRunLoading,
      draftedTestDrivesIRun,
      draftedTestDrivesIRunLoading,
      submittedTestDrivesIRun,
      submittedTestDrivesIRunLoading,
      activeTestDrives,
      activeTestDrivesLoading,
      upCommingTestDrives,
      upCommingTestDrivesLoading,
      approvedTestDrives,
      approvedTestDrivesLoading,
      testDrivesWaitingForApproval,
      testDrivesWaitingForApprovalLoading,
      saveTestDriveApprovalLoading

    } = this.props;
    return (
      <div className="testDrives container">
        <div>
          <h2 className="page-heading">Create Test Drive</h2>
          <h4 className="cancel-btn"><Link to={"/home"}>Cancel</Link></h4>
          <div className="clearBoth"></div>
          <div className="col-md-12">
            <div className="row">
              <div className="well">
                <Tabs selected={0}>
                  <Pane label="MY TEST DRIVES">
                    <MyTestDrivesContainer
                      myCompletedTestDrives={myCompletedTestDrives}
                      myCompletedTestDrivesLoading={myCompletedTestDrivesLoading}
                      myInprogressTestDrives={myInprogressTestDrives}
                      myInprogressTestDrivesLoading={myInprogressTestDrivesLoading}
                      loadMyCompletedTestDrives={(skip, top) => dispatch(loadMyCompletedTestDrives(skip, top))}
                      loadMyInprogressTestDrives={(skip, top) => dispatch(loadMyInprogressTestDrives(skip, top))} />
                  </Pane>
                  <Pane label="TEST DRIEVES I RUN">
                      <TestDrivesIRunContainer testDriveIRun={testDriveIRun} />
                  </Pane>
                  <Pane label="Active Test Drive">
                    <ActiveTestDrivesContainer
                      activeTestDrives={activeTestDrives}
                      activeTestDrivesLoading={activeTestDrivesLoading}
                      loadActiveTestDrives={(skip, top) => dispatch(loadActiveTestDrives(skip, top))} />
                  </Pane>
                  <Pane label="Upcomming Test Drive">
                    <UpCommingTestdrivesContainer
                      upCommingTestDrives={upCommingTestDrives}
                      upCommingTestDrivesLoading={upCommingTestDrivesLoading}
                      loadUpCommingTestDrives={(skip, top) => dispatch(loadUpCommingTestDrives(skip, top))} />
                  </Pane>
                  <Pane label="PENDING APPROVALS">
                    <ApprovalPendingContainer
                      approvedTestDrives={approvedTestDrives}
                      approvedTestDrivesLoading={approvedTestDrivesLoading}
                      testDrivesWaitingForApproval={testDrivesWaitingForApproval}
                      testDrivesWaitingForApprovalLoading={testDrivesWaitingForApprovalLoading}
                      loadApprovedTestDrives={(skip, top) => dispatch(loadApprovedTestDrives(skip, top))}
                      loadTestDrivesWaitingFormApproval={(skip, top) => dispatch(loadTestDrivesWaitingForApproval(skip, top))}
                      saveTestDriveApprovalLoading = {saveTestDriveApprovalLoading}
                      approveTestDrive={(id) => dispatch(approveTestDrive(id))}
                    />
                  </Pane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  state.testDriveState.loading = state.testDriveState.loading ||
    state.asyncInitialState.loading;

  const {
    testDriveState,
    testDriveIRun,
    myCompletedTestDrives,
    myCompletedTestDrivesLoading,
    myInprogressTestDrives,
    myInprogressTestDrivesLoading,
    inProgressTestDrivesIRun,
    inProgressTestDrivesIRunLoading,
    upcommingTestDrivesIRun,
    upcommingTestDrivesIRunLoading,
    completedTestDrivesIRun,
    completedTestDrivesIRunLoading,
    draftedTestDrivesIRun,
    draftedTestDrivesIRunLoading,
    submittedTestDrivesIRun,
    submittedTestDrivesIRunLoading,
    activeTestDrives,
    activeTestDrivesLoading,
    upCommingTestDrives,
    upCommingTestDrivesLoading,
    approvedTestDrives,
    approvedTestDrivesLoading,
    testDrivesWaitingForApproval,
    testDrivesWaitingForApprovalLoading,
    saveTestDriveApprovalLoading
  } = state.testDriveState;

  return {
    testDriveState,
    testDriveIRun,
    myCompletedTestDrives,
    myCompletedTestDrivesLoading,
    myInprogressTestDrives,
    myInprogressTestDrivesLoading,
    inProgressTestDrivesIRun,
    inProgressTestDrivesIRunLoading,
    upcommingTestDrivesIRun,
    upcommingTestDrivesIRunLoading,
    completedTestDrivesIRun,
    completedTestDrivesIRunLoading,
    draftedTestDrivesIRun,
    draftedTestDrivesIRunLoading,
    submittedTestDrivesIRun,
    submittedTestDrivesIRunLoading,
    activeTestDrives,
    activeTestDrivesLoading,
    upCommingTestDrives,
    upCommingTestDrivesLoading,
    approvedTestDrives,
    approvedTestDrivesLoading,
    testDrivesWaitingForApproval,
    testDrivesWaitingForApprovalLoading,
    saveTestDriveApprovalLoading
  }
};

export default connect(mapStateToProps)(TestDrivesCentralContainer);