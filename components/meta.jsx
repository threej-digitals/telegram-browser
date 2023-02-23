export default function Meta({
  title,
  description,
  img,
  index,
  keywords,
  url,
}) {
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="title" content={title} />
      <meta name="og:title" content={title} />
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta property="og:url" content={url}></meta>
      <meta property="og:image" content={img}></meta>
      <meta name="keywords" content={keywords} />
      {index ? <meta name="robots" content="index, follow" /> : ""}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </>
  );
}
