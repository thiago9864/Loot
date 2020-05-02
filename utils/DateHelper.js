import moment from "moment";

export default class DateHelper {

    /**
     * Converte uma data em string em objeto Date dado o formato fornecido
     * @param {String} dateString 
     * @param {String} format 
     * @returns {Date}
     */
    static dateWithStringAndFormat(dateString, format) {
        if(dateString != null && format != null){
            let m = moment(dateString, format);
            if(m.isValid()){
                return m.toDate();
            }
        }
        return null;
    }

    static getNumberOfDaysInMonth(date){
        if(date != null){
            return moment(date).daysInMonth();
        }
        return 0;
    }

    static getMonthDayInDate(date){
        if(date != null){
            return moment(date).date();
        }
        return 0;
    }

    static getMonthInDate(date){
        if(date != null){
            return moment(date).month();
        }
        return 0;
    }

    static getYearInDate(date){
        if(date != null){
            return moment(date).year();
        }
        return 0;
    }

    static stringWithDateAndFormat(date, format){
        if(date != null && format != null){
            let m = moment(date);
            if(m.isValid()){
                return m.format(format);
            }
        }
        return "";
    }

}