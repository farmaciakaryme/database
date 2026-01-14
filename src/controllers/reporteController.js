import Reporte from '../models/Reporte.js';
import Paciente from '../models/Paciente.js';
import Prueba from '../models/Prueba.js';

// @desc    Obtener todos los reportes
// @route   GET /api/reportes
// @access  Private
export const getReportes = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      estado = 'all',
      fechaDesde,
      fechaHasta,
      pacienteId,
      pruebaId,
      sort = '-fechaRealizacion' 
    } = req.query;

    const query = {};

    // Filtro de búsqueda por folio
    if (search) {
      query.folio = { $regex: search, $options: 'i' };
    }

    // Filtro por estado
    if (estado !== 'all') {
      query.estado = estado;
    }

    // Filtro por fechas
    if (fechaDesde || fechaHasta) {
      query.fechaRealizacion = {};
      if (fechaDesde) query.fechaRealizacion.$gte = new Date(fechaDesde);
      if (fechaHasta) query.fechaRealizacion.$lte = new Date(fechaHasta);
    }

    // Filtro por paciente
    if (pacienteId) {
      query.paciente = pacienteId;
    }

    // Filtro por prueba
    if (pruebaId) {
      query.prueba = pruebaId;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort
    };

    const reportes = await Reporte.find(query)
      .populate('paciente', 'nombre telefono email')
      .populate('prueba', 'nombre codigo')
      .populate('realizadoPor', 'nombre cedula')
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const total = await Reporte.countDocuments(query);

    res.json({
      success: true,
      data: reportes,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un reporte por ID
// @route   GET /api/reportes/:id
// @access  Private
export const getReporte = async (req, res, next) => {
  try {
    const reporte = await Reporte.findById(req.params.id)
      .populate('paciente')
      .populate('prueba')
      .populate('realizadoPor', 'nombre cedula especialidad')
      .populate('autorizadoPor', 'nombre cedula');

    if (!reporte) {
      return res.status(404).json({
        success: false,
        message: 'Reporte no encontrado'
      });
    }

    res.json({
      success: true,
      data: reporte
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener reporte por folio
// @route   GET /api/reportes/folio/:folio
// @access  Private
export const getReporteByFolio = async (req, res, next) => {
  try {
    const reporte = await Reporte.findOne({ folio: req.params.folio.toUpperCase() })
      .populate('paciente')
      .populate('prueba')
      .populate('realizadoPor', 'nombre cedula especialidad')
      .populate('autorizadoPor', 'nombre cedula');

    if (!reporte) {
      return res.status(404).json({
        success: false,
        message: 'Reporte no encontrado'
      });
    }

    res.json({
      success: true,
      data: reporte
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nuevo reporte
// @route   POST /api/reportes
// @access  Private
export const createReporte = async (req, res, next) => {
  try {
    const { pacienteId, pruebaId, resultados, camposAdicionales, fechaRealizacion, observaciones, solicitadoPor } = req.body;

    // Validar que existan paciente y prueba
    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) {
      return res.status(404).json({
        success: false,
        message: 'Paciente no encontrado'
      });
    }

    const prueba = await Prueba.findById(pruebaId);
    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    // Generar folio único
    const folio = await Reporte.generarFolio();

    // Crear reporte con datos del paciente y prueba al momento de la creación
    const reporte = await Reporte.create({
      folio,
      paciente: pacienteId,
      datosPaciente: {
        nombre: paciente.nombre,
        edad: paciente.edad,
        genero: paciente.genero,
        telefono: paciente.telefono
      },
      prueba: pruebaId,
      datosPrueba: {
        nombre: prueba.nombre,
        codigo: prueba.codigo,
        metodo: prueba.metodo,
        tecnica: prueba.tecnica
      },
      fechaRealizacion: fechaRealizacion || new Date(),
      resultados: resultados || [],
      camposAdicionales: camposAdicionales || [],
      observaciones,
      solicitadoPor: solicitadoPor || 'A QUIEN CORRESPONDA',
      realizadoPor: req.user.id,
      estado: 'completado'
    });

    // Poblar el reporte antes de enviarlo
    await reporte.populate('paciente');
    await reporte.populate('prueba');
    await reporte.populate('realizadoPor', 'nombre cedula especialidad');

    res.status(201).json({
      success: true,
      message: 'Reporte creado exitosamente',
      data: reporte
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar reporte
// @route   PUT /api/reportes/:id
// @access  Private
export const updateReporte = async (req, res, next) => {
  try {
    const { resultados, camposAdicionales, observaciones, interpretacion, estado, fechaEntrega } = req.body;

    const reporte = await Reporte.findById(req.params.id);

    if (!reporte) {
      return res.status(404).json({
        success: false,
        message: 'Reporte no encontrado'
      });
    }

    // Actualizar campos permitidos
    if (resultados) reporte.resultados = resultados;
    if (camposAdicionales) reporte.camposAdicionales = camposAdicionales;
    if (observaciones !== undefined) reporte.observaciones = observaciones;
    if (interpretacion !== undefined) reporte.interpretacion = interpretacion;
    if (estado) reporte.estado = estado;
    if (fechaEntrega) reporte.fechaEntrega = fechaEntrega;

    await reporte.save();

    await reporte.populate('paciente');
    await reporte.populate('prueba');
    await reporte.populate('realizadoPor', 'nombre cedula especialidad');

    res.json({
      success: true,
      message: 'Reporte actualizado exitosamente',
      data: reporte
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Autorizar reporte
// @route   PUT /api/reportes/:id/autorizar
// @access  Private (Doctor o Admin)
export const autorizarReporte = async (req, res, next) => {
  try {
    const reporte = await Reporte.findById(req.params.id);

    if (!reporte) {
      return res.status(404).json({
        success: false,
        message: 'Reporte no encontrado'
      });
    }

    reporte.autorizadoPor = req.user.id;
    reporte.estado = 'entregado';
    reporte.fechaEntrega = new Date();

    await reporte.save();

    await reporte.populate('paciente');
    await reporte.populate('prueba');
    await reporte.populate('realizadoPor', 'nombre cedula especialidad');
    await reporte.populate('autorizadoPor', 'nombre cedula');

    res.json({
      success: true,
      message: 'Reporte autorizado exitosamente',
      data: reporte
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar reporte (cambiar estado a cancelado)
// @route   DELETE /api/reportes/:id
// @access  Private (Admin)
export const deleteReporte = async (req, res, next) => {
  try {
    const reporte = await Reporte.findByIdAndUpdate(
      req.params.id,
      { estado: 'cancelado' },
      { new: true }
    );

    if (!reporte) {
      return res.status(404).json({
        success: false,
        message: 'Reporte no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Reporte cancelado exitosamente',
      data: reporte
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener reportes de un paciente
// @route   GET /api/reportes/paciente/:pacienteId
// @access  Private
export const getReportesByPaciente = async (req, res, next) => {
  try {
    const { pacienteId } = req.params;
    const { limit = 20 } = req.query;

    const reportes = await Reporte.find({ 
      paciente: pacienteId,
      estado: { $ne: 'cancelado' }
    })
      .populate('prueba', 'nombre codigo')
      .populate('realizadoPor', 'nombre')
      .sort('-fechaRealizacion')
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: reportes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener estadísticas de reportes
// @route   GET /api/reportes/stats
// @access  Private
export const getEstadisticas = async (req, res, next) => {
  try {
    const { fechaDesde, fechaHasta } = req.query;

    const query = {};

    if (fechaDesde || fechaHasta) {
      query.fechaRealizacion = {};
      if (fechaDesde) query.fechaRealizacion.$gte = new Date(fechaDesde);
      if (fechaHasta) query.fechaRealizacion.$lte = new Date(fechaHasta);
    }

    const total = await Reporte.countDocuments(query);
    
    const porEstado = await Reporte.aggregate([
      { $match: query },
      { $group: { _id: '$estado', count: { $sum: 1 } } }
    ]);

    const porPrueba = await Reporte.aggregate([
      { $match: query },
      { $group: { _id: '$datosPrueba.nombre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        total,
        porEstado,
        pruebasMasRealizadas: porPrueba
      }
    });
  } catch (error) {
    next(error);
  }
};
