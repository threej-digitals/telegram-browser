import { threej } from "@/lib/threej";

export default async function feed(req, res) {
  if (req.method === "POST") {
    if (!req.body.telegramUser) {
      return res
        .status(403)
        .json({ result: false, message: "Please login to create a new feed." });
    }
    if (!req.body.name || typeof req.body.chats != "object") {
      return res
        .status(200)
        .json({ result: false, message: "Invalid data received!" });
    }

    // Get user id form db if user already exists
    var tgUser = await threej.query("SELECT TUID FROM ?? WHERE TGID = ?", [
      process.env.USERSTABLE,
      req.body.telegramUser,
    ]);

    //add new user to db
    if (tgUser.length === 0) {
      const result = await threej.query("INSERT INTO ?? (TGID) VALUES(?)", [
        process.env.USERSTABLE,
        req.body.telegramUser,
      ]);
      if (result.affectedRows === 1) {
        tgUser.push({ TUID: result.insertId });
      }
    }

    //add feed to db
    const result = await threej.query(
      "INSERT INTO ?? (NAME, DESCRIPTION, CHATS, CREATOR) VALUES(?)",
      [
        process.env.FEEDSTABLE,
        [
          req.body.name,
          req.body.description || "",
          JSON.stringify(req.body.chats),
          tgUser[0].TUID,
        ],
      ]
    );

    if (result.affectedRows === 1) {
      return res.status(200).json({
        result: true,
        message: "Feed created",
        feed: { id: result.insertId },
      });
    } else {
      return res
        .status(200)
        .json({ result: false, message: "Internal error occurred!" });
    }
  } else {
    res.status(403).json({ result: false });
  }
}
