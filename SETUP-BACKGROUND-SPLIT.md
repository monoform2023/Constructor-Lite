# Инструкция по разделению фонового изображения

## Обзор
Для правильной работы трехслойной фоновой системы необходимо разделить исходное изображение `background.jpg` (3200x1460px) на три части.

## Технические характеристики

### Исходное изображение
- **Файл:** `images/layouts/3-sections/background.jpg`
- **Размер:** 3200 x 1460 пикселей

### Части для создания

#### 1. Левая часть (background-left.jpg)
- **Область обрезки:** 0 - 812px по горизонтали
- **Итоговый размер:** 812 x 1460px
- **Функция:** Статичная левая часть фона

#### 2. Центральная часть (background-center.jpg)
- **Область обрезки:** 812 - 2388px по горизонтали
- **Итоговый размер:** 1576 x 1460px
- **Функция:** Динамическая часть, будет масштабироваться с секциями

#### 3. Правая часть (background-right.jpg)
- **Область обрезки:** 2388 - 3200px по горизонтали
- **Итоговый размер:** 812 x 1460px
- **Функция:** Статичная правая часть фона

## Алгоритм разделения

### В Photoshop:
1. Откройте `background.jpg`
2. Создайте направляющие на позициях 812px и 2388px
3. Используйте инструмент "Рамка" (Crop) для обрезки каждой части:
   - Левая часть: 0-812px
   - Центральная часть: 812-2388px
   - Правая часть: 2388-3200px
4. Сохраните каждую часть в формате JPG

### В GIMP:
1. Откройте `background.jpg`
2. Используйте "Изображение → Размер холста" или инструмент обрезки
3. Создайте три отдельных файла с соответствующими областями

### Программно (Python + Pillow):
```python
from PIL import Image

# Открываем исходное изображение
img = Image.open('background.jpg')

# Обрезаем части
left_part = img.crop((0, 0, 812, 1460))
center_part = img.crop((812, 0, 2388, 1460))
right_part = img.crop((2388, 0, 3200, 1460))

# Сохраняем части
left_part.save('background-left.jpg')
center_part.save('background-center.jpg')
right_part.save('background-right.jpg')
```

## Проверка правильности
После создания всех трех изображений:

1. Левая + Центральная + Правая = 812 + 1576 + 812 = 3200px ✓
2. Все изображения должны иметь высоту 1460px ✓
3. При расположении рядом должны образовывать исходное изображение ✓

## Размещение файлов
Разместите созданные файлы в папке:
```
images/layouts/3-sections/
├── background-left.jpg
├── background-center.jpg
└── background-right.jpg
```

## Результат
После создания изображений система автоматически:
- Отобразит левую и правую части как статичные
- Будет масштабировать центральную часть при изменении размеров секций
- Устранит появление белых промежутков при сжатии секций 