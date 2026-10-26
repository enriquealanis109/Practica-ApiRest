import express from "express";
import type { Request, Response } from "express";
import { rootCertificates } from "node:tls";

//INICIALIZAR LA APLICACION DE EXPRESS
const app = express();
const PORT = 3000;
// MIDDLEWARE OBLIGATORIO PARA JSON
app.use(express.json());

interface Libros {
  id: number;
  titulo: string;
  autor: string;
  paginas: number;
  disponible: boolean;
}

const listaLibros: Libros[] = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    paginas: 471,
    disponible: true,
  },
  {
    id: 2,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    paginas: 96,
    disponible: true,
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    paginas: 328,
    disponible: false,
  },
  {
    id: 4,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    paginas: 863,
    disponible: true,
  },
  {
    id: 5,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    paginas: 600,
    disponible: false,
  },
];

//GET
app.get("/api/libros", function (req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Lista de estudiantes de libros",
    total: listaLibros.length,
    data: listaLibros,
  });
});

//GET Buscar por ID
app.get("/api/libros/:id", function (req: Request, res: Response) {
  const idBuscando = Number(req.params.id);
  const libroEncontrado = listaLibros.find((e) => e.id === idBuscando);
  if (!libroEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: `El libro con el id ${idBuscando} no existe!!!`,
    });
  }
  res.status(200).json({
    ok: true,
    data: libroEncontrado,
  });
});

//POST
app.post("/api/libros", function (req: Request, res: Response) {
  const { titulo, autor, paginas, disponible } = req.body; //desestructuracion{}

  let nuevoLibro: Libros = {
    id: listaLibros.length + 1,
    titulo,
    autor,
    paginas,
    disponible,
  };
  listaLibros.push(nuevoLibro);
  res.status(201).json({
    ok: true,
    mensaje: "El libro fue registrado con éxito!!",
    data: nuevoLibro,
  });
});

//PUT
app.put("/api/libros/:id", function (req: Request, res: Response) {
  const idBuscando = Number(req.params.id);
  const libroModificado = listaLibros.find((e) => e.id === idBuscando);
  const { titulo, autor, paginas, disponible } = req.body; //desestructuracion{}
  if (!libroModificado) {
    return res.status(404).json({
      ok: false,
      mensaje: `El libro con el id ${idBuscando} no existe!!!`,
    });
  }
  libroModificado.titulo = titulo;
  libroModificado.autor = autor;
  libroModificado.paginas = paginas;
  libroModificado.disponible = disponible;

  res.status(200).json({
    ok: true,
    mensaje: "El libro fue actualizado con éxito!!",
    data: libroModificado,
  });
});

//DELETE
app.delete("/api/libros/:id", function (req: Request, res: Response) {
  const idBuscando = Number(req.params.id);
  const libroEliminado = listaLibros.findIndex((e) => e.id === idBuscando);
  if (libroEliminado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `El libro con el id ${idBuscando} no existe!!!`,
    });
  }
  listaLibros.splice(libroEliminado, 1);
  res.status(200).json({
    ok: true,
    mensaje: "El libro fue eliminado con éxito!!",
    data: libroEliminado,
  });
});

app.listen(PORT, function () {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
