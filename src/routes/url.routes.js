import express from "express";
import { createShortUrl,getOriginalUrl,updateShortUrl } from "../controllers/url.controller.js";

const router=express.Router()

router.post('/',createShortUrl)
router.get('/:shortCode', getOriginalUrl);
router.put('/:shortCode', updateShortUrl);
export default router

