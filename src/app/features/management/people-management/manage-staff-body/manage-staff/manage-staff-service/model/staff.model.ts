export interface Staff {
    accountNonLocked: boolean;
    email: string;
    id: number;
    fullName: string;
    contactNumber : string;
    startedWorkingOn : string;
    profilePath: string;
  }

export interface StaffWithImageData {
    staff: Staff,
    image: string
  }