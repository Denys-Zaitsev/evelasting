export const siteConfig = {
  name: "Evelasting",
  title: "Evelasting — Independent Ukrainian Producer",
  description:
    "Official website of Evelasting, an independent Ukrainian phonk producer. Listen to official releases and discover the story behind the sound.",
  url: "https://evelasting.com",
  locale: "en_US",
  artist: {
    origin: "Kryvyi Rih, Ukraine",
    genres: ["Phonk", "Chill Phonk", "Drift Phonk", "Ambient Phonk"],
  },
  links: {
    youtube: "https://www.youtube.com/@evelasting",
    telegram: "https://t.me/fYq2zyjtqzdlNjgy",
    spotify:
      "https://open.spotify.com/artist/3nTuhNtsxzV6yakWQ5rwvX?si=CyBCSBSZQ_aVh-XzlGWO9A&nd=1&dlsi=0fa4c322491c44dc",
    soundcloud: "https://soundcloud.com/evelasting1",
    appleMusic: "https://music.apple.com/ua/artist/evelasting/1634217010",
    tiktok: "https://www.tiktok.com/@evelasting1",
    instagram: "https://www.instagram.com/denis_zaitse.v/",
    email: "mailto:deniszaitsev536@gmail.com",
  },
} as const;

export const socialProfiles = Object.values(siteConfig.links).filter(
  (url) => !url.startsWith("mailto:"),
);
