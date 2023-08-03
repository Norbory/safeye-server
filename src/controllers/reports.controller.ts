import { Request, Response } from "express";
import Report from "../models/report";

// Funcion para crear un reporte
export const createReport = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.place || !req.body.epp || !req.body.time) {
    return res
      .status(400)
      .json({ msg: "Please. Send the place, epp and time" });
  }
  const newReport = new Report(req.body);
  await newReport.save();

  return res.status(201).json(newReport);
};

// Funcion para obtener todos los reportes de una empresa
export const getReports = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const reports = await Report.find({ company_id: req.params.company_id });
  return res.json(reports);
};
