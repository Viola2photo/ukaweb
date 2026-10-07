import flower from '@/assets/DSC_7978.jpg.asset.json'
import squid from '@/assets/DSC_7986.jpg.asset.json'
import duo from '@/assets/DSC_7981.jpg.asset.json'
import shrimp from '@/assets/DSC_7988.jpg.asset.json'
import crossSection from '@/assets/DSC_7989.jpg.asset.json'
import burdock from '@/assets/DSC_7995.jpg.asset.json'

export const products = [
  { name: '北海鱈花枝', subtitle: '海味滿滿・外酥內彈', description: '鱈魚漿包進花枝、蝦仁、魷魚、干貝、荸薺與洋蔥。外層酥香，裡頭吃得到不同食材的口感。', image: flower.url, filename: 'DSC_7978.jpg', prices: [80, 150, 200], detail: undefined, detailText: undefined },
  { name: '札幌墨魚燒', subtitle: '酥香登場・海味日常', description: '墨魚、魷魚、干貝、松阪肉與鱈魚五種食材融合，保留咀嚼時的小顆粒口感。外酥內彈，咬下還有海鮮的鮮與多汁。', image: squid.url, filename: 'DSC_7986.jpg', prices: [70, 130, 180], detail: undefined, detailText: undefined },
  { name: '冠軍雙拼', subtitle: '兩種海味・一次滿足', description: '北海鱈花枝＋札幌墨魚燒，一次吃到兩種海味。推薦芥末沙拉搭配小辣『黯然銷粉』，再加酸甜酸黃瓜，冠軍搭配一次愛上。', image: duo.url, filename: 'DSC_7981.jpg', prices: [100, 150, 200], detail: undefined, detailText: undefined },
  { name: '鮮貝鱈魚蝦球', subtitle: '海鮮好料・咬開看看', description: '鱈魚漿包著整顆蝦仁，搭配大顆干貝、魷魚、荸薺與洋蔥。咬開酥香外皮，好料看得見。', image: shrimp.url, filename: 'DSC_7988.jpg', detail: crossSection.url, detailText: '剖面看得見整顆蝦仁，以及大顆干貝、魷魚、荸薺與洋蔥。', prices: [100, 160, 240] },
  { name: '牛蒡鱈魚燒', subtitle: '牛蒡香氣・酥香滋味', description: '以鱈魚漿為底，牛蒡絲加量。炸起後外層酥脆，鱈魚漿與牛蒡的香氣越嚼越明顯，一口接一口。', image: burdock.url, filename: 'DSC_7995.jpg', prices: [60, 100, 150], detail: undefined, detailText: undefined },
]
export const locations = ['南雅夜市：南雅東路52號對面', '五華夜市', '蘆洲得勝街76號', '桃園夜市：桃園區北埔路133號路口', '銅鑼夜市', '台中黎明路三段26號', '中港夜市D63', '台中西區中美街241號', '梧棲區雲集街33號', '嘉義文化夜市', '台南永康區南台街13巷28號', '東海遊園南路143巷12號', '瑞豐夜市第三排158號', '花蓮東大門', '草屯草鞋墩', '埔里城', '南崗', '家樂福']
export const schedule = [{ day: '一', place: '竹中口' }, { day: '三', place: '青草湖' }, { day: '四', place: '二重埔' }, { day: '六', place: '竹東' }, { day: '日', place: '大溪' }]
export const steps = [
  { title: '來電了解、現場實察', body: '可來電或約時間，現場了解品牌營運狀況、攤位實際營運流程及檢視合約細項。', items: undefined, note: undefined, quote: undefined },
  { title: '加盟方案內容', body: '合約總金額為24萬元，包含：', items: ['攤車', '炸台及抽風設備', '50項以上出餐器具', '品牌廣告支援', '約可銷售6萬6千元的首批貨品', '約1萬元的營業耗材'], note: undefined, quote: undefined },
  { title: '提供5萬元開辦費', body: '簽約後提供5萬元，協助支應前期開店需求。5萬元已含在24萬元合約總金額中，不另外加收。', items: ['攤位租金及押金', '購買冷凍櫃', '申請或叫用瓦斯', '購買合適的延長線'], note: '上述項目合計若超過5萬元，超出的部分才需要自行負擔。', quote: undefined },
  { title: '完成準備、開始營業', body: '設備、攤位及相關物品準備完成後，即可使用首批貨品與耗材開始營業。', items: undefined, note: undefined, quote: undefined },
  { title: '營業後再開始付款', body: '24萬元分為12期，每期2萬元；簽約滿一個月後才開始支付第一期。', items: undefined, note: '付款起算依簽約滿一個月，不以是否已有收入為條件。開業時程依實際準備情形。', quote: '正常情況下，開始繳款前應該已經正式營業並產生收入，讓創業者不用在尚未營運前，就先承擔全部加盟費用。' },
]
