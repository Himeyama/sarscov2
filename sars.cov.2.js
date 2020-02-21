class JapanPref{
    color(pref, color1, color2){
        if(pref == "Hokkaido"){
            this.color("Hopporyodo", color1, color2)
        }
        let e = document.getElementById(pref)
        for(let i = 0; i < e.children.length; i++){
            e.children[i].style.fill = color1
            e.children[i].style.stroke = color2
        }
    }

    run(){
        let size = JapanPref.obj.size
        for(let i = 0; i < JapanPref.list.length; i++){
            let pref = JapanPref.list[i]
            let n = JapanPref.obj[pref]
            if(n){
                let f = 1 + parseInt(Math.log(n))
                this.color(pref, JapanPref.colorRed[f + 1], JapanPref.colorRed[f + 2])
            }
        }
    }
}
JapanPref.colorRed = [
    "#ffffff",
    "#ffebee",
    "#ffcdd2",
    "#ef9a9a",
    "#e57373",
    "#ef5350",
    "#f44336",
    "#e53935",
    "#d32f2f",
    "#c62828",
    "#b71c1c"
]
JapanPref.list = ["Hokkaido", "Aomori", "Iwate", "Akita", "Yamagata", "Miyagi", "Fukushima",
    "Ibaraki", "Chiba", "Tokyo", "Kanagawa", "Saitama", "Tochigi", "Gumma",
    "Yamanashi", "Shizuoka", "Aichi", "Gifu", "Nigata", "Nagano", "Toyama", "Ishikawa",
    "Fukui", "Mie", "Shiga", "Kyoto", "Osaka", "Nara", "Wakayama", "Hyogo",
    "Okayama", "Hiroshima", "Tottori", "Shimane", "Yamaguchi",
    "Kagawa", "Ehime", "Kochi", "Tokushima",
    "Fukuoka", "Saga", "Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima",
    "Okinawa"
]
JapanPref.obj = {}

function main(){
    let imgJapan = new XMLHttpRequest
    imgJapan.open('GET', "https://himeyama.github.io/sarscov2/Map_of_Japan_010.svg")
    imgJapan.responseType = "image/svg"
    imgJapan.send()

    imgJapan.onload = function() {
        document.getElementById("imgJapan").innerHTML = imgJapan.response

        let json = new XMLHttpRequest
        json.open("GET", "sars.cov.2.json")
        json.responseType = "application/json"
        json.send()
        json.onload = function(){
            JapanPref.json = JSON.parse(json.response)
            jp = new JapanPref
            jp.run()
        }
    }
}

// main()

class Pref{
    static toJ(pref){
        let list = {
            "Hokkaido": "北海道",
            "Aomori": "青森",
            "Iwate": "岩手",
            "Akita": "秋田",
            "Yamagata": "山形",
            "Miyagi": "宮城",
            "Fukushima": "福島",
            "Ibaraki": "茨城",
            "Chiba": "千葉",
            "Tokyo": "東京", 
            "Kanagawa": "神奈川", 
            "Saitama": "埼玉", 
            "Tochigi": "栃木", 
            "Gumma": "群馬",
            "Yamanashi": "山梨", 
            "Shizuoka": "静岡", 
            "Aichi": "愛知", 
            "Gifu": "岐阜", 
            "Nigata": "新潟", 
            "Nagano": "長野", 
            "Toyama": "富山", 
            "Ishikawa": "石川",
            "Fukui": "福井", 
            "Mie": "三重", 
            "Shiga": "滋賀", 
            "Kyoto": "京都", 
            "Osaka": "大阪", 
            "Nara": "奈良", 
            "Wakayama": "和歌山",
            "Hyogo": "兵庫",
            "Okayama": "岡山",
            "Hiroshima": "広島", 
            "Tottori": "鳥取", 
            "Shimane": "島根", 
            "Yamaguchi": "山口",
            "Kagawa": "香川", 
            "Ehime": "愛媛", 
            "Kochi": "高知", 
            "Tokushima": "徳島",
            "Fukuoka": "福岡", 
            "Saga": "佐賀", 
            "Nagasaki": "長崎", 
            "Kumamoto": "熊本", 
            "Oita": "大分", 
            "Miyazaki": "宮崎", 
            "Kagoshima": "鹿児島",
            "Okinawa": "沖縄"
        }
        return `${list[pref]}${pref == "Hokkaido" ? "" : (pref == "Kyoto" || pref == "Osaka" ? "府" : (pref == "Tokyo" ? "都" : "県"))}`
    }
}