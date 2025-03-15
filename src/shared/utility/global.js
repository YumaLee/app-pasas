
class global {
    formatParameter(object) {
        var encodedString = '';
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                if (object[prop] !== null && object[prop] !== undefined)
                    encodedString += prop + '=' + encodeURIComponent(object[prop]);
            }
        }
        return encodedString;
    };

    formatSearch(value) {
        value = value ?? '';
        value = value.toString().toLowerCase();
        value = value.replace(new RegExp('á', 'g'), 'a');
        value = value.replace(new RegExp('é', 'g'), 'e');
        value = value.replace(new RegExp('é', 'g'), 'i');
        value = value.replace(new RegExp('ó', 'g'), 'o');
        value = value.replace(new RegExp('ú', 'g'), 'u');
        value = value.trim();
        return value;
    };

    fetchCurrentDateStr(firstDayOfTheMonth) {
        var date = new Date();
        var yyyy = date.getFullYear();
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var dd = firstDayOfTheMonth === true ? '01' : String(date.getDate()).padStart(2, '0');
        return dd + '/' + mm + '/' + yyyy;
    };

    formatoFecha(fechaISO) {
        const fecha = fechaISO.substring(0, 10);
        // Obtener día, mes y año en el formato adecuado
        const dia = fecha.split("-")[2];
        const mes = fecha.split("-")[1];
        const anio = fecha.split("-")[0];

        // Retornar la fecha en formato dd/mm/yy
        return `${dia}/${mes}/${anio}`;
    }

    fetchCurrentYear() {
        var date = new Date();
        return date.getFullYear();
    };

    onBlurDecimals = (value, decimals) => {
        if (value === '' || isNaN(parseFloat(value).toFixed(decimals)))
            return parseFloat(0).toFixed(decimals);
        else
            return parseFloat(value).toFixed(decimals);
    };

    onBlurDecimalsNullable = (value, decimals) => {
        if (value === '' || isNaN(parseFloat(value).toFixed(decimals)))
            return '';
        else
            return parseFloat(value).toFixed(decimals);
    };

    onKeyPressDecimals = (e) => {
        const reg = /^-?[0-9]*(\.[0-9]*)?$/;
        const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!reg.test(pressedKey)) {
            e.preventDefault();
            return false;
        }
    };

    onKeyPressNumber = (e) => {
        const reg = /[0-9]+/;
        const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!reg.test(pressedKey)) {
            e.preventDefault();
            return false;
        }
    };
    downloadFileBlob(dataUrl, filename) {

        // Construct the 'a' element
        var link = document.createElement("a");
        link.download = filename;
        link.target = "_blank";

        // Construct the URI
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();

        // Cleanup the DOM
        document.body.removeChild(link);
        //delete link;
    }

    groupBy(array, f) {
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
            return groups[group];
        })
    };

    orderBy(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    };

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    downloadFile(file, filename) {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = file;// window.URL.createObjectURL(file);
        link.download = filename;
        link.click();
        document.body.removeChild(link);
    };

    getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile";
        }
        return "desktop";
    };

    formatDocuments = (querySnapshot) => {
        var items = [];
        querySnapshot.forEach((doc) => {
            var item = doc.data();
            item.id = doc.id;
            items.push(item);
        });
        return items;
    };

}
export default new global();