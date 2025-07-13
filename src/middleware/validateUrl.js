export const validateOriginalUrl = (req, res, next) => {
  const { originalUrl } = req.body;

  if (!originalUrl || !/^https?:\/\/.+/.test(originalUrl)) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing originalUrl' });
  }

  next(); 
};
