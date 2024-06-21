export default async function authorize(req, res, next) {
  try {
    if (!req.user || req.user.email !== 'admin@user.com') {
      throw new Error('You do not have access to view this page!');
    }
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
}
