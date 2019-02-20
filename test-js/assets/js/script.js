$(document).ready(function () {
    var url = window.location.href;
    var urlParam = new URL(url);
    var employee = new Employee();
    var id = urlParam.searchParams.get('id');

    employee.list();

    if (id)
        employee.search(id);

    validate($);

    mask($);

    $('#form').submit(function (e) {
        e.preventDefault();

        var data = $(this).serializeArray().reduce(function (a, x) {
            a[x.name] = x.value;
            return a;
        }, {});

        id != null ? employee.update(id, data) : employee.create(data);

        url = url.replace('index.html', 'list.html').split("?")[0];
        window.location.href = url;
    });

    $('.remove').click(function () {
        if (confirm('Are you sure?')) {
            employee.remove($(this).val());
        }
    });
});

function mask($) {
    $("input[name='age']").mask('00');
    $("input[name='phone_number']").mask('(00) 00000-0000');
    $("input[name='cpf']").mask('000.000.000-00');
    $("input[name='rg']").mask('00.000.000-AA');
    $("input[name='number']").mask('000000');
    $("input[name='state']").mask('AA', {
        'translation': {
            A: {pattern: /[A-Za-z]/},
        }
    });
}

function validate($) {
    $("input[name='name']").keydown(function (event) {
        onlyLetters(event)
    });
    $("input[name='city']").keydown(function (event) {
        onlyLetters(event)
    });
    $("input[name='cpf']").focusout(function () {
        if (!validateCpf($(this).cleanVal())) {
            $(this).addClass('alert');
            $("#save").attr('disabled', 'disabled').addClass('disabled');
        } else {
            $(this).removeClass('alert');
            $("#save").removeAttr('disabled').removeClass('disabled');
        }
    });
}

function onlyLetters(event) {
    var inputValue = event.which;
    if (!(inputValue >= 65 && inputValue <= 120) &&
        (inputValue !== 32 && inputValue !== 0 && inputValue !== 8
            && inputValue !== 9 && inputValue !== 37 && inputValue !== 39)) {
        event.preventDefault();
    }
}

function validateCpf(strCPF) {
    var sum;
    var rest;
    sum = 0;
    if (strCPF == "00000000000"
        || strCPF == "11111111111"
        || strCPF == "22222222222"
        || strCPF == "33333333333"
        || strCPF == "44444444444"
        || strCPF == "55555555555"
        || strCPF == "66666666666"
        || strCPF == "77777777777"
        || strCPF == "88888888888"
        || strCPF == "99999999999") return false;

    for (i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(strCPF.substring(9, 10))) return false;

    sum = 0;
    for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}