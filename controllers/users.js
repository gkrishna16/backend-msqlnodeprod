async function getUsers(req, res) {
  try {
    res.status(200).json({ msg: `This is the users page.` });
  } catch (error) {
    res.status(500).json({ error: `There was some error ${error}` });
  }
}

module.exports = { getUsers };
