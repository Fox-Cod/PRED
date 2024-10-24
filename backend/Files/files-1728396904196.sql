-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 27 2024 г., 17:54
-- Версия сервера: 8.2.0
-- Версия PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `pepp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `years`
--

DROP TABLE IF EXISTS `years`;
CREATE TABLE IF NOT EXISTS `years` (
  `idYear` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  PRIMARY KEY (`idYear`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `years`
--

INSERT INTO `years` (`idYear`, `year`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
 AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`idTeacher`, `name`, `email`, `password`, `resetToken`, `idSchool`, `idGroup`, `role`, `СreateDate`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$.xhNdktxpHmWj.fvrklWKeU0GHooYYGleQ6KP2lvdy8zfMlynWd9C', NULL, 6, 1, 'administrador', '2024-05-29 15:24:33'),
(2, 'Sofia', 'sofia@gmail.com', '$2b$10$pin6zbD.J75pW1XAgeg4JugoDWTIMmbrmoemgOY6x7NcFGnGG31RW', NULL, 2, 17, 'utilizador', '2024-05-29 15:32:28'),
(3, 'Alexander', 'alex@gmail.com', '$2b$10$sg056VRg/1vghGOgb6qmFeLgMGvz8fnR/.mi5TOSPQsEwosqs2MjO', NULL, 4, 21, 'utilizador', '2024-05-29 15:32:46'),
(4, 'Miguel', 'mig@gmail.com', '$2b$10$BVIc4qqcUnujccy7Wk8KJOc8jBOSIkatgq6/nExbV/rWljXUUouGy', NULL, 2, 14, 'utilizador', '2024-05-30 08:04:32'),
(5, 'Tony', 'tony@gmail.com', '$2b$10$9t4SofRPJD.W/k88qXuTSOV5aP0jU7hLlqai/Mn/jGKQkbVP61u6q', NULL, 2, 16, 'utilizador', '2024-06-06 19:45:01'),
(6, 'Fox Wer', 'mrzerox228@gmail.com', NULL, NULL, 5, 6, 'administrador', '2024-06-08 11:49:34'),
(9, 'ivan', 'ivan@gmail.com', '$2b$10$5krjU.nZ0MiDB6/Nv3pikenRUSDgWe99DovnDWy/.Q3LnUZZxsBw6', NULL, 5, 17, 'utilizador', '2024-06-20 12:05:38'),
(10, 'Sofia321', 'sofia1@gmail.com', '$2b$10$7SQTKgRiwxZvbPjIrAMQXeBaEx/RasaZU0oD83we.3bdzGmvuZCFi', NULL, 6, 16, 'utilizador', '2024-08-16 14:03:45'),
(11, 'Olexandr', 'olex@gmail.com', '$2b$10$o3IWS3Dte7A0FNmH0D2o.e2b3YxY8GTWCPyHRscu8lXn3POhXJ0Om', NULL, 3, 17, 'utilizador', '2024-09-15 17:21:02'),
(12, 'alisa', 'alisa@gmail.com', '$2b$10$cDMFwBtMi9wKSIIpPhqw1.Bbw4Q18GIUGFZzRvp4X97Z8QR70XDuK', NULL, 6, 17, 'utilizador', '2024-09-15 17:31:31'),
(13, 'bkoma', 'koma@gmail.com', '$2b$10$BxiZZS3oNFDCVIeR8fyUg.AyER66L8RddWPM2pklOliCOzXndhOta', NULL, 5, 18, 'utilizador', '2024-09-15 17:48:00');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_215` FOREIGN KEY (`idSchool`) REFERENCES `schools` (`idSchool`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_216` FOREIGN KEY (`idGroup`) REFERENCES `groups` (`idGroup`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
