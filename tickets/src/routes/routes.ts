import { RequestValidatorMiddleware } from '@acanakdas/authcommon/build/middlewares/RequestValidatorMiddleware';
import { RequireAuthMiddleware } from '@acanakdas/authcommon/build/middlewares/RequireAuthMiddleware';
import { AuthenticationMiddleware } from '@acanakdas/authcommon/build/middlewares/AuthenticationMiddleware';
import { Request, Response } from 'express';
import express from 'express';
import { CreateTicketValidationMiddleware } from '../../validations/CreateTicketValidationMiddleware';
const router = express.Router();


//current-user route
router.post('/api/tickets',RequireAuthMiddleware,CreateTicketValidationMiddleware(),RequestValidatorMiddleware, async (req: Request, res: Response) => {
    return res.sendStatus(200);
})
export { router }