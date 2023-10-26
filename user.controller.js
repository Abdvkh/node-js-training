const {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getUsersList,
  addHobby,
  deleteHobby,
  getUserHobbies,
} = require('./user.model');

function handleUsersRequest(req, res, url) {
  const userId = parseInt(url.pathname.split('/')[2]);

  if (req.method === 'GET') {
    if (isNaN(userId)) {
      getUsersList(req, res);
    } else {
      getUserById(req, res, userId);
    }
  } else if (req.method === 'POST') {
    createUser(req, res);
  } else if (req.method === 'DELETE') {
    deleteUser(req, res, userId);
  } else if (req.method === 'PATCH') {
    updateUser(req, res, userId);
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  }
}

module.exports = { handleUsersRequest };
