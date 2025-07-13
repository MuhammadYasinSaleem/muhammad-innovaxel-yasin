import Url from '../models/url.js';
import { generateShortCode } from '../utils/shortener.js';

// POST /shorten
export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  
  if (!originalUrl || !/^https?:\/\/.+/.test(originalUrl)) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  try {
    const shortCode = generateShortCode();

    const newUrl = new Url({
      originalUrl,
      shortCode,
    });

    await newUrl.save();

    return res.status(201).json({
      id: newUrl._id,
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
