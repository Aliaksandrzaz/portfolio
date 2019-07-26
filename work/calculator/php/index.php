<?php
// тема письма
$subject = 'Стоимость ремонта';
$message = 'Пользователь ' . $_POST['phoneNumber'] . ' отправил вам стоимость ремонта:' . $_POST['costValue'] . 'руб. Параметры: ' . $_POST['value'] . ', площадь: ' . $_POST['square'] . ' м2 ';

// Отправляем
mail($_POST['email'], $subject, $message, $headers);
?>