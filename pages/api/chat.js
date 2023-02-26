import { getChat, getChatDetails } from "@/lib/getchat";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var chats = await getChatDetails(JSON.parse(req.body));
  } else {
    const category = req.query.category == "default" ? 27 : req.query.category;
    const language =
      req.query.language == "default" ? "en" : req.query.language;
    const chatLimit = req.query.limit || 20;
    var chats = await getChat(category, language, chatLimit);
  }
  res.status(200).json(chats);
}
