import { Request, Response } from "express";
import Report from "../models/report";

// Funcion para crear un reporte
export const createReport = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.place ||
    !req.body.epp ||
    !req.body.time ||
    !req.body.company_id ||
    !req.body.supervisor
  ) {
    return res
      .status(400)
      .json({ msg: "Please. Send all the required fields" });
  }
  const newReport = new Report(req.body);
  try {
    await newReport.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  return res.status(201).json(newReport);
};

// Funcion para obtener todos los reportes de una empresa
export const getReports = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const reports = await Report.find({
    company_id: req.params.company_id,
  })
    .populate({
      path: "supervisor",
      model: "User",
      select: "name surname",
    })
    .exec();
  return res.json(reports);
};
