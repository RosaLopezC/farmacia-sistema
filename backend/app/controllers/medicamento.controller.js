import db from "../models/index.js";
const Medicamento = db.medicamento;
const TipoMedic = db.tipomedic;
const Especialidad = db.especialidad;

export const getMedicamentos = async (req, res) => {
  try {
    console.log('Obteniendo medicamentos...');
    const medicamentos = await Medicamento.findAll({
      include: [
        {
          model: TipoMedic,
          attributes: ['CodTipoMed', 'nombre', 'descripcion']
        },
        {
          model: Especialidad,
          attributes: ['CodEspec', 'nombre', 'descripcion']
        }
      ]
    });
    console.log('Medicamentos encontrados:', medicamentos);
    res.json(medicamentos);
  } catch (error) {
    console.error('Error en getMedicamentos:', error);
    res.status(500).json({ 
      message: error.message || "Error obteniendo medicamentos."
    });
  }
};

export const createMedicamento = async (req, res) => {
  try {
    const medicamento = await Medicamento.create(req.body);
    res.status(201).json(medicamento);
  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Error creando medicamento."
    });
  }
};