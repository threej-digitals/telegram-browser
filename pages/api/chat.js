import getChat from "@/lib/getchat";

export default async function handler(req, res) {
  const chats = await getChat(8, "en");
  res.status(200).json(chats);
}
