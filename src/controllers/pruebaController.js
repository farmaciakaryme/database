import Prueba from '../models/Prueba.js';

// @desc    Obtener todas las pruebas
// @route   GET /api/pruebas
// @access  Private
export const getPruebas = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      categoria = 'all',
      activo = 'true',
      sort = 'nombre' 
    } = req.query;

    const query = {};

    // Filtro de búsqueda
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { codigo: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } }
      ];
    }

    // Filtro por categoría
    if (categoria !== 'all') {
      query.categoria = categoria;
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

    const pruebas = await Prueba.find(query)
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const total = await Prueba.countDocuments(query);

    res.json({
      success: true,
      data: pruebas,
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

// @desc    Obtener una prueba por ID
// @route   GET /api/pruebas/:id
// @access  Private
export const getPrueba = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    res.json({
      success: true,
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener estructura de formulario de una prueba
// @route   GET /api/pruebas/:id/form-structure
// @access  Private
export const getFormStructure = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    res.json({
      success: true,
      data: prueba.getFormStructure()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nueva prueba
// @route   POST /api/pruebas
// @access  Private (Admin o Doctor)
export const createPrueba = async (req, res, next) => {
  try {
    const prueba = await Prueba.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Prueba creada exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar prueba
// @route   PUT /api/pruebas/:id
// @access  Private (Admin o Doctor)
export const updatePrueba = async (req, res, next) => {
  try {
    const prueba = await Prueba.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Prueba actualizada exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar prueba (soft delete)
// @route   DELETE /api/pruebas/:id
// @access  Private (Admin)
export const deletePrueba = async (req, res, next) => {
  try {
    const prueba = await Prueba.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Prueba desactivada exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Agregar sub-prueba a una prueba
// @route   POST /api/pruebas/:id/subpruebas
// @access  Private (Admin o Doctor)
export const addSubPrueba = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    prueba.subPruebas.push(req.body);
    await prueba.save();

    res.status(201).json({
      success: true,
      message: 'Sub-prueba agregada exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar sub-prueba
// @route   PUT /api/pruebas/:id/subpruebas/:subPruebaId
// @access  Private (Admin o Doctor)
export const updateSubPrueba = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    const subPrueba = prueba.subPruebas.id(req.params.subPruebaId);

    if (!subPrueba) {
      return res.status(404).json({
        success: false,
        message: 'Sub-prueba no encontrada'
      });
    }

    Object.assign(subPrueba, req.body);
    await prueba.save();

    res.json({
      success: true,
      message: 'Sub-prueba actualizada exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar sub-prueba
// @route   DELETE /api/pruebas/:id/subpruebas/:subPruebaId
// @access  Private (Admin)
export const deleteSubPrueba = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    prueba.subPruebas.pull(req.params.subPruebaId);
    await prueba.save();

    res.json({
      success: true,
      message: 'Sub-prueba eliminada exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Agregar campo adicional a una prueba
// @route   POST /api/pruebas/:id/campos-adicionales
// @access  Private (Admin o Doctor)
export const addCampoAdicional = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    prueba.camposAdicionales.push(req.body);
    await prueba.save();

    res.status(201).json({
      success: true,
      message: 'Campo adicional agregado exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar campo adicional
// @route   PUT /api/pruebas/:id/campos-adicionales/:campoId
// @access  Private (Admin o Doctor)
export const updateCampoAdicional = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    const campo = prueba.camposAdicionales.id(req.params.campoId);

    if (!campo) {
      return res.status(404).json({
        success: false,
        message: 'Campo adicional no encontrado'
      });
    }

    Object.assign(campo, req.body);
    await prueba.save();

    res.json({
      success: true,
      message: 'Campo adicional actualizado exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar campo adicional
// @route   DELETE /api/pruebas/:id/campos-adicionales/:campoId
// @access  Private (Admin)
export const deleteCampoAdicional = async (req, res, next) => {
  try {
    const prueba = await Prueba.findById(req.params.id);

    if (!prueba) {
      return res.status(404).json({
        success: false,
        message: 'Prueba no encontrada'
      });
    }

    prueba.camposAdicionales.pull(req.params.campoId);
    await prueba.save();

    res.json({
      success: true,
      message: 'Campo adicional eliminado exitosamente',
      data: prueba
    });
  } catch (error) {
    next(error);
  }
};
