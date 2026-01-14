import Paciente from '../models/Paciente.js';

// @desc    Obtener todos los pacientes
// @route   GET /api/pacientes
// @access  Private
export const getPacientes = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      activo = 'true',
      sort = '-createdAt' 
    } = req.query;

    const query = {};

    // Filtro de búsqueda
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { telefono: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filtro de activo/inactivo
    if (activo !== 'all') {
      query.activo = activo === 'true';
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort
    };

    const pacientes = await Paciente.find(query)
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const total = await Paciente.countDocuments(query);

    res.json({
      success: true,
      data: pacientes,
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

// @desc    Obtener un paciente por ID
// @route   GET /api/pacientes/:id
// @access  Private
export const getPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
      return res.status(404).json({
        success: false,
        message: 'Paciente no encontrado'
      });
    }

    res.json({
      success: true,
      data: paciente
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nuevo paciente
// @route   POST /api/pacientes
// @access  Private
export const createPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Paciente creado exitosamente',
      data: paciente
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar paciente
// @route   PUT /api/pacientes/:id
// @access  Private
export const updatePaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!paciente) {
      return res.status(404).json({
        success: false,
        message: 'Paciente no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Paciente actualizado exitosamente',
      data: paciente
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar paciente (soft delete)
// @route   DELETE /api/pacientes/:id
// @access  Private
export const deletePaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!paciente) {
      return res.status(404).json({
        success: false,
        message: 'Paciente no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Paciente desactivado exitosamente',
      data: paciente
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Buscar pacientes
// @route   GET /api/pacientes/search/:query
// @access  Private
export const searchPacientes = async (req, res, next) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const pacientes = await Paciente.find({
      $or: [
        { nombre: { $regex: query, $options: 'i' } },
        { telefono: { $regex: query, $options: 'i' } }
      ],
      activo: true
    })
      .limit(parseInt(limit))
      .select('nombre telefono email edad');

    res.json({
      success: true,
      data: pacientes
    });
  } catch (error) {
    next(error);
  }
};
