export default function Header(req) {
  return (
    <>
      <title>Telegram browser</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Browse public telegram channels as feed"
      />
      <link rel="icon" href="favicon.png" />
      <script src="/telegram-browser/script/matomoTracker.js"></script>
    </>
  );
}
