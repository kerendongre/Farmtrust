import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all approved products
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get products endpoint - to be implemented',
    placeholder: true
  });
});

// @route   GET /api/products/:id
// @desc    Get product details
// @access  Public
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get product details endpoint - to be implemented',
    placeholder: true
  });
});

// @route   POST /api/products
// @desc    Create new product (farmer)
// @access  Private - Farmer
router.post('/', authenticate, authorize(['farmer']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Create product endpoint - to be implemented',
    placeholder: true
  });
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private - Farmer
router.put('/:id', authenticate, authorize(['farmer']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update product endpoint - to be implemented',
    placeholder: true
  });
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private - Farmer
router.delete('/:id', authenticate, authorize(['farmer']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Delete product endpoint - to be implemented',
    placeholder: true
  });
});

export default router;
