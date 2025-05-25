const axios = require('axios');

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

async function checkAppointments() {
    try {
        const response = await axios.post(
            'https://appointment.as-visa.com/Macaristan/TarihGetir',
            new URLSearchParams({
                tabId: 'Macaristan Bireysel Randevu (C)',
                countryId: 'TÜRKİYE'
            }),
            {
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': '_gid=GA1.2.1771543877.1748185160; .AspNetCore.Antiforgery.mEZFPqlrlZ8=CfDJ8NyLMf4m3dBNhfCBjRfvs-CKGrfwIrQBDvW9VzBD94DE4FAhtakJHQtyWZ60ssLOC7_zKOzznApV06AO4JFHFFuQA0_S93ACwCl27Zl5nAoG_Ws7fALf-zdUQRWrtbcHY7GeO-ADfK9jaDOHDJP-LP8; _ga=GA1.1.276630310.1748185160; _ga_KQC6SY9TRV=GS2.1.s1748185159$o1$g1$t1748185959$j0$l0$h0',
                    'Host': 'appointment.as-visa.com',
                    'Origin': 'https://appointment.as-visa.com',
                    'Referer': 'https://appointment.as-visa.com/tr/istanbul-bireysel-basvuru',
                    'RequestVerificationToken': 'CfDJ8NyLMf4m3dBNhfCBjRfvs-A9JJKqNnybr73mHJWKGHZtS3Ln4_8BeOHJqYo_FP_det5luS6mDOehKWWeH-AkUwJE0pmPJIvsjCpQlvW6IFo1eJjNtag9RXscz4aOzrjW8Tvu_FwKDrKv9MHzQ4bY75Q',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest',
                    'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"'
                }
            }
        );

        if (response.data && Object.keys(response.data).length > 0) {
            const message = `🎉 Randevu bulundu! ${JSON.stringify(response.data)}`;
            await axios.get(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                params: {
                    chat_id: chatId,
                    text: message
                }
            });
            console.log('Telegram mesajı gönderildi.');
        } else {
            console.log('Şu anda randevu yok.');
        }

    } catch (error) {
        console.error('Hata:', error.message);
    }
}

checkAppointments();
