$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault(); // главное: не перезагружать страницу

    var ip = $("#ip").val().trim();

    if (!ip) {
      $("#result").html("<p style='color:red'>Введите IP</p>");
      return;
    }

    // Endpoint DaData для определения города по IP
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";

    // ВСТАВЬ СЮДА СВОЙ API-КЛЮЧ (НЕ секретный)
    var token = "ВСТАВЬ_СЮДА_API_КЛЮЧ";

    $.ajax({
      type: "GET",
      url: url + encodeURIComponent(ip),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", "Token " + token);
      },
      dataType: "json",
      encode: true,
    }).done(function (result) {
      // Требование ДЗ: вывести result в консоль
      console.log(result);

      // Достаем город из ответа
      // Обычно есть location.data.city или location.data.city_with_type
      var city = "";
      if (result && result.location && result.location.data) {
        city = result.location.data.city_with_type || result.location.data.city || "";
      }

      if (!city) {
        $("#result").html("<p>Город не определён (или IP не российский)</p>");
        return;
      }

      $("#result").html("<p><b>Город:</b> " + city + "</p>");
    }).fail(function (xhr) {
      console.log("Ошибка", xhr.status, xhr.responseText);
      $("#result").html("<p style='color:red'>Ошибка запроса. Проверь API-ключ и IP.</p>");
    });
  });
});
