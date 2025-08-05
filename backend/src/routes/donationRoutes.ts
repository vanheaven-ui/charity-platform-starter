import { Router } from 'express';
import * as donationController from '../controllers/donationController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Routes for creating and fetching donations
router.post('/', protect, donationController.createDonation);
router.get('/', protect, donationController.getDonations);

export default router;