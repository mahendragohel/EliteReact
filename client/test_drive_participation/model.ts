export type TestCaseInstance = {
    testCaseId: number;
    testDriveID?: number;
    userID: number;
    title: string;
    description: string;
    expectedOutcome: string;
    isInEditMode?: boolean;
    testCaseType: string;
    scenario: string;
    priority: string;
    points: number;
    reTest: boolean;
    newItem?: boolean;
    testCaseResponse: string;
    responseStatus: string;
    
}

export type Question = {
    questionID: number;
    testDriveID?: number;
    title: string;
    questionType: string;
    options: Array<string>;
    isInEditMode?: boolean;
    newItem?: boolean
    responseStatus: string;
    userID: number;
    
}


export type TestDriveInstance = {
    instanceID: number;
    testDriveID: number;
    title: string;
    description?: string;
    maxPoints?: number;
    startDate: string;
    endDate: string;
    expectedBusinessValue: string;
    department?: string;
    region: string[];
    location: string[];
    requiredDevices: string[];
    requiredOs: string[];
    maxTestDrivers: number;
    testCases: TestCaseInstance[];
    testCaseIDs?: number[];
    questions: Question[];
    questionIDs?: number[];
    status: string;
    level: string;
    owner?: string;
    newItem?: boolean;
    currentPoint: number;
    dateJoined: string;
    numberOfTestCasesCompleted: number;
};

export type Configurations = {
    testCasePoints: number;
    testDriveLevelsConfig: object;
    fieldDescription: object
}

export type IState = {
    testDriveInstance: TestDriveInstance,
    testCase: TestCaseInstance,
    question: Question,
    loading: boolean,
    activeTab: string,
    configurations: Configurations;
    configurationLoaded: boolean;
}
