$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    var ip = $("#ip").val().trim();

    // 1) URL ipLocate
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address";
    var token = "1a5ae4130c80c93f82bf066fdd39d0d67e25f34a"; // API-ключ

    $.ajax({
      type: "GET",
      url: url,
      data: { ip: ip },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Token " + token);
      },
      dataType: "json",
    }).done(function (result) {
      console.log(result);

      var city = result?.location?.data?.city || "Город не найден";
      $("#result").html("<p><b>Город:</b> " + city + "</p>");
    }).fail(function (xhr) {
      console.log("Ошибка:", xhr.status, xhr.responseText);
      $("#result").html("<p style='color:red'>Ошибка запроса. Проверь токен и IP.</p>");
    });
  });
});
