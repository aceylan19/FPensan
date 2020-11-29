import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseModelsService {

  constructor() {
  }

  // -- Get Test Template Response
  getTestTemplateResponse = {
    get() {
      const model = {
        MeasurementTypes: null,
        MeasurementInputTypes: null,
        DIEGroups: null,
        ProductColors: null,
        ProductClasses: null,
        DeltaTypes: null,
        TestTemplateFileTypeId: null
      };
      return model;
    }
  };
  // --
  // -- Get Temporary Value Response
  getTemporaryValueResponse = {
    get() {
      const model = {
        ProductClasses: null,
        ProductionLines: null,
        DeltaTypes: null
      };
      return model;
    }
  };
  // -- Dashboard Response
  getDashboardResponse = {
    get() {
      const model = {
        ShiftDate: null,
        Shift: null,
        Shifts: null,
        CompletedTaskCount: null,
        ExpiredTaskCount: null,
        ActiveTaskCount: null,
        Tasks: null,
        WorkingLineCount: null,
        ProductionLines: null
      };
      return model;
    }
  };
  // --
  // -- Start QA Test Response
  startQATestResponse = {
    get() {
      const model = {
        QATestId: null,
        QATestNo: null,
        QATestTypeDesc: null,
        QATestTaskId: null,
        CreatedUserTitle: null,
        CreatedDate: null,
        CompletedDate: null,
        ProductionLineId: null,
        ProductionLineName: null,
        DIECode: null,
        DIEShortCode: null,
        DIEName: null,
        ProductClassId: null,
        ProductClassName: null,
        ProductColorId: null,
        ProductColorName: null,
        ProductionTypeName: null,
        QATestStatus: null,
        UserTitle: null,
        QATestCategoryDesc: null,
        QATestStatusDesc: null,
        QATestDetails: null,
        Files: null,
        DeltaValues: null,
        TestValue: null
      };
      return model;
    }
  };
  // --
}
