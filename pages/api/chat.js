import getChat from "@/lib/getchat";

export default async function handler(req, res) {
  const chats = await getChat(
    req.query.category || 28,
    req.query.language || "en",
    20
  );
  res.status(200).json(chats);
}
