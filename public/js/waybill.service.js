(($, config, m, moment) => {
    let inputWaybillTimeout = null;

    $('#input-waybill').on('keyup', function () {
        if (inputWaybillTimeout) clearTimeout(inputWaybillTimeout);
        inputWaybillTimeout = setTimeout(() => {
            fetchExpressCompany($(this).val());
        }, 350);

    });

    $('#form-search-waybill').on('submit', function (e) {
        const num = $('#input-waybill').val();
        e.preventDefault();
        fetchExpressCompany(num);
        fetchTrackingLogistics(num);
    });

    $('#btn-close-result').on('click', function (e) {
        $('#search-box-result').addClass('hide');
    });

    function fetchExpressCompany(num) {
        $('#com-loaded').addClass('hide');
        $('#com-unknown').addClass('hide');
        $('#com-loading').removeClass('hide');
        $.ajax({
            method: "GET",
            url: config.API_HOST + "/waybill/express-company",
            data: "num=" + num
        }).then((response) => {
            $('#com-loading').addClass('hide');

            const comCode = response.data.com_code;

            if (response.data.com_code) {
                $('#com-loaded').attr({
                    src: config.COM_IMG_URL + comCode + '.png',
                    alt: 'Hãng vận chuyển: ' + comCode,
                    title: 'Hãng vận chuyển: ' + comCode
                }).removeClass('hide');
            } else {
                $('#com-unknown').removeClass('hide');
            }

        }, (error) => {
            m.toast(error.responseJSON.message, 3000);
            $('#com-loading').addClass('hide');
        });
    }

    function fetchTrackingLogistics(num) {
        $('#search-box-progress').removeClass('hide');
        $('.btn-search').addClass('disabled');
        $('#search-box-result').addClass('hide');

        $.ajax({
            method: "GET",
            url: config.API_HOST + "/waybill/tracking",
            data: "num=" + num
        }).then(response => {
            $('#search-box-progress').addClass('hide');
            $('.btn-search').removeClass('disabled');

            if (response.data.data) {
                $("#search-box-result table").children("tbody").html('');
                let tracks = response.data.data;
                console.log(tracks);
                for (let i = 0; i < tracks.length; i++) {
                    let lastTrackClass = '';
                    let statusCheck = '';
                    if (i === 0) {
                        lastTrackClass = 'last';
                        statusCheck = 'status-check';
                    } else {
                        statusCheck = 'status';
                    }
                    let tr =
                        `<tr class="${lastTrackClass}">
                        <td class="row1">
                        <span class="day">${moment(tracks[i].ftime).format('YYYY-MM-DD')}</span>
                        <span class="time">${moment(tracks[i].ftime).format('HH:mm')}</span>
                        </td>
                                <td class="${statusCheck}">
                                <div class="col2"><span class="step"></span></div>
</td>
<td class="context">${tracks[i].context}</td>
</tr>`;

                    $("#search-box-result table").children("tbody").append(tr);
                }


                if(response.data.ischeck === "1") {
                    console.log(response.data.ischeck);
                    $('#check-msg').children('h5').text('ĐÃ NHẬP Kho đích tại Trung Quốc');
                } else {
                    $('#check-msg').children('h5').text('CHƯA NHẬP Kho đích tại Trung Quốc');
                }

                $('#search-box-result').removeClass('hide');
                $("#search-box-result table").children("tbody").html($("#search-box-result table").children("tbody").html());
            } else {
                m.toast('Không tìm thấy lộ trình của mã vận đơn này', 3000);
            }
        }, error => {
            m.toast(error.responseJSON.message, 3000);
            $('#search-box-progress').addClass('hide');
            $('.btn-search').removeClass('disabled');
        })
    }

    $(document).ready(function () {
        let num = $('#input-waybill').val();
        if (num) {
            $('#form-search-waybill').submit();
        }
    })
})(jQuery, config, Materialize, moment);