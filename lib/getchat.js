import { scrapChat } from "@/lib/scrapper";
import { threej } from "@/lib/threej";

export default async function getChat(category, language, limit = 20) {
  const chats = await threej.query(
    "SELECT CID, USERNAME, POSTCOUNT, CUPDATE, TITLE, DESCRIPTION, PHOTO, SUBSCOUNT, PICSCOUNT, VIDEOSCOUNT, LINKSCOUNT, FILECOUNT FROM ?? WHERE CATEGORY LIKE ? AND CLANGUAGE LIKE ? AND USERNAME IS NOT NULL AND CTYPE = 'channel' ORDER BY SUBSCOUNT DESC LIMIT ?",
    [process.env.CHATSTABLE, category, language || "en", limit]
  );
  let result = [];
  chats.map(async (e) => {
    //update chat details if 4hr passed from last update
    if (e.CUPDATE < Math.round(Date.now() / 1000 - 14400)) {
      updateChat(e.CID, e.USERNAME);
    }

    if (e.POSTCOUNT != 0) {
      result.push({
        username: e.USERNAME,
        lastPostId: e.POSTCOUNT,
        title: e.TITLE,
        description: e.DESCRIPTION,
        subscribers: e.SUBSCOUNT,
        images: e.PICSCOUNT,
        videos: e.VIDEOSCOUNT,
        links: e.LINKSCOUNT,
        files: e.FILECOUNT,
        photo: e.PHOTO,
      });
    }
  });
  return result;
}

//update db with new chat details
async function updateChat(chatId, username) {
  const chatdetails = await scrapChat(username);

  if (chatdetails.POSTCOUNT == 0) {
    threej.query("DELETE FROM ?? WHERE CID = ?", [
      process.env.CHATSTABLE,
      chatId,
    ]);
  }

  const sql = `UPDATE ?? SET 
        TITLE = COALESCE(?, TITLE), 
        DESCRIPTION = COALESCE(?, DESCRIPTION), 
        SUBSCOUNT = COALESCE(?, SUBSCOUNT), 
        CUPDATE = COALESCE(?, CUPDATE), 
        VIEWS = COALESCE(?, VIEWS), 
        PICSCOUNT = COALESCE(?, PICSCOUNT), 
        VIDEOSCOUNT = COALESCE(?, VIDEOSCOUNT), 
        LINKSCOUNT = COALESCE(?, LINKSCOUNT), 
        POSTCOUNT = COALESCE(?, POSTCOUNT), 
        FILECOUNT = COALESCE(?, FILECOUNT)
        WHERE CID = ?`;
  const values = [
    process.env.CHATSTABLE,
    chatdetails.TITLE || null,
    chatdetails.DESCRIPTION || null,
    chatdetails.SUBSCOUNT || null,
    Math.round(Date.now() / 1000),
    chatdetails.VIEWS || null,
    chatdetails.PICSCOUNT || null,
    chatdetails.VIDEOSCOUNT || null,
    chatdetails.LINKSCOUNT || null,
    chatdetails.POSTCOUNT || null,
    chatdetails.FILECOUNT || null,
    chatId,
  ];
  try {
    await threej.query(sql, values);
    return chatdetails.POSTCOUNT;
  } catch (error) {
    threej.logError(error);
    return false;
  }
}
