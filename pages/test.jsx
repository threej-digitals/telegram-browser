import Script from "next/script";

export default function test() {
  return (
    <>
      <Script>
        {`function onTelegramAuth(user) {
          document.cookie = "telegramUser="+user.id;
        }`}
      </Script>
      <Script
        async
        src="https://telegram.org/js/telegram-widget.js?21"
        data-telegram-login="threejsbot"
        data-size="large"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
      />
    </>
  );
}
