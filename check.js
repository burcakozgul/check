const axios = require('axios');

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const cookie = process.env.COOKIE;
const token = process.env.TOKEN;

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
                    'Cookie': cookie,
                    'Host': 'appointment.as-visa.com',
                    'Origin': 'https://appointment.as-visa.com',
                    'Referer': 'https://appointment.as-visa.com/tr/istanbul-bireysel-basvuru',
                    'RequestVerificationToken': token,
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
