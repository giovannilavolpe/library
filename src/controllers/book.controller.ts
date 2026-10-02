import { Request, Response } from "express";
import { createBookService, deleteBookService, getBookByIdService, putBookService, } from "../services/book.service.js";

export async function getBookByIdController(req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ error: "El ID debe ser un entero positivo." });
  }

  try {
    const book = await getBookByIdService(bookId);

    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado." });
    }

    return res.status(200).json({ data: book });
  } catch {
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

export async function createBookController(req: Request, res: Response) {
  const { title, year, author_id } = req.body;

  if (
    typeof title !== "string" ||
    !Number.isInteger(year) ||
    !Number.isInteger(author_id)
  ) {
    return res.status(400).json({
      error: "Hubo un error en los datos.",
    });
  }

  try {
    const book = await createBookService({ title, year, author_id });
    return res.status(201).json({ data: book });
  } catch {
    return res.status(500).json({ error: "No se pudo crear el libro." });
  }
}

export async function putBookController(req: Request, res: Response) {
  const bookId = Number(req.params.id);
  const { title, year, author_id } = req.body;

  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ error: "El ID debe ser un entero positivo." });
  }

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    !Number.isInteger(year) ||
    year <= 0 ||
    !Number.isInteger(author_id) ||
    author_id <= 0
  ) {
    return res.status(400).json({
      error: "Hubo un error en los datos.",
    });
  }

  try {
    const book = await putBookService(bookId, { title, year, author_id });

    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado." });
    }

    return res.status(200).json({ data: book });
  } catch {
    return res.status(500).json({ error: "No se pudo actualizar el libro." });
  }
}


export async function deleteBookController(req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (!Number.isInteger(bookId) || bookId <= 0) {
    return res.status(400).json({ error: "El ID debe ser un entero positivo." });
  }

  try {
    const deleted = await deleteBookService(bookId);

    if (!deleted) {
      return res.status(404).json({ error: "Libro no encontrado." });
    }
  } catch {
    return res.status(500).json({ error: "No se pudo eliminar el libro." });
  }

  return res.status(200).json({ message: "Libro eliminado exitosamente." });
}