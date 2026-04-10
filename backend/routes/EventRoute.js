import express from "express";
import { getEvents, addEvent, updateEvent, deleteEvent, getEventById } from "../controllers/EventController.js";

const router = express.Router();

router.get('/events', getEvents);
router.post('/events', addEvent);
router.patch('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.get('/events/:id', getEventById);

export default router;