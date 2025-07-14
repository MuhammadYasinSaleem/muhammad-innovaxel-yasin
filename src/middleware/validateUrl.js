export const validateOriginalUrl = (req, res, next) => {
  const { originalUrl } = req.body;

  if (!originalUrl || !/^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(\.[a-z]{2,})(\/\S*)?$/.test(originalUrl)) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing originalUrl' });
  }

  next(); 
};
