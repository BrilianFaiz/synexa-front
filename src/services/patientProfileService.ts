import { apiFetch } from "./api";

export interface PatientProfileData {
  date_of_birth: string;
  gender: string;
  phone: string;
  address: string;
  stroke_history: boolean;
  stroke_date: string | null;
  notes: string;
}

export async function createPatientProfile(
  data: PatientProfileData
) {
  return apiFetch("/patient-profile", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getPatientProfile() {
  return apiFetch("/patient-profile");
}

export async function updatePatientProfile(
  data: Partial<PatientProfileData>
) {
  return apiFetch("/patient-profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}