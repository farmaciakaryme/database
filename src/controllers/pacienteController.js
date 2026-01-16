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
      activo = 'all', // ✅ Cambiado a 'all' por defecto
      sort = '-createdAt' 
    } = req.query;

    const query = {};

    // Filtro de búsqueda - solo buscar en campos que TODOS tienen
    if (search && search.trim() !== '') {
      const searchFields = [
        { nombre: { $regex: search, $options: 'i' } }
      ];
      
      // Solo agregar búsqueda en teléfono/email si el campo existe
      if (search.includes('@')) {
        searchFields.push({ email: { $regex: search, $options: 'i' } });
      }
      if (/^\d+$/.test(search)) {
        searchFields.push({ telefono: { $regex: search, $options: 'i' } });
      }
      
      query.$or = searchFields;
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

    // ✅ Si el límite es muy alto, no paginar
    const shouldPaginate = options.limit < 999;
    
    let pacientes;
    if (shouldPaginate) {
      pacientes = await Paciente.find(query)
        .sort(options.sort)
        .limit(options.limit)
        .skip((options.page - 1) * options.limit);
    } else {
      // Traer TODOS sin límite
      pacientes = await Paciente.find(query)
        .sort(options.sort);
    }

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
    console.error('Error en getPacientes:', error);
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

    // ✅ Búsqueda flexible - solo en nombre si no hay teléfono
    const searchQuery = {
      nombre: { $regex: query, $options: 'i' }
    };

    const pacientes = await Paciente.find(searchQuery)
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