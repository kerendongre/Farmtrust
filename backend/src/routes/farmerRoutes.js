import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @route   GET /api/farmers
// @desc    Get all verified farmers
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get farmers endpoint - to be implemented',
    placeholder: true
  });
});

// @route   GET /api/farmers/:id
// @desc    Get farmer details
// @access  Public
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get farmer details endpoint - to be implemented',
    placeholder: true
  });
});

// @route   PUT /api/farmers/:id
// @desc    Update farmer profile
// @access  Private - Farmer
router.put('/:id', authenticate, authorize(['farmer']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update farmer endpoint - to be implemented',
    placeholder: true
  });
});

// @route   POST /api/farmers/:id/documents
// @desc    Upload farmer documents
// @access  Private - Farmer
router.post('/:id/documents', authenticate, authorize(['farmer']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Upload documents endpoint - to be implemented',
    placeholder: true
  });
});

export default router;
