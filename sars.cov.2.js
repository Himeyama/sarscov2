class JapanPref{
    color(pref, color){
        if(pref == "Hokkaido"){
            this.color("Hopporyodo", color)
        }
        let e = document.getElementById(pref)
        for(let i = 0; i < e.children.length; i++){
            e.children[i].style.fill = color
        }
    }

    run(){
        let size = JapanPref.json.size
        for(let i = 0; i < JapanPref.list.length; i++){
            let pref = JapanPref.list[i]
            let n = JapanPref.json[pref]
            if(n){
                this.color(pref, JapanPref.colorRed[1+parseInt(Math.log(n)*3)])
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

let imgJapan = new XMLHttpRequest
imgJapan.open('GET', "Map_of_Japan_010.svg")
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
