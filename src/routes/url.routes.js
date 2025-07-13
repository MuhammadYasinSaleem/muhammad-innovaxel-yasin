import express from "express";
import { createShortUrl,getOriginalUrl,updateShortUrl,deleteShortUrl,getUrlStats,getAllUrls } from "../controllers/url.controller.js";
import { validateOriginalUrl } from "../middleware/validateUrl.js";

const router=express.Router()

router.post('/',validateOriginalUrl,createShortUrl)
router.get('/', getAllUrls);
router.get('/:shortCode', getOriginalUrl);
router.put('/:shortCode',validateOriginalUrl, updateShortUrl);
router.delete('/:shortCode', deleteShortUrl);
router.get('/:shortCode/stats', getUrlStats);

export default router

