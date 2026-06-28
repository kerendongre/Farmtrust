import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private - Admin
router.get('/dashboard', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get dashboard endpoint - to be implemented',
    placeholder: true
  });
});

// @route   GET /api/admin/farmers
// @desc    Get all farmers (pending and approved)
// @access  Private - Admin
router.get('/farmers', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get farmers endpoint - to be implemented',
    placeholder: true
  });
});

// @route   POST /api/admin/farmers/:id/approve
// @desc    Approve farmer
// @access  Private - Admin
router.post('/farmers/:id/approve', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Approve farmer endpoint - to be implemented',
    placeholder: true
  });
});

// @route   POST /api/admin/farmers/:id/reject
// @desc    Reject farmer
// @access  Private - Admin
router.post('/farmers/:id/reject', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Reject farmer endpoint - to be implemented',
    placeholder: true
  });
});

// @route   POST /api/admin/products/:id/approve
// @desc    Approve product
// @access  Private - Admin
router.post('/products/:id/approve', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Approve product endpoint - to be implemented',
    placeholder: true
  });
});

export default router;
