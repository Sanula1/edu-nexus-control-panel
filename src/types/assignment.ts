
export interface Temple {
  id: number;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
  province?: string | null;
  district?: string | null;
  town?: string | null;
}

export interface Dana {
  id: number;
  name: string;
  description: string;
  time: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
}

export interface Family {
  id: number;
  familyName: string;
  address: string;
  telephone: string;
}

export interface Assignment {
  id: number;
  family: Family;
  date: string;
  isConfirmed: boolean | null;
  confirmationDate: string;
}

export interface TempleDana {
  // Updated to use consistent temple structure
  temple: Temple;
  dana: Dana;
  minNumberOfFamilies: number;
  assignments: Assignment[];
}

export interface TempleDanaAssignment {
  id: number;
  templeDana: TempleDana;
  family: Family;
  date: string;
  isConfirmed: boolean | null;
  confirmationDate: string;
}
