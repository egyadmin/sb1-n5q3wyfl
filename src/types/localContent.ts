export interface LocalContentAnalysis {
  materialId: string;
  materialName: string;
  origin: 'local' | 'imported';
  localContentPercentage: number;
  certificationStatus: 'certified' | 'pending' | 'not-certified';
  lastUpdated: string;
}

export interface LocalContentRequirement {
  category: string;
  minimumPercentage: number;
  currentPercentage: number;
  status: 'compliant' | 'non-compliant';
  deadline: string;
}

export interface MandatoryListItem {
  id: string;
  category: string;
  description: string;
  minimumLocalContent: number;
  effectiveDate: string;
  exemptionCriteria?: string[];
}