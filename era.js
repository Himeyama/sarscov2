class Era extends Date{
    constructor(...date){
        super(...date)
        var erasData = [
            ["明治", 1868, 10, 23],
            ["大正", 1912, 7, 30],
            ["昭和", 1926, 12, 25],
            ["平成", 1989, 1, 8],
            ["令和", 2019, 5, 1]
        ]
        this.eras = {}
        for(var i = 0; i < erasData.length; i++){
            this.eras[erasData[i][0]] = new Date(erasData[i][1], erasData[i][2] - 1, erasData[i][3])
        }
    }

    getEra(){
        var erasName = Object.keys(this.eras)
        for(var i = 0; i < erasName.length; i++){
            if((i != erasName.length - 1 && this.eras[erasName[i]] <= this && this < this.eras[erasName[i+1]])
            || (i == erasName.length - 1 && this.eras[erasName[i]] <= this)){
                break
            }
        }
        return erasName[i]
    }

    getEraDate(){
        var era = this.getEra()
        var year = this.getFullYear() - this.eras[era].getFullYear() + 1
        var month = this.getMonth() + 1
        var date = this.getDate()
        return [era, year, month, date]
    }

    getWareki(){
        var edate = this.getEraDate()
        return `${edate[0]}${edate[1] == 1 ? "元" : edate[1]}年${edate[2]}月${edate[3]}日`
    }
}