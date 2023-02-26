import { threej } from "@/lib/threej";

export default async function feed(req, res) {
  if (req.method === "GET" && req.query.id) {
    const result = await threej.query("SELECT CHATS FROM ?? WHERE FEEDID = ?", [
      process.env.FEEDSTABLE,
      req.query.id,
    ]);
    if (result) {
      return res.status(200).json({
        ok: true,
        feeds: result,
      });
    } else {
      return res.status(200).json({
        ok: false,
        message: "Feed not found",
      });
    }
  }

  if (!(req.body.telegramUser || req.query.telegramUser)) {
    return res
      .status(403)
      .json({ ok: false, message: "Please login to continue." });
  }
  const telegramUserId = req.body.telegramUser || req.query.telegramUser;
  // Get user id form db if user already exists
  var tgUser = await threej.query("SELECT TUID FROM ?? WHERE TGID = ?", [
    process.env.USERSTABLE,
    telegramUserId,
  ]);

  //add new user to db
  if (tgUser.length === 0) {
    const result = await threej.query("INSERT INTO ?? (TGID) VALUES(?)", [
      process.env.USERSTABLE,
      telegramUserId,
    ]);
    if (result.affectedRows === 1) {
      tgUser.push({ TUID: result.insertId });
    }
  }

  //Handle request
  if (req.method === "POST") {
    if (!req.body.name || typeof req.body.chats != "object") {
      return res
        .status(200)
        .json({ ok: false, message: "Invalid data received!" });
    }

    // limit feed creation to 20
    var result = await threej.query(
      "SELECT COUNT(NAME) AS TOTAL FROM ?? WHERE CREATOR = ?",
      [process.env.FEEDSTABLE, tgUser[0].TUID]
    );
    if (result[0].total > 19) {
      return res.status(200).json({
        ok: false,
        message: "Please delete older feeds to create a new one.",
      });
    }

    //add feed to db
    result = await threej.query(
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
        ok: true,
        message: "Feed created",
        feed: { id: result.insertId },
      });
    } else {
      return res
        .status(200)
        .json({ ok: false, message: "Internal error occurred!" });
    }
  } else if (req.method === "GET") {
    const result = await threej.query("SELECT * FROM ?? WHERE CREATOR = ?", [
      process.env.FEEDSTABLE,
      tgUser[0].TUID,
    ]);
    if (result) {
      return res.status(200).json({
        ok: true,
        feeds: result,
      });
    } else {
      return res.status(200).json({
        ok: false,
        message: "Internal error occurred",
      });
    }
  } else {
    return res.status(403).json({ ok: false });
  }
}
