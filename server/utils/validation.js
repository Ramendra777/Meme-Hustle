const validateMeme = (memeData) => {
  const errors = []
  
  if (!memeData.title || memeData.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters')
  }
  
  if (memeData.image_url && !memeData.image_url.match(/^https?:\/\/.+\..+$/)) {
    errors.push('Invalid image URL format')
  }
  
  if (!memeData.tags || memeData.tags.length === 0) {
    errors.push('At least one tag is required')
  }
  
  return errors
}

const sanitizeInput = (input) => {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

module.exports = { validateMeme, sanitizeInput }