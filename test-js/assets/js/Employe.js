function Employee() {
    this.tbEmployees = localStorage.getItem('tbEmployees');
    this.tbEmployees = JSON.parse(this.tbEmployees);
    if (this.tbEmployees == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        this.tbEmployees = [];
}

Employee.prototype.create = function (data) {
    this.tbEmployees.push(data);
    localStorage.setItem("tbEmployees", JSON.stringify(this.tbEmployees));
    alert("Employee added!");
    return true;
};

Employee.prototype.update = function (id, data) {
    this.tbEmployees[id] = data;
    localStorage.setItem("tbEmployees", JSON.stringify(this.tbEmployees));
    alert("Employee edited")
};

Employee.prototype.remove = function (id){

    this.tbEmployees.splice(id, 1);
    localStorage.setItem("tbEmployees", JSON.stringify(this.tbEmployees));
    alert("Employee removed.");
    location.reload();
};

Employee.prototype.list = function () {
    $("#tbody").html("");
    for (var i in this.tbEmployees) {
        var employe = this.tbEmployees[i];
        $("#tbody").append("<tr>");
        $("#tbody").append("<td>" + employe.name + "</td>");
        $("#tbody").append("<td class='option'>" +
            "<button class='btn remove' value='" + i + "'>Delete</button>" +
            "<a class='btn' href='index.html?id=" + i + "'>Edit</a></td>");
        $("#tbody").append("</tr>");
    }
};

Employee.prototype.search = function (id) {
    var employe = this.tbEmployees[id];
    $("input[name='name']").val(employe.name);
    $("input[name='age']").val(employe.age);
    $("input[name='birth_day']").val(employe.birth_day);
    $("input[name='phone_number']").val(employe.phone_number);
    $("input[name='cpf']").val(employe.cpf);
    $("input[name='rg']").val(employe.rg);
    $("input[name='address']").val(employe.address);
    $("input[name='city']").val(employe.city);
    $("input[name='state']").val(employe.state);
    $("input[name='number']").val(employe.number);
    $("textarea[name='notes']").val(employe.notes);
};