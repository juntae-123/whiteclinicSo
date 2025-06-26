// 예시: /api/find-id?email=suim1234@gmail.com
app.get("/api/find-id", async (req, res) => {
  const { email } = req.query;
  const user = await db.User.findOne({ where: { email } });
  if (user) {
    res.json({ found: true, email: user.email });
  } else {
    res.json({ found: false });
  }
});
