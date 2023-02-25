import getChat from "@/lib/getchat";

export default async function handler(req, res) {
  const category = req.query.category == "default" ? 27 : req.query.category;
  const language = req.query.language == "default" ? "en" : req.query.language;
  const chatLimit = req.query.limit || 20;
  const chats = await getChat(category, language, chatLimit);
  res.status(200).json(chats);
}
