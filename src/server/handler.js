const storeData = require('../services/storeData');
const getUserByEmail = require('../services/getUserByEmail');
const hashPassword = require('../services/hashPassword');
const crypto = require('crypto');
 
async function registerHandler(request, h) {
  const { email, password } = request.payload;

  if (!email || !password) {
    const response = h.response({
      status: 'fail',
      message: 'Email and password are required fields'
    });
    response.code(400);
    return response;
  }
 
 const salt = crypto.randomBytes(16).toString('hex');
 const hash = hashPassword(password, salt);
 const id = crypto.randomUUID();
 const createdAt = new Date().toISOString();

 const data = {
   "id": id,
   "email": email,
   "password": `${salt}:${hash}`,
   "createdAt": createdAt
 };

  await storeData(id, data);
 
  const response = h.response({
    status: 'success',
    message: 'User created successfully',
    data
  })
  response.code(201);
  return response;
}



async function loginHandler(request, h) {
  const { email, password } = request.payload;

  if (!email || !password) {
    const response = h.response({
      status: 'fail',
      message: 'Email and password are required fields'
    });
    response.code(400);
    return response;
  }

  // Get user data by email
  const user = await getUserByEmail(email);

  if (!user) {
    const response = h.response({
      status: 'fail',
      message: 'Invalid email or password'
    });
    response.code(401);
    return response;
  }

  // Extract the stored salt and hash
  const [storedSalt, storedHash] = user.password.split(':');

  // Hash the provided password with the stored salt
  const hash = hashPassword(password, storedSalt);

  // Compare the hashes
  if (hash !== storedHash) {
    const response = h.response({
      status: 'fail',
      message: 'Invalid email or password'
    });
    response.code(401);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Login successful',
    data: {
      id: user.id,
      email: user.email
    }
  });
  response.code(200);
  return response;
}

 
module.exports = {registerHandler, loginHandler};