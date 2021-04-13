
class MyDate {

    range(p1, p2, type) {
        let d1 = new Date(p1), d2 = new Date(p2);
        let f = {
            'iso': this.iso,
            'format': this.format,
            'date': (d) => new Date(d)
        }
        var list = [f[type](d1)];
        while (d1 < d2) {
            d1.setDate(d1.getDate() + 1);
            list.push(f[type](d1));
        }
        return list;
    }

    format(d) {
        if (!d) return '-';
        let dateFormat = {
            year: 'numeric',
            month: 'numeric',
            day: '2-digit'
        }
        return new Intl.DateTimeFormat('en-IN', dateFormat).format(d);
    }

    iso(d) {
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }

    diffDays(d1, d2) {
        if (!d1 || !d2) return 0;
        let ms = 1000 * 60 * 60 * 24;
        return Math.floor((d2 - d1) / ms) + 1;
    }

    lastDate(y, m) {
        return new Date(y, m + 1, 0);
    }

    compare(d1, d2) {
        if (d1.getTime() === d2.getTime()) return 0;
        else if (d1 > d2) return 1;
        else return -1;
    }

    currentYear() {
        return new Date(Date.now()).getFullYear();
    }

    currentMonth() {
        return new Date(Date.now()).getMonth();
    }
}

export default new MyDate();