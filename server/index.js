const axios = require("axios");

// Takip edilecek adres listesi
const ADDRESSES = [
  "0x813399e5b08Bb50b038AA7dF6347b6AF2D161338",
  "0x2B9f07d447e40dD0a061Aa2DfaA9e7F79046623E"
];

// Swap fonksiyonlarının imzaları
const SWAP_SIGNATURES = [
  "0x38ed1739", // swapExactTokensForTokens
  "0x18cbafe5", // swapExactETHForTokens
  "0x7ff36ab5", // swapExactETHForTokensSupportingFeeOnTransferTokens
  "0x5c11d795"  // swapTokensForExactTokens
];


const BASE_URL = "https://merits-staging.blockscout.com/api";


async function checkSwapsForAddress(address) {
  try {
    const url = `${BASE_URL}?module=account&action=txlist&address=${address}&sort=desc`;
    const res = await axios.get(url);
    const txs = res.data.result;

    const swaps = txs.filter(tx => SWAP_SIGNATURES.includes(tx.input.slice(0, 10)));

    return swaps.length;
  } catch (err) {
    console.error(`❌ ${address} için işlem alınamadı:`, err.message);
    return 0;
  }
}


async function checkAll() {
  console.log("🔁 Swap kontrolü başlatılıyor...");

  for (const addr of ADDRESSES) {
    const swapCount = await checkSwapsForAddress(addr);
    if (swapCount > 0) {
      console.log(`✅ ${addr} → ${swapCount} swap yaptı.`);
      // Buraya ödül verme fonksiyonu yazılabilir
    } else {
      console.log(`⚠️ ${addr} → Swap bulunamadı.`);
    }
  }

  console.log("⏸️ Kontrol tamam.");
}

setInterval(checkAll, 5 * 60 * 1000);
checkAll(); 