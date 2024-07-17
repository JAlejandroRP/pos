import { analysisStatus } from "@/constants";
import { ObjectId } from "mongodb";
import { User } from "./user.model";
import { Analysis } from "./Analysis.model";

export type AnalysisStatus = {
  _id?: ObjectId;
  user: User;
  analysis: Analysis[],
  status: analysisStatus,
  pdfUrl: string,
  creationDate: Date,
  completedDate: Date,
  isUrgent: boolean
}