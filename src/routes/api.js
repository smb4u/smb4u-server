// Place holder for now
import {Router} from 'express';
import apiController from '../controllers/apiController.js';

const router = Router();

router.route('/saveItem').post(apiController.addItem);
router.route('/getInventory').get(apiController.getInventory);
router.route('/sellItem').post(apiController.sellItem);
//router.route('/addItem').post(apiController.addingItem);

export default router;

