import { AuthorizationError } from '@acanakdas/authcommon/build/Errors/AuthorizationError';
import { NotFoundError } from '@acanakdas/authcommon/build/Errors/NotFoundError';
import { RequestValidatorMiddleware } from '@acanakdas/authcommon/build/middlewares/RequestValidatorMiddleware';
import { RequireAuthMiddleware } from '@acanakdas/authcommon/build/middlewares/RequireAuthMiddleware';
import { Request, Response } from 'express';
import express from 'express';
import { CreateTicketValidationMiddleware } from '../../validations/CreateTicketValidationMiddleware';
import { Ticket } from '../models/Ticket';
import { UpdateTicketValidationMiddleware } from '../../validations/UpdateTicketValidationMiddleware';
const router = express.Router();


//get ticket by id

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket)
        throw new NotFoundError('Ticket Not Found');
    return res.status(200).send(ticket);
})
//get all tickets
router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({})
    return res.status(200).send(tickets);
})
//create-ticket route
router.post('/api/tickets', RequireAuthMiddleware, CreateTicketValidationMiddleware(), RequestValidatorMiddleware, async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = new Ticket({
        title,
        price,
        userId: req.currentUser!.id
    })
    await ticket.save();
    return res.status(201).send(ticket);
})
//update-ticket route
router.put('/api/tickets', RequireAuthMiddleware, UpdateTicketValidationMiddleware(), RequestValidatorMiddleware, async (req: Request, res: Response) => {
    const { id, title, price } = req.body;
    const ticket = await Ticket.findById(id);
    if (!ticket)
        throw new NotFoundError('Ticket Not Found');
    if (ticket.userId !== req.currentUser?.id)
        throw new AuthorizationError();
    ticket.set({ title, price })
    await ticket.save();
    return res.status(200).send(ticket)
})
export { router }