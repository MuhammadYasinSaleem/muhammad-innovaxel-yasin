import express from "express";
import { createShortUrl,getOriginalUrl } from "../controllers/url.controller.js";

const router=express.Router()

router.post('/',createShortUrl)
// GET /shorten/:shortCode
router.get('/:shortCode', getOriginalUrl);
export default router

