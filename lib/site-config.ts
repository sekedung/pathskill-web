// GANTI semua value di sini dengan data bisnis PathSkill yang asli
export const SITE_CONFIG = {
  businessName: "PathSkill",
  whatsappNumber: "6281320743712", // format internasional TANPA tanda + atau 0 di depan
  email: "pathskillku@gmail.com",
  address: "Yogyakarta, Indonesia",
  instagram: "https://www.instagram.com/pathskill?igsh=MWpwdjB2NDBudzgyMw==",
};

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
}
