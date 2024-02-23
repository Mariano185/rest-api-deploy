const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Movie title is requried',
  }),
  year: z.number().int().min(1888).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Comedy',
      'Drama',
      'Horror',
      'Romance',
      'Adventure',
      'Fantasy',
    ]),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Genre must be an array of enum strings',
    }
  ),
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie,
}
