-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 05 2022 г., 18:06
-- Версия сервера: 8.0.24
-- Версия PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test_nebo`
--

-- --------------------------------------------------------

--
-- Структура таблицы `objects`
--

CREATE TABLE `objects` (
  `id` int NOT NULL,
  `title` text NOT NULL,
  `parent_id` int NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `objects`
--

INSERT INTO `objects` (`id`, `title`, `parent_id`, `description`) VALUES
(1, 'Electronics', 0, 'Amet, non dui habitasse mattis urna interdum tempu'),
(7, 'Sdapibus', 1, 'Dictum habitasse tempus nulla habitasse sapien ornare eleifend tortor, sit s'),
(47, 'Imperdiet', 0, 'Consectetur in non amet, mattis nulla vitae mauris quis, vel venenatis'),
(53, 'Habitasse', 7, ' libero, molestie vulputate velit tortor'),
(54, 'Morbi ', 53, 'Aenean mauris in et vitae ultricies. Arcu dapibus amet, sapien molestie dictum elit'),
(55, 'Pellentesque', 0, 'habitasse tempus luctus hac morbi imperdiet odio. Sit inte'),
(56, 'Quam', 47, 'ornare odio. Consectetur in non amet, mattis nulla vitae mauris quis, vel venenatis consectetur m'),
(57, 'Pulvina', 0, 'Pulvinar imperdiet cursus urna mauris lectus risus et non odio. Venenatis n'),
(58, 'Vel amet ornaresssss', 55, 'dictum dui lacinia dictum. Vel amet ornare cursus odio. Nunc vulput'),
(59, 'Dui vulputate', 53, 'Non ornare urna nisi habitasse sit cras est. Aenean mauris in et vitae ultricies'),
(61, 'Arcu ', 1, ' Quis, amet sed pellentesque in nunc nisi in elit. Morbi hac luctus ipsum non libero, molestie '),
(62, 'Ut. Habitasse', 1, 'Urna vestibulum sit tortor, tortor, amet, libero, dictum. Molestie luctus mollis dictum u'),
(63, 'Accumsan', 62, ' eget cursus eleifend pulvinar hac elit. Odio. In interdum vulputate non dui aenean integer '),
(64, 'Pulvinar ', 62, 'alert(123)'),
(65, 'ShSabitasse ', 59, 'Non ornare urna nisi habitasse sit cras est. Aenean mauris in et vitae ultricies'),
(66, 'Sultricies', 59, ' SiSn et vitae ultriciesornare urna in et vitae ultricies'),
(67, 'Malesuada ', 62, 'Pulvinar pellentesque malesuada in urna justo amet, cras odio. Da2312'),
(68, 'luctus', 0, 'Platea imperdiet odio. In tortor, dui cras et. Et. Pellentesque integer faucib343'),
(70, 'Aaugue ', 0, 'Cras habitasse mattis quam, leo, morbi tortor'),
(71, 'Fmattis quam', 70, ' nunc malesuada amet, efficitur dapibus amet, mattis et. Vel odio. Arcu amet'),
(72, ' Vel odio.', 71, 'suada amet, efficitur dapibus amet, mattis et. Vel odio.odio. Arcu amet'),
(74, 'Gricies', 66, ' SiSn et vitae ultriciesornare urna in et vitae ultricies vitae ultriciesornare urna in et vitae ul'),
(75, 'Pulvinardsd 1', 64, 'alert(123)');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `objects`
--
ALTER TABLE `objects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
