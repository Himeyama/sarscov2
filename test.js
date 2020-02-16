class CSV{
    static parse(str){
        let csv = new CSV;
        csv.csv = []
        let lines = str.split("\n")
        for(let i in lines){
            csv.csv[i] = lines[i].split(", ")
        }
        return csv
    }

    static getRequest(url){
        let csv = new CSV
        csv.req = new XMLHttpRequest
        csv.req.open('GET', url)
        csv.req.responseType = "text/csv"
        csv.req.send()
        return csv
    }

}

class SARSCOV2{
    static ary2dict(ary){
        let ary1 = new Array
        for(let i in ary){
            ary1[i] = []
            ary1[i][0] = new Date(ary[i][0])
            ary1[i][1] = ary[i][1]
            ary1[i][2] = parseInt(ary[i][2])
        }
        let obj = new Object
        for(let i in ary){
            if(!obj[ary1[i][0]]){
                obj[ary1[i][0]] = new Array
            }
            obj[ary1[i][0]] = obj[ary1[i][0]].concat({pref: ary1[i][1], people: ary1[i][2]})
        }
        return obj
    }
}

class DateAnime{}

function main(){
    let imgJapan = new XMLHttpRequest
    imgJapan.open('GET', "Map_of_Japan_010.svg")
    imgJapan.responseType = "image/svg"
    imgJapan.send()

    imgJapan.onload = function() {
        document.getElementById("imgJapan").innerHTML = imgJapan.response
        csv = CSV.getRequest("data.csv")
        csv.req.onload = function(){
            csv = CSV.parse(csv.req.response)
            list = SARSCOV2.ary2dict(csv.csv)
            // console.log(list)
            
            let dateList = []
            for(let i in csv.csv){
                if(dateList[dateList.length - 1] != String(new Date(csv.csv[i][0]))){
                    dateList = dateList.concat(String(new Date(csv.csv[i][0])))
                }
            }

            let dateRange = []
            let date = new Date(dateList[0])
            let lastDate = dateList[dateList.length - 1]

            while(true){
                dateRange = dateRange.concat(date)
                date = new Date(date)
                if(lastDate == String(date)) break
                date.setDate(date.getDate() + 1)
            }
            // console.log(dateRange) // Date

            DateAnime.i = 0
            DateAnime.dateRange = dateRange

            let jp = new JapanPref
            let dateAnime = setInterval(function(){
                let date = DateAnime.dateRange[DateAnime.i]
                if(list[String(date)]){
                    // console.log( list[String(date)] )
                    for(let i = 0; i < list[String(date)].length; i++){
                        if(!JapanPref.obj[list[String(date)][i].pref]){
                            JapanPref.obj[list[String(date)][i].pref] = 0
                        }
                        JapanPref.obj[list[String(date)][i].pref] += list[String(date)][i].people
                    }
                }

                jp.run()
                let w = new Era(date)
                document.getElementById("date").innerText = w.getWareki()

                if(DateAnime.i == DateAnime.dateRange.length - 1){
                    clearInterval(dateAnime)
                }
                DateAnime.i++
            }, 300)

        }
    }
}


main()
