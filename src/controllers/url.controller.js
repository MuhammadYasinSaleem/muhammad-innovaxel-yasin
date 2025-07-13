import Url from '../models/url.model.js';
import { generateShortCode } from '../utils/shortener.js';

// POST /shorten
export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  try {
    const existing = await Url.findOne({ originalUrl });

    if (existing) {
      return res.status(200).json({
        message: 'Short URL already exists',
        id: existing._id,
        originalUrl: existing.originalUrl,
        shortCode: existing.shortCode,
        createdAt: existing.createdAt,
        updatedAt: existing.updatedAt,
      });
    }

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

export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /shorten/:shortCode
export const getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    urlDoc.accessCount += 1;
    await urlDoc.save();

    return res.status(200).json({
      id: urlDoc._id,
      originalUrl: urlDoc.originalUrl,
      shortCode: urlDoc.shortCode,
      accessCount: urlDoc.accessCount,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
    });
  } catch (error) {
    console.error('Error retrieving original URL:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// PUT /shorten/:shortCode
export const updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { originalUrl } = req.body;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    urlDoc.originalUrl = originalUrl;
    await urlDoc.save();

    return res.status(200).json({
      id: urlDoc._id,
      originalUrl: urlDoc.originalUrl,
      shortCode: urlDoc.shortCode,
      updatedAt: urlDoc.updatedAt,
    });
  } catch (error) {
    console.error('Error updating URL:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /shorten/:shortCode
export const deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.status(204).json({ message: 'URL deleted successfully'}); 
  } catch (error) {
    console.error('Error deleting short URL:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


// GET /shorten/:shortCode/stats
export const getUrlStats = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.status(200).json({
      id: urlDoc._id,
      originalUrl: urlDoc.originalUrl,
      shortCode: urlDoc.shortCode,
      accessCount: urlDoc.accessCount,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching URL stats:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

