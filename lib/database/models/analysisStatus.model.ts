import { analysisStatus } from "@/constants";
import { ObjectId } from "mongodb";
import { User } from "./user.model";
import { Analysis } from "./analysis.model";
import { Perfil } from "./perfil.model";

export type AnalysisStatus = {
  _id?: ObjectId;
  user: User;
  perfils: Perfil[],
  analysis: Analysis[],
  status: analysisStatus,
  pdfUrl: string,
  creationDate: Date,
  completedDate: Date,
  isUrgent: boolean
}