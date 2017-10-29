(function () {
    var datepicker = window.datepicker;
    var Data;
    var $wrapper;
    datepicker.buildUi = function (year, month) {
        Data = datepicker.getMonthData(year, month);
        var html = '<div class="ui-datePicker-header">' +
            '<a href="#" class="ui-datePicker-btn ui-datePicker-prev-btn">&lt;</a>' +
            '<span class="ui-datePicker-curr-month">' + Data.year + '-' + Data.month + '</span>' +
            '<a href="#" class="ui-datePicker-btn ui-datePicker-next-btn">&gt;</a>' +
            '</div>' +
            '<div class="ui-datePicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var i = 0; i < Data.days.length; i++) {
            var date = Data.days[i];
            if (i % 7 === 0) {
                html += '<tr>'
            }
            html += '<td data-date="' + date.date + '">' + date.showDate + '</td>'
            if (i % 7 === 6) {
                html += '</tr>'
            }
        }
        html += '</tbody>' +
            '</table>' +
            '</div>';
        return html;
    };


    datepicker.format = function (date) {
        var ret = '';
        var padding = function (num) {
            if (num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        };
        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    };


    datepicker.getElementByAttr = function (attr, value) {
        var elements = document.getElementsByTagName('td');
        var cEle;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute(attr) == value)
                cEle = elements[i];
        }
        return cEle;
    };


    datepicker.render = function (direction) {
        var year;
        var month;
        if (Data) {
            year = Data.year;
            month = Data.month;
        }
        if (direction === 'prev') {
            if (month == 1) {
                year = Data.year - 1;
                month = 12;
            } else {
                month--;
            }
        }
        if (direction === 'next') {
            if (month == 12) {
                year = Data.year + 1;
                month = 1;
            } else {
                month++;
            }
        }
        var html = datepicker.buildUi(year, month);
        $wrapper = document.querySelector('.ui-datePicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = 'ui-datePicker-wrapper';
            document.body.appendChild($wrapper);
        }
        $wrapper.innerHTML = html;
    };


    datepicker.init = function (input) {
        datepicker.render();
        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove('ui-datePicker-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datePicker-wrapper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left;
                isOpen = true;
            }
        }, false);
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if (!$target.classList.contains('ui-datePicker-btn')) {
                return;
            }
            if ($target.classList.contains('ui-datePicker-btn')) {
                if ($target.classList.contains('ui-datePicker-prev-btn')) {
                    datepicker.render('prev');
                } else if ($target.classList.contains('ui-datePicker-next-btn')) {
                    datepicker.render('next');
                }
            }
        }, false);
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            var getElementByAttr = datepicker.getElementByAttr('data-date', $target.dataset.date);
            var element = document.getElementsByTagName('td');
            for (var i = 0; i < element.length; i++) {
                element[i].className = '';
            }
            getElementByAttr.className = 'active';
            if ($target.tagName.toLowerCase() !== 'td') {
                return;
            }
            var date = new Date(Data.year, Data.month - 1, $target.dataset.date);
            console.log(date);
            $input.value = datepicker.format(date);
            $wrapper.classList.remove('ui-datePicker-wrapper-show')
        })
    }
})();