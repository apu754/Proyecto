function getUserInfo(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    idNumber: user.idNumber,
    email: user.email,
    idTelefono: user.idTelefono,
    country: user.country,
    city: user.city,
  };
}

module.exports = getUserInfo;
