const fs = require('fs');
const axios = require("axios");

const writeFile = (filePath, fileContent) => {
    return new Promise((resolve, reject) => {
     fs.writeFile(filePath, fileContent, writeFileError => {
      if (writeFileError) {
       reject(writeFileError);
       return;
      }
   
      resolve(filePath);
     });
    });
}
var makeid = function(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports.getSearchAds = async function(req, res, next) {
    try{
        var {country, q, count} = req.body;
        const apiUrl = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=${country}&q=${encodeURIComponent(q)}&search_type=keyword_unordered&media_type=all`;
        const htmlResponse = await axios.get(apiUrl, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'vi',
                'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
            }
        });
        await writeFile('./index.html', htmlResponse.data)
        const datr = /"_js_datr","(.*?)"/g.exec(htmlResponse.data)[1];
        const lsd = /"LSD",\[\],{"token":"(.*?)"/g.exec(htmlResponse.data)[1];
        const sessionId = /"sessionId":"(.*?)"/g.exec(htmlResponse.data)[1];
        const __hs = /"haste_session":"(.*?)"/g.exec(htmlResponse.data)[1];
        const __rev = /"revision":"(.*?)"/g.exec(htmlResponse.data)[1];
        const __hsi = /"hsi":"(.*?)"/g.exec(htmlResponse.data)[1];
        const __ccg = /"connectionClass":"(.*?)"/g.exec(htmlResponse.data)[1];
        const __spin_r = /"__spin_r":(.*?),/g.exec(htmlResponse.data)[1];
        const __spin_t = /"__spin_t":(.*?),/g.exec(htmlResponse.data)[1];
        // const fb_dtsg = /"DTSGInitialData",\[\],{"token":"(.*?)"/g.exec(htmlResponse.data)[1];
        // const user_id = /"CurrentUserInitialData",\[\],{"ACCOUNT_ID":"(.*?)"/g.exec(htmlResponse.data)[1];

        const data = {
            sessionId: sessionId,
            __hs: __hs,
            __rev: __rev,
            __hsi: __hsi,
            lsd: lsd,
            __ccg: __ccg,
            __spin_r: __spin_r,
            __spin_t: __spin_t,
            datr: datr
            // fb_dtsg: fb_dtsg,
            // user_id: user_id
        }
        return res.status(200).json({
            success: true,
            data: data
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error: 'Error Server'
        });
    }
}

module.exports.searchAds = async function(req, res, next) {
    try {
        var {country, q, count, dataHtml, inputforwardCursor, inputcollationToken} = req.body;
        var {sessionId, __hs, __rev, __hsi, lsd, __ccg, __spin_r, __spin_t, datr, fb_dtsg, user_id} = dataHtml;

        var apiUrl = `https://www.facebook.com/ads/library/async/search_ads/?q=${encodeURIComponent(q)}&session_id=${sessionId}&count=${count}&active_status=all&ad_type=all&countries[0]=${country}&media_type=all&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=keyword_unordered`;
        if(inputforwardCursor != '' && inputcollationToken != ''){
            apiUrl = `https://www.facebook.com/ads/library/async/search_ads/?q=${encodeURIComponent(q)}&forward_cursor=${inputforwardCursor}&backward_cursor=&session_id=${sessionId}&collation_token=${inputcollationToken}&count=${count}&active_status=all&ad_type=all&countries[0]=${country}&media_type=all&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=keyword_unordered`;
        }
        const data = {
            __user: '0',
            __a: '1',
            __req: '1',
            __hs: __hs,
            dpr: '1',
            __ccg: __ccg,
            __rev: __rev,
            __s: makeid(6) + ':' + makeid(6) + ':' + makeid(6),
            __hsi: __hsi,
            __dyn: '7xeUmxa3-Q8zo5ObwKBWobVo9E4a2i5U4e1FxebzEdF8ixy7EiwvoWdwJwCwfW7oqx60Vo1upEK12wvk1bwbG78b87C2m3K2y11xmfz81s8hwGwQwoE2LwBgao884y0Mo6i588Egze2a5E5afK1LwPxe3C0D8sDwJwKwHxaaws8nwhE2Lxiaw4JwJwSyES0gq0K-1LwqobU5G361pwr86C',
            __csr: '',
            // fb_dtsg: fb_dtsg,
            jazoest: '2898',
            lsd: lsd,
            __spin_r: __spin_r,
            __spin_b: 'trunk',
            __spin_t: __spin_t,
            __jssesw: '1'
        };
        const config = {
            headers: {
              'accept': '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              'accept-language': 'vi',
              'Content-Length': '472',
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': `datr=${datr}; wd=1169x963`,
              'origin': 'https://www.facebook.com',
              'referer': `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=${country}&q=${encodeURIComponent(q)}&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=keyword_unordered&media_type=all`,
              'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
              'Sec-Ch-Ua-Mobile': '?0',
              'Sec-Ch-Ua-Platform': '"Windows"',
              'Sec-Fetch-Dest': 'empty',
              'Sec-Fetch-Mode': 'cors',
              'Sec-Fetch-Site': 'same-origin',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
              'X-Asbd-Id': 129477,
              'X-Fb-Lsd': lsd
            },
        };
        var reponse = await axios.post(apiUrl, data, config);
        if(!reponse || !reponse.data){
            return res.status(400).json({
                error: 'Không thể lấy dữ liệu thư viện quảng cáo'
            });
        }
        var json_data = await JSON.parse(reponse.data.replace('for (;;);', ''));
        console.log(json_data)
        if(!json_data.payload || !json_data.payload.results){
            return res.status(400).json({
                error: 'Không thể lấy dữ liệu thư viện quảng cáo'
            });
        }
        var results = json_data.payload.results;
        var {forwardCursor,backwardCursor,totalCount,collationToken} = json_data.payload;

        // Sử dụng reduce để tạo một mảng duy nhất
        const flattenedArray = results.reduce((accumulator, currentArray) => {
            // Sử dụng spread operator để nối danh sách đối tượng từ mảng lồng nhau vào mảng kết quả
            return [...accumulator, ...currentArray];
        }, []);
        const newResults = await Promise.all(flattenedArray.map((item) => ({
            pageID: item.pageID,
            pageName: item.pageName,
        })))
        return res.status(200).json({
            success: true,
            totalCount: totalCount,
            count: newResults.length,
            data: newResults,
            forwardCursor: forwardCursor,
            collationToken: collationToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Error Server'
        });
    }
}