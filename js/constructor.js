// Основная логика конструктора шкафов
class CabinetConstructor {
    constructor() {
        this.layouts = null;
        this.currentLayout = '3-sections';
        this.activeSection = null;
        this.sections = new Map();
        this.currentColor = 'c1'; // Текущий выбранный цвет (по умолчанию c1)
        this.firstInteractionWithVariants = true; // Флаг для показа placeholder в селекторе вариантов
        
        // Глобальные настройки высоты и глубины (не зависят от секций)
        this.globalSettings = {
            sectionHeight: 2620,
            sectionDepth: 582,
            hasCustomDepth: false
        };
        
        // Состояние дверей
        this.doorsEnabled = false;
        this.doors = new Map(); // Хранение данных дверей
        
        // Настройки дверей
        this.doorsSettings = {
            color: 'c1' // Только цвет, убираем ручку и зеркальность
        };

        // Дополнительные параметры для расчета цены
        this.additionalParams = {
            lighting: false,
            sensor: false,
            assembly: false
        };
        
        this.init();
    }

    async init() {
        // Загружаем данные макетов
        await this.loadLayouts();
        
        // Инициализируем систему подсказок
        this.initTooltipSystem();
        
        // Инициализируем систему расчета цены
        this.initPriceCalculator();
        
        // Инициализируем обработчики событий
        this.initEventListeners();
        
        // Инициализируем обработчики для дверей
        this.initDoorsEventListeners();
        
        // Инициализируем мобильную панель
        this.initMobileEventListeners();
        
        // Инициализируем дополнительные параметры
        this.initAdditionalParams();
        
        // Инициализируем кнопки действий
        this.initActionButtons();
        
        // Загружаем макет по умолчанию (3 секции)
        this.loadLayout('3-sections');
        
        // Сохраняем ссылку на конструктор в глобальную область
        window.constructor = this;
        
        console.log('Конструктор шкафа инициализирован');
    }

    async loadLayouts() {
        try {
            console.log('Загружаем встроенную конфигурацию со всеми макетами...');
            
            // Встроенная конфигурация со всеми макетами (работает без HTTP сервера)
            this.layouts = {
                "layouts": {
                    "1-section": {
                        "name": "Однодверный шкаф",
                        "background": "images/layouts/1-section/background.jpg",
                        "cssClass": "layout-1-section",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 1062, "top": 305 },
                                "defaultSize": { "width": 536, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "center",
                                "imagePath": "images/layouts/1-section/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "1_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "1_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "1_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "1_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "1_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "1_s1_k6_c1_1000.jpg" }
                                ]
                            }
                        ]
                    },
                    "2-sections": {
                        "name": "Двухдверный шкаф", 
                        "background": "images/layouts/2-sections/background.jpg",
                        "cssClass": "layout-2-sections",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 746, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "right",
                                "imagePath": "images/layouts/2-sections/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "2_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "2_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "2_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "2_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "2_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "2_s1_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-2", 
                                "name": "Секция 2",
                                "position": { "left": 1326, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/2-sections/sections/section-2/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "2_s2_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "2_s2_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "2_s2_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "2_s2_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "2_s2_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "2_s2_k6_c1_1000.jpg" }
                                ]
                            }
                        ]
                    },
                    "3-sections": {
                        "name": "Трехдверный шкаф",
                        "background": "images/layouts/3-sections/background.jpg",
                        "cssClass": "layout-3-sections",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 428, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "right",
                                "imagePath": "images/layouts/3-sections/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "3_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "3_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "3_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "3_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "3_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "3_s1_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-2",
                                "name": "Секция 2",
                                "position": { "left": 956, "top": 305 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 208,
                                "maxWidth": 520,
                                "transformOrigin": "center",
                                "imagePath": "images/layouts/3-sections/sections/section-2/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "3_s2_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "3_s2_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "3_s2_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "3_s2_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "3_s2_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "3_s2_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-3",
                                "name": "Секция 3",
                                "position": { "left": 1476, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/3-sections/sections/section-3/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "3_s3_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "3_s3_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "3_s3_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "3_s3_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "3_s3_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "3_s3_k6_c1_1000.jpg" }
                                ]
                            }
                        ]
                    },
                    "4-sections": {
                        "name": "Четырехдверный шкаф",
                        "background": "images/layouts/4-sections/background.jpg",
                        "cssClass": "layout-4-sections",
                        "container": {
                            "width": 3200,
                            "height": 1919
                        },
                        "sections": [
                            {
                                "id": "section-1",
                                "name": "Секция 1",
                                "position": { "left": 138, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "right",
                                "imagePath": "images/layouts/4-sections/sections/section-1/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s1_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s1_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s1_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s1_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s1_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s1_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-2",
                                "name": "Секция 2",
                                "position": { "left": 666, "top": 305 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 208,
                                "maxWidth": 520,
                                "transformOrigin": "center",
                                "imagePath": "images/layouts/4-sections/sections/section-2/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s2_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s2_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s2_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s2_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s2_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s2_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-3",
                                "name": "Секция 3",
                                "position": { "left": 1186, "top": 305 },
                                "defaultSize": { "width": 528, "height": 1314 },
                                "minWidth": 211,
                                "maxWidth": 528,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/4-sections/sections/section-3/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s3_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s3_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s3_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s3_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s3_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s3_k6_c1_1000.jpg" }
                                ]
                            },
                            {
                                "id": "section-4",
                                "name": "Секция 4",
                                "position": { "left": 1714, "top": 305 },
                                "defaultSize": { "width": 520, "height": 1314 },
                                "minWidth": 208,
                                "maxWidth": 520,
                                "transformOrigin": "left",
                                "imagePath": "images/layouts/4-sections/sections/section-4/",
                                "variants": [
                                    { "id": "variant-1", "name": "Два ящика и штанга", "image": "4_s4_k1_c1_1000.jpg" },
                                    { "id": "variant-2", "name": "Только полки", "image": "4_s4_k2_c1_1000.jpg" },
                                    { "id": "variant-3", "name": "Четыре ящика и штанга", "image": "4_s4_k3_c1_1000.jpg" },
                                    { "id": "variant-4", "name": "Полка и штанга", "image": "4_s4_k4_c1_1000.jpg" },
                                    { "id": "variant-5", "name": "Две штанги", "image": "4_s4_k5_c1_1000.jpg" },
                                    { "id": "variant-6", "name": "Два ящика и полки", "image": "4_s4_k6_c1_1000.jpg" }
                                ]
                            }
                        ]
                    }
                },
                "settings": {
                    "millimetersToPixels": 0.528,
                    "pixelsToMillimeters": 1.893939
                }
            };
            
            console.log('Встроенная конфигурация загружена');
            console.log('Доступные макеты:', Object.keys(this.layouts.layouts));
        } catch (error) {
            console.error('Ошибка инициализации конфигурации:', error);
        }
    }

    initEventListeners() {
        // Селектор компоновки
        const layoutSelect = document.getElementById('layout-select');
        if (layoutSelect) {
            // Обработчик для удаления placeholder при первом взаимодействии
            const removePlaceholder = () => {
                const placeholderOption = layoutSelect.querySelector('option[value=""]');
                if (placeholderOption) {
                    placeholderOption.remove();
                }
                // Удаляем этот обработчик после первого использования
                layoutSelect.removeEventListener('focus', removePlaceholder);
                layoutSelect.removeEventListener('click', removePlaceholder);
            };
            
            layoutSelect.addEventListener('focus', removePlaceholder);
            layoutSelect.addEventListener('click', removePlaceholder);
            
            layoutSelect.addEventListener('change', (e) => {
                this.loadLayout(e.target.value);
            });
        }
        
        // Чекбокс дверей
        const doorsCheckbox = document.getElementById('doors-enabled');
        if (doorsCheckbox) {
            doorsCheckbox.addEventListener('change', (e) => {
                this.toggleDoors(e.target.checked);
            });
        }
        
        // Инициализируем обработчики дверей
        this.initDoorsEventListeners();
        
        // Инициализируем кнопки действий
        this.initActionButtons();
        
        // Обновляем позицию индикатора при изменении размера окна с задержкой
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateSectionIndicator();
                // Обновляем все hover эффекты
                this.sections.forEach((sectionData) => {
                    if (sectionData.element._updateHover) {
                        sectionData.element._updateHover();
                    }
                });
            }, 100);
        });
        
        console.log('Обработчики событий инициализированы');
    }

    // Инициализация обработчиков событий для мобильной панели
    initMobileEventListeners() {
        // Инициализация табов
        this.initMobileTabs();
        
        // Мобильный селектор компоновки
        const mobileLayoutSelect = document.getElementById('mobile-layout-select');
        if (mobileLayoutSelect) {
            mobileLayoutSelect.addEventListener('change', (e) => {
                this.loadLayout(e.target.value);
                // Синхронизируем с десктопным селектором
                const desktopSelect = document.getElementById('layout-select');
                if (desktopSelect) {
                    desktopSelect.value = e.target.value;
                }
            });
        }
        
        // Мобильные бегунки размера
        this.initMobileSliders();
        
        // Мобильные кнопки цветов
        this.initMobileColorButtons();
        
        // Мобильные элементы управления дверями
        this.initMobileDoorsControls();
        
        // Мобильные дополнительные параметры
        this.initMobileAdditionalParams();
        
        // Мобильные кнопки действий
        this.initMobileActionButtons();
        
        console.log('Мобильные обработчики событий инициализированы');
    }
    
    // Инициализация мобильных табов
    initMobileTabs() {
        const tabs = document.querySelectorAll('.mobile-tab');
        const panels = document.querySelectorAll('.mobile-tab-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetPanel = tab.dataset.tab;
                
                // Убираем активный класс со всех табов и панелей
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Добавляем активный класс к выбранному табу и панели
                tab.classList.add('active');
                const panel = document.querySelector(`[data-panel="${targetPanel}"]`);
                if (panel) {
                    panel.classList.add('active');
                }
            });
        });
    }
    
    // Инициализация мобильных бегунков
    initMobileSliders() {
        // Бегунок ширины - будет настроен динамически при выборе секции
        const mobileWidthSlider = document.getElementById('mobile-width-slider');
        const mobileWidthDisplay = document.getElementById('mobile-width-display');
        if (mobileWidthSlider && mobileWidthDisplay) {
            // Настройка бегунка ширины (работает в пикселях, как десктопная версия)
            mobileWidthSlider.addEventListener('input', (e) => {
                const pixelValue = parseInt(e.target.value);
                this.changeWidth(pixelValue);
                // Обновляем поле ввода в миллиметрах
                mobileWidthDisplay.value = this.pixelsToMillimeters(pixelValue, this.activeSection);
            });
            
            // Настройка поля ввода ширины (работает в миллиметрах)
            this.initInputField(mobileWidthDisplay, (mmValue) => {
                const pixelValue = this.millimetersToPixels(mmValue, this.activeSection);
                this.changeWidth(pixelValue);
                mobileWidthSlider.value = pixelValue;
            });
        }
        
        // Бегунок высоты
        const mobileHeightSlider = document.getElementById('mobile-height-slider');
        const mobileHeightDisplay = document.getElementById('mobile-height-display');
        if (mobileHeightSlider && mobileHeightDisplay) {
            this.initInputField(mobileHeightDisplay, (value) => {
                this.changeHeight(value);
                mobileHeightSlider.value = value;
            });
            
            mobileHeightSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.changeHeight(value);
                mobileHeightDisplay.value = value;
            });
        }
        
        // Чекбокс нестандартной глубины
        const mobileCustomDepthCheckbox = document.getElementById('mobile-custom-depth-checkbox');
        if (mobileCustomDepthCheckbox) {
            mobileCustomDepthCheckbox.addEventListener('change', (e) => {
                this.toggleCustomDepth(e.target.checked);
                // Синхронизируем с десктопным чекбоксом
                const desktopCheckbox = document.getElementById('custom-depth-checkbox');
                if (desktopCheckbox) {
                    desktopCheckbox.checked = e.target.checked;
                }
            });
        }
        
        // Бегунок глубины
        const mobileDepthSlider = document.getElementById('mobile-depth-slider');
        const mobileDepthDisplay = document.getElementById('mobile-depth-display');
        if (mobileDepthSlider && mobileDepthDisplay) {
            this.initInputField(mobileDepthDisplay, (value) => {
                this.changeDepth(value);
                mobileDepthSlider.value = value;
            });
            
            mobileDepthSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.changeDepth(value);
                mobileDepthDisplay.value = value;
            });
        }
    }
    
    // Инициализация мобильных кнопок цветов
    initMobileColorButtons() {
        // Кнопки цвета секций
        const mobileColorButtons = document.querySelectorAll('.mobile-color-button');
        mobileColorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newColor = e.target.dataset.color;
                if (newColor) {
                    this.changeColor(newColor);
                    // Синхронизируем с десктопными кнопками
                    this.syncColorButtons(newColor);
                }
            });
        });
    }
    
    // Инициализация мобильных элементов управления дверями
    initMobileDoorsControls() {
        // Чекбокс дверей
        const mobileDoorsCheckbox = document.getElementById('mobile-doors-enabled');
        if (mobileDoorsCheckbox) {
            mobileDoorsCheckbox.addEventListener('change', (e) => {
                this.toggleDoors(e.target.checked);
                // Синхронизируем с десктопным чекбоксом
                const desktopCheckbox = document.getElementById('doors-enabled');
                if (desktopCheckbox) {
                    desktopCheckbox.checked = e.target.checked;
                }
            });
        }
        
        // Кнопки цвета дверей
        const mobileDoorColorButtons = document.querySelectorAll('.mobile-door-color-button');
        mobileDoorColorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newColor = e.target.dataset.doorColor;
                if (newColor) {
                    this.changeDoorColor(newColor);
                    // Синхронизируем с десктопными кнопками
                    this.syncDoorColorButtons(newColor);
                }
            });
        });
    }
    
    // Инициализация мобильных дополнительных параметров
    initMobileAdditionalParams() {
        // Подсветка
        const mobileLighting = document.getElementById('mobile-lighting-enabled');
        if (mobileLighting) {
            mobileLighting.addEventListener('change', (e) => {
                this.additionalParams.lighting = e.target.checked;
                this.updateTotalPrice();
                // Синхронизируем с десктопом
                const desktopLighting = document.getElementById('lighting-enabled');
                if (desktopLighting) {
                    desktopLighting.checked = e.target.checked;
                }
            });
        }
        
        // Датчик открывания двери
        const mobileSensor = document.getElementById('mobile-door-sensor-enabled');
        if (mobileSensor) {
            mobileSensor.addEventListener('change', (e) => {
                this.additionalParams.sensor = e.target.checked;
                this.updateTotalPrice();
                // Синхронизируем с десктопом
                const desktopSensor = document.getElementById('door-sensor-enabled');
                if (desktopSensor) {
                    desktopSensor.checked = e.target.checked;
                }
            });
        }
        
        // Сборка
        const mobileAssembly = document.getElementById('mobile-assembly-enabled');
        if (mobileAssembly) {
            mobileAssembly.addEventListener('change', (e) => {
                this.additionalParams.assembly = e.target.checked;
                this.updateTotalPrice();
                // Синхронизируем с десктопом
                const desktopAssembly = document.getElementById('assembly-enabled');
                if (desktopAssembly) {
                    desktopAssembly.checked = e.target.checked;
                }
            });
        }
    }
    
    // Инициализация мобильных кнопок действий
    initMobileActionButtons() {
        // Все кнопки заказать
        const orderButtons = [
            'mobile-order-button-params',
            'mobile-order-button-size', 
            'mobile-order-button-color',
            'mobile-order-button-doors',
            'mobile-order-button'  // Основная кнопка в табе "Дополнительно"
        ];
        
        // Все кнопки сохранить
        const saveButtons = [
            'mobile-save-button-params',
            'mobile-save-button-size',
            'mobile-save-button-color', 
            'mobile-save-button-doors',
            'mobile-save-button'  // Основная кнопка в табе "Дополнительно"
        ];
        
        // Добавляем обработчики для всех кнопок заказать
        orderButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    this.handleOrder();
                });
            }
        });
        
        // Добавляем обработчики для всех кнопок сохранить
        saveButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    this.handleSaveImage();
                });
            }
        });
        
        console.log('Мобильные кнопки действий инициализированы');
    }
    
    // Синхронизация кнопок цветов между десктопом и мобилом
    syncColorButtons(activeColor) {
        // Обновляем десктопные кнопки
        document.querySelectorAll('.color-button').forEach(button => {
            button.classList.toggle('active', button.dataset.color === activeColor);
        });
        // Обновляем мобильные кнопки
        document.querySelectorAll('.mobile-color-button').forEach(button => {
            button.classList.toggle('active', button.dataset.color === activeColor);
        });
    }
    
    // Синхронизация кнопок цветов дверей между десктопом и мобилом
    syncDoorColorButtons(activeColor) {
        // Обновляем десктопные кнопки
        document.querySelectorAll('.door-color-button').forEach(button => {
            button.classList.toggle('active', button.dataset.doorColor === activeColor);
        });
        // Обновляем мобильные кнопки
        document.querySelectorAll('.mobile-door-color-button').forEach(button => {
            button.classList.toggle('active', button.dataset.doorColor === activeColor);
        });
    }
    
    // Обновление мобильных элементов при изменениях
    updateMobileElements() {
        // Обновляем цену
        const mobilePriceElement = document.getElementById('mobile-total-price');
        const desktopPriceElement = document.getElementById('total-price');
        if (mobilePriceElement && desktopPriceElement) {
            mobilePriceElement.textContent = desktopPriceElement.textContent;
        }
        
        // Обновляем размеры
        const mobileDimensionsElement = document.getElementById('mobile-cabinet-dimensions');
        const desktopDimensionsElement = document.getElementById('cabinet-dimensions');
        if (mobileDimensionsElement && desktopDimensionsElement) {
            mobileDimensionsElement.textContent = desktopDimensionsElement.textContent;
        }
        
        // Обновляем контролы активной секции
        this.updateMobileSectionControls();
    }
    
    // Обновление мобильных контролов секции
    updateMobileSectionControls() {
        const mobileContainer = document.getElementById('mobile-section-controls');
        const desktopContainer = document.getElementById('section-controls');
        
        if (!mobileContainer || !desktopContainer) return;
        
        // Обновляем бегунок ширины для мобильной версии
        this.updateMobileWidthControls();
        
        // Копируем содержимое десктопных контролов в мобильные
        const desktopVariantsDropdown = desktopContainer.querySelector('.variants-dropdown');
        if (desktopVariantsDropdown) {
            // Создаем мобильную версию селектора вариантов
            let mobileVariantsDropdown = mobileContainer.querySelector('.mobile-variants-dropdown');
            if (!mobileVariantsDropdown) {
                mobileVariantsDropdown = document.createElement('div');
                mobileVariantsDropdown.className = 'mobile-variants-dropdown';
                mobileContainer.appendChild(mobileVariantsDropdown);
            }
            
            const select = desktopVariantsDropdown.querySelector('select');
            if (select) {
                mobileVariantsDropdown.innerHTML = `
                    ${select.outerHTML.replace('id="', 'id="mobile-')}
                `;
                
                // Добавляем обработчик для мобильного селектора
                const mobileSelect = mobileVariantsDropdown.querySelector('select');
                if (mobileSelect) {
                    // Синхронизируем значение сразу при создании
                    const sectionData = this.sections.get(this.activeSection);
                    if (sectionData && sectionData.currentVariant) {
                        // Если уже есть выбранный вариант, удаляем placeholder и устанавливаем значение
                        const placeholderOption = mobileSelect.querySelector('option[value=""]');
                        if (placeholderOption) {
                            placeholderOption.remove();
                        }
                        mobileSelect.value = sectionData.currentVariant.id;
                        this.firstInteractionWithVariants = false;
                    }
                    
                    // Обработчик для удаления placeholder при первом взаимодействии
                    const removeMobilePlaceholder = () => {
                        if (this.firstInteractionWithVariants) {
                            const placeholderOption = mobileSelect.querySelector('option[value=""]');
                            if (placeholderOption) {
                                placeholderOption.remove();
                            }
                            this.firstInteractionWithVariants = false;
                            
                            // Устанавливаем текущий вариант как selected
                            const sectionData = this.sections.get(this.activeSection);
                            if (sectionData && sectionData.currentVariant) {
                                mobileSelect.value = sectionData.currentVariant.id;
                            }
                        }
                        // Удаляем этот обработчик после первого использования
                        mobileSelect.removeEventListener('focus', removeMobilePlaceholder);
                        mobileSelect.removeEventListener('click', removeMobilePlaceholder);
                    };
                    
                    mobileSelect.addEventListener('focus', removeMobilePlaceholder);
                    mobileSelect.addEventListener('click', removeMobilePlaceholder);
                    
                    mobileSelect.addEventListener('change', (e) => {
                        // Синхронизируем с десктопным селектором
                        select.value = e.target.value;
                        select.dispatchEvent(new Event('change'));
                        
                        // Обновляем мобильные элементы после изменения
                        setTimeout(() => {
                            this.updateMobileElements();
                        }, 50);
                    });
                }
            }
        }
    }
    
    // Обновление мобильного бегунка ширины
    updateMobileWidthControls() {
        if (!this.activeSection) return;
        
        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;
        
        const mobileWidthSlider = document.getElementById('mobile-width-slider');
        const mobileWidthDisplay = document.getElementById('mobile-width-display');
        
        if (mobileWidthSlider && mobileWidthDisplay) {
            // Настраиваем диапазоны бегунка в пикселях (как в десктопе)
            mobileWidthSlider.min = sectionData.config.minWidth;
            mobileWidthSlider.max = sectionData.config.maxWidth;
            mobileWidthSlider.value = sectionData.currentWidth;
            
            // Настраиваем поле ввода в миллиметрах
            mobileWidthDisplay.value = this.pixelsToMillimeters(sectionData.currentWidth, this.activeSection);
            mobileWidthDisplay.dataset.min = this.pixelsToMillimeters(sectionData.config.minWidth, this.activeSection);
            mobileWidthDisplay.dataset.max = this.pixelsToMillimeters(sectionData.config.maxWidth, this.activeSection);
            
            console.log(`Мобильный бегунок ширины обновлен для ${this.activeSection}:`, {
                minPx: sectionData.config.minWidth,
                maxPx: sectionData.config.maxWidth,
                currentPx: sectionData.currentWidth,
                minMm: this.pixelsToMillimeters(sectionData.config.minWidth, this.activeSection),
                maxMm: this.pixelsToMillimeters(sectionData.config.maxWidth, this.activeSection),
                currentMm: this.pixelsToMillimeters(sectionData.currentWidth, this.activeSection)
            });
        }
    }

    // Инициализация обработчиков событий для дверей
    initDoorsEventListeners() {
        // Цветовые кнопки дверей
        const doorColorButtons = document.querySelectorAll('.door-color-button');
        doorColorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newColor = e.target.dataset.doorColor;
                if (newColor) {
                    this.changeDoorColor(newColor);
                }
            });
        });

        console.log('Обработчики событий дверей инициализированы');
    }

    // Изменение цвета дверей
    changeDoorColor(newColor) {
        if (this.doorsSettings.color === newColor) return;

        console.log('Смена цвета дверей с', this.doorsSettings.color, 'на', newColor);
        
        // Обновляем настройки дверей
        this.doorsSettings.color = newColor;
        
        // Обновляем активную кнопку цвета (десктоп и мобиль)
        this.syncDoorColorButtons(newColor);
        
        // Обновляем изображения всех дверей
        if (this.doorsEnabled) {
            this.updateAllDoors();
        }
        
        console.log('Цвет дверей изменен на:', newColor);
    }



    loadLayout(layoutId) {
        if (!this.layouts || !this.layouts.layouts[layoutId]) {
            console.error('Макет не найден:', layoutId);
            return;
        }

        this.currentLayout = layoutId;
        const layoutConfig = this.layouts.layouts[layoutId];

        // Сбрасываем флаг для показа placeholder в селекторе вариантов
        this.firstInteractionWithVariants = true;

        // Обновляем селектор количества секций
        const layoutSelect = document.getElementById('layout-select');
        if (layoutSelect) {
            layoutSelect.value = layoutId;
        }

        console.log('Загружаем макет:', layoutId, layoutConfig);

        // Обновляем CSS класс
        this.updateLayoutClass(layoutConfig.cssClass);

        // Очищаем существующие секции
        this.clearSections();
        
        // Очищаем существующие двери
        this.clearDoors();

        // Создаем секции
        this.createSections(layoutConfig.sections);

        // Создаем табы секций
        this.createSectionTabs(layoutConfig.sections);

        // Применяем выравнивание секций сразу после создания
        this.adjustSectionsAlignment();

        // Устанавливаем первую секцию как активную
        if (layoutConfig.sections.length > 0) {
            this.setActiveSection(layoutConfig.sections[0].id);
        }

        // Инициализируем фоновые слои
        this.initializeBackgroundLayers();

        // Если двери были включены, пересоздаем их
        if (this.doorsEnabled) {
            this.createDoors();
        }

        // Обновляем отображение размера
        this.updateDimensionsDisplay();

        // Обновляем цену
        this.updateTotalPrice();

        console.log('Макет загружен:', layoutId);
    }

    // Инициализация hover эффектов для секции
    initSectionHoverEffects(sectionElement, sectionId) {
        const hoverContainer = document.getElementById('hover-effects-container');
        if (!hoverContainer) return;

        // Создаем элемент для hover эффекта
        const hoverEffect = document.createElement('div');
        hoverEffect.className = 'section-hover-effect';
        hoverEffect.id = `hover-${sectionId}`;
        hoverContainer.appendChild(hoverEffect);

        // Функция обновления позиции hover эффекта
        const updateHoverPosition = () => {
            const mainWindow = document.getElementById('main-window');
            const mainRect = mainWindow.getBoundingClientRect();
            const sectionRect = sectionElement.getBoundingClientRect();
            
            const left = sectionRect.left - mainRect.left;
            const top = sectionRect.top - mainRect.top;
            const width = sectionRect.width;
            const height = sectionRect.height;
            
            hoverEffect.style.left = `${left}px`;
            hoverEffect.style.top = `${top}px`;
            hoverEffect.style.width = `${width}px`;
            hoverEffect.style.height = `${height}px`;
        };

        // Обработчики hover
        sectionElement.addEventListener('mouseenter', () => {
            // Не показываем hover для активной секции
            if (sectionElement.classList.contains('active')) return;
            
            updateHoverPosition();
            hoverEffect.style.opacity = '1';
        });

        sectionElement.addEventListener('mouseleave', () => {
            hoverEffect.style.opacity = '0';
        });

        // Сохраняем ссылку на функцию обновления для использования при изменении размеров
        sectionElement._updateHover = updateHoverPosition;
    }

    updateLayoutClass(cssClass) {
        const container = document.getElementById('constructor-container');
        if (container) {
            // Удаляем все layout классы
            container.className = container.className.replace(/layout-\d+-section[s]?/g, '');
            // Добавляем новый класс
            container.classList.add(cssClass);
        }

        // Обновляем CSS файл
        const layoutStyles = document.getElementById('layout-styles');
        if (layoutStyles) {
            layoutStyles.href = `css/layouts/${cssClass}.css`;
        }
    }

    clearSections() {
        const sectionsContainer = document.getElementById('sections-container');
        if (sectionsContainer) {
            sectionsContainer.innerHTML = '';
        }
        
        // Очищаем hover эффекты
        const hoverContainer = document.getElementById('hover-effects-container');
        if (hoverContainer) {
            hoverContainer.innerHTML = '';
        }
        
        this.sections.clear();
        
        // Скрываем индикатор при очистке секций
        this.updateSectionIndicator();
    }

    createSections(sectionsConfig) {
        const sectionsContainer = document.getElementById('sections-container');
        if (!sectionsContainer) return;

        sectionsConfig.forEach(sectionConfig => {
            // Создаем DOM элемент секции
            const sectionElement = document.createElement('div');
            sectionElement.className = `section ${sectionConfig.id}`;
            sectionElement.id = sectionConfig.id;
            
            // Устанавливаем позицию и размер в процентах для адаптивности
            sectionElement.style.left = `${(sectionConfig.position.left / 3200) * 100}%`;
            sectionElement.style.top = `${(sectionConfig.position.top / 1919) * 100}%`;
            sectionElement.style.width = `${(sectionConfig.defaultSize.width / 3200) * 100}%`;
            sectionElement.style.height = `${(sectionConfig.defaultSize.height / 1919) * 100}%`;
            
            // Устанавливаем transform-origin из конфигурации
            sectionElement.style.transformOrigin = sectionConfig.transformOrigin;

            // Добавляем обработчик клика
            sectionElement.addEventListener('click', () => {
                this.setActiveSection(sectionConfig.id);
            });

            // Добавляем hover эффекты
            this.initSectionHoverEffects(sectionElement, sectionConfig.id);

            sectionsContainer.appendChild(sectionElement);
            
            // Сохраняем данные секции
            const sectionData = {
                element: sectionElement,
                config: sectionConfig,
                currentVariant: sectionConfig.variants[0], // Устанавливаем первый вариант как дефолтный
                currentWidth: sectionConfig.defaultSize.width
            };
            this.sections.set(sectionConfig.id, sectionData);

            // Устанавливаем первый вариант изображения с учетом размера
            if (sectionConfig.variants && sectionConfig.variants.length > 0) {
                this.updateSectionImage(sectionData);
            }
        });
    }

    createSectionTabs(sectionsConfig) {
        const tabsContainer = document.getElementById('sections-tabs');
        if (!tabsContainer) return;

        tabsContainer.innerHTML = '';

        sectionsConfig.forEach(sectionConfig => {
            const tab = document.createElement('div');
            tab.className = 'section-tab';
            tab.textContent = sectionConfig.name;
            tab.dataset.sectionId = sectionConfig.id;
            
            tab.addEventListener('click', () => {
                this.setActiveSection(sectionConfig.id);
            });

            tabsContainer.appendChild(tab);
        });
    }

    setActiveSection(sectionId) {
        // Снимаем активность с всех секций
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Активируем выбранную секцию
        const sectionElement = document.getElementById(sectionId);
        const sectionTab = document.querySelector(`[data-section-id="${sectionId}"]`);
        
        if (sectionElement) sectionElement.classList.add('active');
        if (sectionTab) sectionTab.classList.add('active');

        this.activeSection = sectionId;
        
        // Обновляем контролы
        this.updateSectionControls();
        
        // Обновляем позицию индикатора
        this.updateSectionIndicator();
        
        // Обновляем мобильные элементы для полной синхронизации
        this.updateMobileElements();
    }

    // Обновление позиции индикатора для активной секции
    updateSectionIndicator() {
        const indicator = document.getElementById('section-indicator');
        if (!indicator) return;

        if (!this.activeSection) {
            indicator.classList.remove('active');
            return;
        }

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) {
            indicator.classList.remove('active');
            return;
        }

        const sectionElement = sectionData.element;
        if (!sectionElement) {
            indicator.classList.remove('active');
            return;
        }

        // Получаем позицию секции относительно main-window
        const mainWindow = document.getElementById('main-window');
        const mainRect = mainWindow.getBoundingClientRect();
        const sectionRect = sectionElement.getBoundingClientRect();
        
        // Вычисляем позицию относительно main-window
        const centerX = sectionRect.left - mainRect.left + sectionRect.width / 2;
        const topY = sectionRect.top - mainRect.top - 50; // 50px выше секции

        // Позиционируем индикатор
        indicator.style.left = `${centerX - 4}px`; // -4px чтобы центрировать кружок 8px
        indicator.style.top = `${topY}px`;
        indicator.classList.add('active');
    }

    updateSectionControls() {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        const controlsContainer = document.getElementById('section-controls');
        if (!controlsContainer) return;

        controlsContainer.innerHTML = `
            <div class="variants-dropdown">
                <div class="variants-dropdown-row">
                    <select id="variant-select">
                        <option value="" disabled ${this.firstInteractionWithVariants ? 'selected' : ''}>Выберите вариант секции</option>
                        ${sectionData.config.variants.map(variant => 
                            `<option value="${variant.id}" ${!this.firstInteractionWithVariants && sectionData.currentVariant && variant.id === sectionData.currentVariant.id ? 'selected' : ''}>
                                ${variant.name}
                            </option>`
                        ).join('')}
                    </select>
                    <span class="help-icon" data-tooltip-file="variant-info.txt">?</span>
                </div>
            </div>

            <div class="width-control">
                <label>Ширина секции:</label>
                <div class="width-slider-container">
                    <input type="range" 
                           class="width-slider" 
                           id="width-slider"
                           min="${sectionData.config.minWidth}" 
                           max="${sectionData.config.maxWidth}" 
                           value="${sectionData.currentWidth}">
                    <input type="text" 
                           class="width-display" 
                           id="width-display"
                           value="${this.pixelsToMillimeters(sectionData.currentWidth, this.activeSection)}"
                           data-min="${this.pixelsToMillimeters(sectionData.config.minWidth, this.activeSection)}" 
                           data-max="${this.pixelsToMillimeters(sectionData.config.maxWidth, this.activeSection)}">
                    <span style="font-size: 12px; color: #495057;">мм</span>
                </div>
            </div>

            <div class="height-control">
                <label>Высота шкафа:</label>
                <div class="height-slider-container">
                    <input type="range" 
                           class="height-slider" 
                           id="height-slider"
                           min="2400" 
                           max="2800" 
                           value="${this.globalSettings.sectionHeight}">
                    <input type="text" 
                           class="height-display" 
                           id="height-display"
                           value="${this.globalSettings.sectionHeight}"
                           data-min="2400" 
                           data-max="2800">
                    <span style="font-size: 12px; color: #495057;">мм</span>
                </div>
            </div>

            <div class="color-selector">
                <div class="color-buttons" id="color-buttons">
                    <button class="color-button ${this.currentColor === 'c1' ? 'active' : ''}" data-color="c1" title="Цвет 1"></button>
                    <button class="color-button ${this.currentColor === 'c2' ? 'active' : ''}" data-color="c2" title="Цвет 2"></button>
                    <button class="color-button ${this.currentColor === 'c3' ? 'active' : ''}" data-color="c3" title="Цвет 3"></button>
                    <button class="color-button ${this.currentColor === 'c4' ? 'active' : ''}" data-color="c4" title="Цвет 4"></button>
                    <button class="color-button ${this.currentColor === 'c5' ? 'active' : ''}" data-color="c5" title="Цвет 5"></button>
                    <span class="help-icon" data-tooltip-file="color-info.txt">?</span>
                </div>
            </div>
        `;

        // Добавляем обработчики событий
        this.initSectionControlsEvents();
        
        // Синхронизируем мобильную панель
        this.updateMobileSectionControls();
    }

    initSectionControlsEvents() {
        const variantSelect = document.getElementById('variant-select');
        const widthSlider = document.getElementById('width-slider');
        const widthDisplay = document.getElementById('width-display');
        const heightSlider = document.getElementById('height-slider');
        const heightDisplay = document.getElementById('height-display');

        if (variantSelect) {
            // Обработчик для удаления placeholder при первом взаимодействии
            const removeVariantPlaceholder = () => {
                if (this.firstInteractionWithVariants) {
                    const placeholderOption = variantSelect.querySelector('option[value=""]');
                    if (placeholderOption) {
                        placeholderOption.remove();
                    }
                    this.firstInteractionWithVariants = false;
                    
                    // Устанавливаем текущий вариант как selected
                    const sectionData = this.sections.get(this.activeSection);
                    if (sectionData && sectionData.currentVariant) {
                        variantSelect.value = sectionData.currentVariant.id;
                    }
                }
                // Удаляем этот обработчик после первого использования
                variantSelect.removeEventListener('focus', removeVariantPlaceholder);
                variantSelect.removeEventListener('click', removeVariantPlaceholder);
            };
            
            variantSelect.addEventListener('focus', removeVariantPlaceholder);
            variantSelect.addEventListener('click', removeVariantPlaceholder);
            
            variantSelect.addEventListener('change', (e) => {
                this.changeVariant(e.target.value);
            });
        }

        if (widthSlider) {
            widthSlider.addEventListener('input', (e) => {
                this.changeWidth(parseInt(e.target.value));
            });
        }

        if (widthDisplay) {
            this.initInputField(widthDisplay, (value) => {
                const pixels = this.millimetersToPixels(value, this.activeSection);
                this.changeWidth(pixels);
                if (widthSlider) widthSlider.value = pixels;
            });
        }

        if (heightSlider) {
            // Активируем слайдер при первом взаимодействии
            heightSlider.addEventListener('mousedown', () => {
                this.activateSlider(heightSlider);
            });
            
            heightSlider.addEventListener('input', (e) => {
                this.activateSlider(heightSlider);
                this.changeHeight(parseInt(e.target.value));
            });
        }

        if (heightDisplay) {
            this.initInputField(heightDisplay, (value) => {
                this.changeHeight(value);
                if (heightSlider) {
                    heightSlider.value = value;
                    this.activateSlider(heightSlider);
                }
            });
        }



        // Инициализируем цветовые кнопки
        this.initColorButtons();
    }

    // Инициализация цветовых кнопок
    initColorButtons() {
        const colorButtons = document.querySelectorAll('.color-button');
        colorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newColor = e.target.dataset.color;
                if (newColor) {
                    this.changeColor(newColor);
                }
            });
        });
    }

    changeVariant(variantId) {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        const variant = sectionData.config.variants.find(v => v.id === variantId);
        if (!variant) return;
        
        // Сохраняем выбранный вариант
        sectionData.currentVariant = variant;

        // Обновляем изображение с учетом текущего размера секции
        this.updateSectionImage(sectionData);

        // Обновляем соответствующую дверь, если двери включены
        if (this.doorsEnabled) {
            this.updateDoor(this.activeSection);
        }

        // Обновляем цену
        this.updateTotalPrice();
        
        // Обновляем мобильные элементы для синхронизации
        this.updateMobileElements();

        console.log(`Изменен вариант секции ${this.activeSection} на ${variant.name}`);
    }

    changeColor(newColor) {
        if (this.currentColor === newColor) return;

        console.log('Смена цвета с', this.currentColor, 'на', newColor);
        
        // Обновляем текущий цвет
        this.currentColor = newColor;
        
        // Обновляем активную кнопку цвета (десктоп и мобиль)
        this.syncColorButtons(newColor);
        
        // Обновляем изображения всех секций с сохранением выбранных вариантов
        this.sections.forEach((sectionData, sectionId) => {
            this.updateSectionImage(sectionData);
        });
        
        // Обновляем все двери, если двери включены
        if (this.doorsEnabled) {
            this.updateAllDoors();
        }
        
        // Обновляем отображение размера (на случай если были двери)
        this.updateDimensionsDisplay();
        
        // Обновляем цену (пока цвет не влияет на цену, но для полноты)
        this.updateTotalPrice();
        
        console.log('Цвет изменен на:', newColor);
    }

    // Обновление изображения секции с учетом её размера
    updateSectionImage(sectionData) {
        if (!sectionData || !sectionData.currentVariant) return;

        // Определяем размер секции в миллиметрах
        const sectionId = Array.from(this.sections.entries()).find(([id, data]) => data === sectionData)?.[0];
        const sectionWidthMm = this.pixelsToMillimeters(sectionData.currentWidth, sectionId);
        
        // Получаем оптимальный размер изображения
        const optimalSize = ConfigUtils.getOptimalImageSize(sectionWidthMm);
        
        // Заменяем цвет в названии изображения на текущий выбранный цвет
        const imageNameWithColor = sectionData.currentVariant.image.replace(/c\d+/, this.currentColor);
        
        // Генерируем путь к изображению нужного размера
        const optimizedImageName = ConfigUtils.getImagePath(imageNameWithColor, optimalSize);
        const imagePath = `${sectionData.config.imagePath}${optimizedImageName}`;
        
        // Применяем изображение
        sectionData.element.style.backgroundImage = `url('${imagePath}')`;
        
        // Устанавливаем подходящий background-size в зависимости от размера изображения
        if (optimalSize === CONFIG.IMAGES.SMALL_SIZE) {
            // Для изображений 700: растягиваем точно по размерам блока (ширина и высота)
            sectionData.element.style.backgroundSize = '100% 100%';
        } else {
            // Для изображений 1000: вписываем в контейнер с сохранением пропорций
            sectionData.element.style.backgroundSize = 'contain';
        }
        
        ConfigUtils.log('debug', `Секция ${sectionData.config.id}: размер ${sectionWidthMm}мм, цвет ${this.currentColor}, используется изображение ${optimalSize} (${optimizedImageName}), background-size: ${sectionData.element.style.backgroundSize}`);
    }

    changeWidth(newWidth) {
        if (!this.activeSection) return;

        const sectionData = this.sections.get(this.activeSection);
        if (!sectionData) return;

        // Обновляем ширину секции
        sectionData.currentWidth = newWidth;
        
        // Применяем масштабирование к элементу секции
        const scale = newWidth / sectionData.config.defaultSize.width;
        sectionData.element.style.transform = `scaleX(${scale})`;

        // Обновляем отображение ширины в миллиметрах
        const widthDisplay = document.getElementById('width-display');
        if (widthDisplay) {
            widthDisplay.value = this.pixelsToMillimeters(newWidth, this.activeSection);
        }
        
        // Синхронизируем мобильные элементы
        const mobileWidthSlider = document.getElementById('mobile-width-slider');
        const mobileWidthDisplay = document.getElementById('mobile-width-display');
        if (mobileWidthSlider) {
            mobileWidthSlider.value = newWidth; // Мобильный бегунок работает в пикселях
        }
        if (mobileWidthDisplay) {
            mobileWidthDisplay.value = this.pixelsToMillimeters(newWidth, this.activeSection); // Поле ввода в миллиметрах
        }

        // Обновляем изображение секции
        this.updateSectionImage(sectionData);

        // Применяем система выравнивания секций
        this.adjustSectionsAlignment();

        // Обновляем соответствующую дверь, если двери включены
        if (this.doorsEnabled) {
            this.updateDoor(this.activeSection);
        }

        // Обновляем отображение размера
        this.updateDimensionsDisplay();

        // Обновляем цену
        this.updateTotalPrice();

        // Обновляем позицию индикатора с небольшой задержкой для плавности
        setTimeout(() => {
            this.updateSectionIndicator();
            // Обновляем позицию hover эффекта
            if (sectionData.element._updateHover) {
                sectionData.element._updateHover();
            }
        }, 50);

        console.log(`Ширина секции ${this.activeSection} изменена на ${newWidth}px`);
    }

    changeHeight(newHeight) {
        // Сохраняем высоту в глобальных настройках
        this.globalSettings.sectionHeight = newHeight;

        // Обновляем отображение высоты
        const heightDisplay = document.getElementById('height-display');
        if (heightDisplay) {
            heightDisplay.value = newHeight;
        }
        
        // Синхронизируем мобильные элементы
        const mobileHeightSlider = document.getElementById('mobile-height-slider');
        const mobileHeightDisplay = document.getElementById('mobile-height-display');
        if (mobileHeightSlider) {
            mobileHeightSlider.value = newHeight;
        }
        if (mobileHeightDisplay) {
            mobileHeightDisplay.value = newHeight;
        }

        // Обновляем отображение размера
        this.updateDimensionsDisplay();

        // Обновляем цену
        this.updateTotalPrice();

        console.log(`Высота шкафа изменена на ${newHeight}мм`);
    }

    toggleCustomDepth(isEnabled) {
        const depthSliderContainer = document.getElementById('depth-slider-container');
        if (depthSliderContainer) {
            depthSliderContainer.style.display = isEnabled ? 'block' : 'none';
        }

        // Синхронизируем мобильную панель
        const mobileDepthSliderContainer = document.getElementById('mobile-depth-slider-container');
        if (mobileDepthSliderContainer) {
            mobileDepthSliderContainer.style.display = isEnabled ? 'block' : 'none';
        }

        // Сохраняем в глобальных настройках
        this.globalSettings.customDepthEnabled = isEnabled;

        // Обновляем цену
        this.updateTotalPrice();

        console.log(`Нестандартная глубина: ${isEnabled ? 'включена' : 'выключена'}`);
    }



    changeDepth(newDepth) {
        // Сохраняем глубину в глобальных настройках
        this.globalSettings.sectionDepth = newDepth;

        // Обновляем отображение глубины
        const depthDisplay = document.getElementById('depth-display');
        if (depthDisplay) {
            depthDisplay.value = newDepth;
        }
        
        // Синхронизируем мобильные элементы
        const mobileDepthSlider = document.getElementById('mobile-depth-slider');
        const mobileDepthDisplay = document.getElementById('mobile-depth-display');
        if (mobileDepthSlider) {
            mobileDepthSlider.value = newDepth;
        }
        if (mobileDepthDisplay) {
            mobileDepthDisplay.value = newDepth;
        }

        // Обновляем отображение размера
        this.updateDimensionsDisplay();

        // Обновляем цену
        this.updateTotalPrice();

        console.log(`Глубина секции изменена на ${newDepth}мм`);
    }

    // Активация слайдера (делает его визуально активным)
    activateSlider(slider) {
        if (slider && !slider.classList.contains('active')) {
            slider.classList.add('active');
        }
    }

    // Инициализация интерактивного поля ввода
    initInputField(inputElement, onChangeCallback) {
        const minValue = parseInt(inputElement.dataset.min);
        const maxValue = parseInt(inputElement.dataset.max);
        
        // Обработчик изменения значения
        const handleChange = () => {
            const value = parseInt(inputElement.value);
            
            // Убираем предыдущий tooltip если есть
            this.removeTooltip(inputElement);
            
            if (isNaN(value) || value < minValue || value > maxValue) {
                this.showTooltip(inputElement, `Диапазон: ${minValue}-${maxValue}мм`);
                return;
            }
            
            onChangeCallback(value);
        };

        // Валидация при потере фокуса
        inputElement.addEventListener('blur', handleChange);
        
        // Валидация при нажатии Enter
        inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChange();
                inputElement.blur();
            }
        });

        // Убираем tooltip при фокусе
        inputElement.addEventListener('focus', () => {
            this.removeTooltip(inputElement);
        });
    }

    // Показать tooltip с подсказкой
    showTooltip(inputElement, message) {
        // Убираем предыдущий tooltip
        this.removeTooltip(inputElement);
        
        const tooltip = document.createElement('div');
        tooltip.className = 'input-tooltip show';
        tooltip.textContent = message;
        tooltip.dataset.tooltip = 'true';
        
        inputElement.parentElement.appendChild(tooltip);
        
        // Автоматически убираем tooltip через 3 секунды
        setTimeout(() => {
            this.removeTooltip(inputElement);
        }, 3000);
    }

    // Убрать tooltip
    removeTooltip(inputElement) {
        const existingTooltip = inputElement.parentElement.querySelector('[data-tooltip="true"]');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }

    // Универсальная система выравнивания секций
    adjustSectionsAlignment() {
        if (this.currentLayout === '1-section') {
            this.adjustOneSectionAlignment();
        } else if (this.currentLayout === '2-sections') {
            this.adjustTwoSectionsAlignment();
        } else if (this.currentLayout === '3-sections') {
            this.adjustThreeSectionsAlignment();
        } else if (this.currentLayout === '4-sections') {
            this.adjustFourSectionsAlignment();
        } else {
            console.log('Система выравнивания пропущена для макета:', this.currentLayout);
        }
        
        // Обновляем все двери после изменения позиций секций
        if (this.doorsEnabled) {
            this.updateAllDoors();
        }
    }

    // Система выравнивания для 1-й секции
    adjustOneSectionAlignment() {
        const section1Data = this.sections.get('section-1');
        if (!section1Data) return;

        // Для односекционного варианта секция имеет transform-origin: center
        // Это означает что при масштабировании центр секции остается на месте
        // а левый и правый края изменяются равномерно
        
        // Исходные данные из конфигурации
        const originalLeft = section1Data.config.position.left; // 1062
        const originalWidth = section1Data.config.defaultSize.width; // 536
        
        // Центр секции (неизменный при transform-origin: center)
        const sectionCenter = originalLeft + (originalWidth / 2); // 1330
        
        // Вычисляем реальные границы секции после масштабирования
        const realHalfWidth = section1Data.currentWidth / 2;
        const realLeftEdge = sectionCenter - realHalfWidth;
        const realRightEdge = sectionCenter + realHalfWidth;

        // Позицию элемента НЕ изменяем! CSS сам управляет позиционированием через transform-origin: center
        // Обновляем только фоновые слои
        this.adjustOneSectionBackgrounds(realLeftEdge, section1Data.currentWidth);

        console.log('Выравнивание 1-секции (центр зафиксирован):', {
            'Секция 1': `${realLeftEdge.toFixed(0)}px - ${realRightEdge.toFixed(0)}px (ширина: ${section1Data.currentWidth}px), центр: ${sectionCenter}px`
        });
    }

    // Система выравнивания для 2-х секций
    adjustTwoSectionsAlignment() {
        const section1Data = this.sections.get('section-1');
        const section2Data = this.sections.get('section-2');

        if (!section1Data || !section2Data) return;

        // Для 2-секций: секции должны стоять вплотную друг к другу
        // section-1 (transform-origin: right): правый край фиксирован
        // section-2 (transform-origin: left): левый край прилегает к правому краю section-1

        // Исходные позиции и размеры из конфигурации
        const section1OriginalLeft = section1Data.config.position.left; // 746
        const section1OriginalWidth = section1Data.config.defaultSize.width; // 528
        const section1OriginalRight = section1OriginalLeft + section1OriginalWidth; // 1274

        // Вычисляем реальную ширину после масштабирования
        const section1Scale = section1Data.currentWidth / section1OriginalWidth;
        const section1RealWidth = section1OriginalWidth * section1Scale;

        // Левый край section-1 после масштабирования (при transform-origin: right)
        const section1RealLeft = section1OriginalRight - section1RealWidth;

        // section-2 должна начинаться сразу после section-1
        const section2NewLeft = section1OriginalRight; // Правый край исходной section-1

        // Применяем новую позицию для section-2
        const section2NewLeftPercent = (section2NewLeft / 3200) * 100;
        section2Data.element.style.left = `${section2NewLeftPercent}%`;
        section2Data.config.position.left = section2NewLeft;

        // Обновляем фоновые слои для 2-секций
        this.adjustTwoSectionsBackgrounds(section1RealLeft, section1RealWidth, section2Data.currentWidth, section2NewLeft);

        console.log('Выравнивание 2-секций:', {
            'Секция 1': `${section1RealLeft.toFixed(0)}px - ${section1OriginalRight}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Секция 2': `${section2NewLeft}px начало, ширина: ${section2Data.currentWidth}px`
        });
    }

    // Система выравнивания для 3-х секций (исходная логика)
    adjustThreeSectionsAlignment() {
        const section1Data = this.sections.get('section-1');
        const section2Data = this.sections.get('section-2');
        const section3Data = this.sections.get('section-3');

        if (!section1Data || !section2Data || !section3Data) return;

        // Получаем исходные позиции и размеры из конфигурации (только для 3-секций)
        const originalSection2Left = 956; // Исходная позиция центральной секции в 3-секционном макете
        const originalSection2Width = 520; // Исходная ширина центральной секции в 3-секционном макете
        
        // Центр центральной секции всегда зафиксирован
        const section2Center = originalSection2Left + (originalSection2Width / 2);
        
        // Рассчитываем реальные края центральной секции
        const section2HalfWidth = section2Data.currentWidth / 2;
        const section2LeftEdge = section2Center - section2HalfWidth;
        const section2RightEdge = section2Center + section2HalfWidth;

        // Левая секция: её правый край должен плотно прилегать к левому краю центральной
        // При transform-origin: right правый край остается неподвижным при масштабировании
        const section1RightEdge = section2LeftEdge;
        const section1OriginalWidth = section1Data.config.defaultSize.width;
        const section1Scale = section1Data.currentWidth / section1OriginalWidth;
        const section1RealWidth = section1OriginalWidth * section1Scale;
        
        // Для transform-origin: right позиционируем по правому краю
        // Левый край элемента = правый край - исходная ширина (DOM позиция не меняется при scale)
        const section1LeftEdge = section1RightEdge - section1OriginalWidth;
        
        // Правая секция: её левый край должен плотно прилегать к правому краю центральной  
        // При transform-origin: left левый край остается на месте, поэтому позиционируем по левому краю
        const section3LeftEdge = section2RightEdge;

        // Функция для мгновенного перемещения секции (без анимации)
        const animateSection = (sectionData, newLeftPx) => {
            const newLeftPercent = (newLeftPx / 3200) * 100;
            sectionData.element.style.left = `${newLeftPercent}%`;
            
            // Обновляем позицию в конфигурации
            sectionData.config.position.left = newLeftPx;
        };

        // Применяем новые позиции
        animateSection(section1Data, section1LeftEdge);
        animateSection(section3Data, section3LeftEdge);

        // Вычисляем реальную позицию левой секции после масштабирования
        const section1RealLeftEdge = section1RightEdge - section1RealWidth;
        
        // Обновляем фоновые слои
        this.adjustBackgroundLayers(section1RealLeftEdge, section1RealWidth, section2Data.currentWidth, section3Data.currentWidth, section3LeftEdge);
    }

    // Система выравнивания для 4-х секций
    adjustFourSectionsAlignment() {
        const section1Data = this.sections.get('section-1');
        const section2Data = this.sections.get('section-2');
        const section3Data = this.sections.get('section-3');
        const section4Data = this.sections.get('section-4');

        if (!section1Data || !section2Data || !section3Data || !section4Data) return;

        // Фиксированный центр ТОЛЬКО для section-2 (как в 3-секционном макете)
        const originalSection2Left = 666; // Исходная позиция второй секции
        const originalSection2Width = 520; // Исходная ширина второй секции
        const section2Center = originalSection2Left + (originalSection2Width / 2); // Центр второй секции
        
        // Вычисляем реальные края секции 2 (с фиксированным центром)
        const section2HalfWidth = section2Data.currentWidth / 2;
        const section2LeftEdge = section2Center - section2HalfWidth;
        const section2RightEdge = section2Center + section2HalfWidth;

        // Секция 1: её правый край должен плотно прилегать к левому краю секции 2
        const section1RightEdge = section2LeftEdge;
        const section1OriginalWidth = section1Data.config.defaultSize.width;
        const section1Scale = section1Data.currentWidth / section1OriginalWidth;
        const section1RealWidth = section1OriginalWidth * section1Scale;
        
        // Для transform-origin: right позиционируем по правому краю
        const section1NewLeftEdge = section1RightEdge - section1OriginalWidth;
        
        // Секция 3: её левый край должен плотно прилегать к правому краю секции 2
        // При transform-origin: left левый край остается на месте
        const section3NewLeftEdge = section2RightEdge;
        
        // Секция 4: её левый край должен плотно прилегать к правому краю секции 3
        const section3OriginalWidth = section3Data.config.defaultSize.width;
        const section3Scale = section3Data.currentWidth / section3OriginalWidth;
        const section3RealWidth = section3OriginalWidth * section3Scale;
        const section4NewLeftEdge = section3NewLeftEdge + section3RealWidth;

        // Функция для мгновенного перемещения секции
        const animateSection = (sectionData, newLeftPx) => {
            const newLeftPercent = (newLeftPx / 3200) * 100;
            sectionData.element.style.left = `${newLeftPercent}%`;
            sectionData.config.position.left = newLeftPx;
        };

        // Применяем новые позиции (только section-2 не двигается, у неё центр зафиксирован)
        animateSection(section1Data, section1NewLeftEdge);
        animateSection(section3Data, section3NewLeftEdge);
        animateSection(section4Data, section4NewLeftEdge);

        // Вычисляем реальную позицию левой секции после масштабирования
        const section1RealLeftEdge = section1RightEdge - section1RealWidth;
        
        // Обновляем фоновые слои для 4-секций
        this.adjustFourSectionsBackgrounds(section1RealLeftEdge, section1RealWidth, section2Data.currentWidth, section3Data.currentWidth, section4Data.currentWidth, section3NewLeftEdge, section4NewLeftEdge);

        console.log('Выравнивание 4-секций:', {
            'Секция 1': `${section1RealLeftEdge.toFixed(0)}px - ${section1RightEdge}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Секция 2': `Центр: ${section2Center}px, ${section2LeftEdge.toFixed(0)}px - ${section2RightEdge.toFixed(0)}px (ширина: ${section2Data.currentWidth}px)`,
            'Секция 3': `${section3NewLeftEdge}px - ${(section3NewLeftEdge + section3RealWidth).toFixed(0)}px (ширина: ${section3RealWidth.toFixed(0)}px)`,
            'Секция 4': `${section4NewLeftEdge}px начало, ширина: ${section4Data.currentWidth}px`
        });
    }

    // Система динамического масштабирования и позиционирования фоновых слоев
    adjustBackgroundLayers(section1LeftEdge, section1RealWidth, section2Width, section3Width, section3LeftEdge) {
        const backgroundLeft = document.getElementById('background-left');
        const backgroundCenter = document.getElementById('background-center');
        const backgroundRight = document.getElementById('background-right');

        if (!backgroundLeft || !backgroundCenter || !backgroundRight) return;

        // Вычисляем реальные края секций (только для 3-секционного макета)
        const section2Scale = section2Width / 520; // Масштаб центральной секции в 3-секционном макете
        const section3Scale = section3Width / 528; // Масштаб правой секции

        // Реальные размеры секций после масштабирования (section1RealWidth уже передана)
        const section2RealWidth = 520 * section2Scale;
        const section3RealWidth = 528 * section3Scale;

        // Позиции краев секций
        const section1RightEdge = section1LeftEdge + section1RealWidth;
        const section3RightEdge = section3LeftEdge + section3RealWidth;

        // 1. ЛЕВЫЙ ФОН: привязывается к левому краю левой секции
        const leftBgLeftEdge = 0; // Левый край левого фона всегда в позиции 0
        const leftBgRightEdge = section1LeftEdge; // Правый край левого фона = левый край секции 1
        const leftBgWidth = leftBgRightEdge - leftBgLeftEdge; // Ширина = от 0 до левого края секции 1
        const leftBgLeftPercent = (leftBgLeftEdge / 3200) * 100;
        const leftBgWidthPercent = (leftBgWidth / 3200) * 100;
        
        backgroundLeft.style.left = `${leftBgLeftPercent}%`;
        backgroundLeft.style.width = `${leftBgWidthPercent}%`;

        // 2. ЦЕНТРАЛЬНЫЙ ФОН: привязывается к внешним краям крайних секций
        const centerBgLeftEdge = section1LeftEdge; // Левый край = левый край секции 1
        const centerBgRightEdge = section3RightEdge; // Правый край = правый край секции 3
        const centerBgWidth = centerBgRightEdge - centerBgLeftEdge; // Общая ширина всех секций
        const centerBgLeftPercent = (centerBgLeftEdge / 3200) * 100;
        const centerBgWidthPercent = (centerBgWidth / 3200) * 100;

        // Просто меняем размер и позицию контейнера, фон растянется автоматически
        backgroundCenter.style.left = `${centerBgLeftPercent}%`;
        backgroundCenter.style.width = `${centerBgWidthPercent}%`;
        backgroundCenter.style.transform = 'none'; // Убираем масштабирование

        // 3. ПРАВЫЙ ФОН: привязывается к правому краю правой секции
        const rightBgLeftEdge = section3RightEdge; // Левый край правого фона = правый край секции 3
        const rightBgWidth = 3200 - rightBgLeftEdge; // Ширина = от правого края секции 3 до края (3200px)
        const rightBgLeftPercent = (rightBgLeftEdge / 3200) * 100;
        const rightBgWidthPercent = (rightBgWidth / 3200) * 100;
        
        backgroundRight.style.left = `${rightBgLeftPercent}%`;
        backgroundRight.style.width = `${rightBgWidthPercent}%`;

        // Убираем переходы для мгновенного обновления фоновых слоев
        [backgroundLeft, backgroundCenter, backgroundRight].forEach(bg => {
            bg.style.transition = 'none';
        });

        console.log('Фоновые слои обновлены:', {
            'Секция 1': `${section1LeftEdge.toFixed(0)}px - ${(section1LeftEdge + section1RealWidth).toFixed(0)}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Левый фон': `${leftBgLeftPercent.toFixed(2)}% ширина: ${leftBgWidthPercent.toFixed(2)}%`,
            'Центр фон': `${centerBgLeftPercent.toFixed(2)}% ширина: ${centerBgWidthPercent.toFixed(2)}%`,
            'Правый фон': `${rightBgLeftPercent.toFixed(2)}% ширина: ${rightBgWidthPercent.toFixed(2)}%`
        });
    }

    // Система фоновых слоев для 2-х секций
    adjustTwoSectionsBackgrounds(section1RealLeft, section1RealWidth, section2Width, section2Left) {
        const backgroundLeft = document.getElementById('background-left');
        const backgroundCenter = document.getElementById('background-center');
        const backgroundRight = document.getElementById('background-right');

        if (!backgroundLeft || !backgroundCenter || !backgroundRight) return;

        // Вычисляем реальные размеры и позиции
        const section2OriginalWidth = 528; // Исходная ширина section-2 в 2-секционном макете
        const section2Scale = section2Width / section2OriginalWidth;
        const section2RealWidth = section2OriginalWidth * section2Scale;
        const section2RealRight = section2Left + section2RealWidth;

        // 1. ЛЕВЫЙ ФОН: от левого края (0) до левого края section-1
        const leftBgLeftEdge = 0;
        const leftBgRightEdge = section1RealLeft;
        const leftBgWidth = leftBgRightEdge - leftBgLeftEdge;
        const leftBgLeftPercent = (leftBgLeftEdge / 3200) * 100;
        const leftBgWidthPercent = (leftBgWidth / 3200) * 100;
        
        backgroundLeft.style.left = `${leftBgLeftPercent}%`;
        backgroundLeft.style.width = `${leftBgWidthPercent}%`;

        // 2. ЦЕНТРАЛЬНЫЙ ФОН: от левого края section-1 до правого края section-2
        const centerBgLeftEdge = section1RealLeft;
        const centerBgRightEdge = section2RealRight;
        const centerBgWidth = centerBgRightEdge - centerBgLeftEdge;
        const centerBgLeftPercent = (centerBgLeftEdge / 3200) * 100;
        const centerBgWidthPercent = (centerBgWidth / 3200) * 100;

        backgroundCenter.style.left = `${centerBgLeftPercent}%`;
        backgroundCenter.style.width = `${centerBgWidthPercent}%`;
        backgroundCenter.style.transform = 'none';

        // 3. ПРАВЫЙ ФОН: от правого края section-2 до правого края экрана (3200px)
        const rightBgLeftEdge = section2RealRight;
        const rightBgWidth = 3200 - rightBgLeftEdge;
        const rightBgLeftPercent = (rightBgLeftEdge / 3200) * 100;
        const rightBgWidthPercent = (rightBgWidth / 3200) * 100;
        
        backgroundRight.style.left = `${rightBgLeftPercent}%`;
        backgroundRight.style.width = `${rightBgWidthPercent}%`;

        // Убираем переходы для мгновенного обновления
        [backgroundLeft, backgroundCenter, backgroundRight].forEach(bg => {
            bg.style.transition = 'none';
        });

        console.log('Фоны 2-секций обновлены:', {
            'Секция 1': `${section1RealLeft.toFixed(0)}px - ${(section1RealLeft + section1RealWidth).toFixed(0)}px`,
            'Секция 2': `${section2Left}px - ${section2RealRight.toFixed(0)}px`,
            'Левый фон': `${leftBgLeftPercent.toFixed(2)}% ширина: ${leftBgWidthPercent.toFixed(2)}%`,
            'Центр фон': `${centerBgLeftPercent.toFixed(2)}% ширина: ${centerBgWidthPercent.toFixed(2)}%`,
            'Правый фон': `${rightBgLeftPercent.toFixed(2)}% ширина: ${rightBgWidthPercent.toFixed(2)}%`
        });
    }

    // Система фоновых слоев для 4-х секций
    adjustFourSectionsBackgrounds(section1LeftEdge, section1RealWidth, section2Width, section3Width, section4Width, section3LeftEdge, section4LeftEdge) {
        const backgroundLeft = document.getElementById('background-left');
        const backgroundCenter = document.getElementById('background-center');
        const backgroundRight = document.getElementById('background-right');

        if (!backgroundLeft || !backgroundCenter || !backgroundRight) return;

        // Вычисляем реальные размеры секций после масштабирования
        const section2Scale = section2Width / 520; // Масштаб центральной секции
        const section3Scale = section3Width / 528; // Масштаб третьей секции
        const section4Scale = section4Width / 520; // Масштаб четвертой секции

        const section2RealWidth = 520 * section2Scale;
        const section3RealWidth = 528 * section3Scale;
        const section4RealWidth = 520 * section4Scale;

        // Позиции краев секций
        const section1RightEdge = section1LeftEdge + section1RealWidth;
        const section4RightEdge = section4LeftEdge + section4RealWidth;

        // 1. ЛЕВЫЙ ФОН: привязывается к левому краю левой секции
        const leftBgLeftEdge = 0; // Левый край левого фона всегда в позиции 0
        const leftBgRightEdge = section1LeftEdge; // Правый край левого фона = левый край секции 1
        const leftBgWidth = leftBgRightEdge - leftBgLeftEdge; // Ширина = от 0 до левого края секции 1
        const leftBgLeftPercent = (leftBgLeftEdge / 3200) * 100;
        const leftBgWidthPercent = (leftBgWidth / 3200) * 100;
        
        backgroundLeft.style.left = `${leftBgLeftPercent}%`;
        backgroundLeft.style.width = `${leftBgWidthPercent}%`;

        // 2. ЦЕНТРАЛЬНЫЙ ФОН: привязывается к внешним краям крайних секций (от секции 1 до секции 4)
        const centerBgLeftEdge = section1LeftEdge; // Левый край = левый край секции 1
        const centerBgRightEdge = section4RightEdge; // Правый край = правый край секции 4
        const centerBgWidth = centerBgRightEdge - centerBgLeftEdge; // Общая ширина всех секций
        const centerBgLeftPercent = (centerBgLeftEdge / 3200) * 100;
        const centerBgWidthPercent = (centerBgWidth / 3200) * 100;

        // Просто меняем размер и позицию контейнера, фон растянется автоматически
        backgroundCenter.style.left = `${centerBgLeftPercent}%`;
        backgroundCenter.style.width = `${centerBgWidthPercent}%`;
        backgroundCenter.style.transform = 'none'; // Убираем масштабирование

        // 3. ПРАВЫЙ ФОН: привязывается к правому краю правой секции (секции 4)
        const rightBgLeftEdge = section4RightEdge; // Левый край правого фона = правый край секции 4
        const rightBgWidth = 3200 - rightBgLeftEdge; // Ширина = от правого края секции 4 до края (3200px)
        const rightBgLeftPercent = (rightBgLeftEdge / 3200) * 100;
        const rightBgWidthPercent = (rightBgWidth / 3200) * 100;
        
        backgroundRight.style.left = `${rightBgLeftPercent}%`;
        backgroundRight.style.width = `${rightBgWidthPercent}%`;

        // Убираем переходы для мгновенного обновления фоновых слоев
        [backgroundLeft, backgroundCenter, backgroundRight].forEach(bg => {
            bg.style.transition = 'none';
        });

        console.log('Фоновые слои обновлены для 4-секций:', {
            'Секция 1': `${section1LeftEdge.toFixed(0)}px - ${(section1LeftEdge + section1RealWidth).toFixed(0)}px (ширина: ${section1RealWidth.toFixed(0)}px)`,
            'Секция 4': `${section4LeftEdge}px - ${section4RightEdge.toFixed(0)}px (ширина: ${section4RealWidth.toFixed(0)}px)`,
            'Левый фон': `${leftBgLeftPercent.toFixed(2)}% ширина: ${leftBgWidthPercent.toFixed(2)}%`,
            'Центр фон': `${centerBgLeftPercent.toFixed(2)}% ширина: ${centerBgWidthPercent.toFixed(2)}%`,
            'Правый фон': `${rightBgLeftPercent.toFixed(2)}% ширина: ${rightBgWidthPercent.toFixed(2)}%`
        });
    }

    // Инициализация фоновых слоев при загрузке компоновки
    initializeBackgroundLayers() {
        console.log('Инициализация фоновых слоев для макета:', this.currentLayout);
        console.log('Загруженные секции:', Array.from(this.sections.keys()));
        
        if (this.currentLayout === '1-section') {
            const section1Data = this.sections.get('section-1');

            if (!section1Data) return;

            // Инициализируем фоны для 1-секции с правильным расчетом центра
            const originalLeft = section1Data.config.position.left; // 1062
            const originalWidth = section1Data.config.defaultSize.width; // 536
            const sectionCenter = originalLeft + (originalWidth / 2); // 1330
            
            // При инициализации секция имеет стандартный размер
            const realHalfWidth = section1Data.currentWidth / 2;
            const realLeftEdge = sectionCenter - realHalfWidth;
            
            this.adjustOneSectionBackgrounds(
                realLeftEdge,
                section1Data.currentWidth
            );

            console.log('Фоновые слои инициализированы для 1-секции');
            
        } else if (this.currentLayout === '2-sections') {
            const section1Data = this.sections.get('section-1');
            const section2Data = this.sections.get('section-2');

            if (!section1Data || !section2Data) return;

            // Инициализируем фоны для 2-секций с базовыми размерами
            const section1OriginalLeft = section1Data.config.position.left; // 746
            const section1OriginalWidth = section1Data.config.defaultSize.width; // 528
            const section1OriginalRight = section1OriginalLeft + section1OriginalWidth; // 1274
            
            // При инициализации секции имеют стандартные размеры
            const section1RealLeft = section1OriginalLeft; // Без масштабирования
            
            this.adjustTwoSectionsBackgrounds(
                section1RealLeft,
                section1Data.currentWidth,
                section2Data.currentWidth,
                section2Data.config.position.left
            );

            console.log('Фоновые слои инициализированы для 2-секций');
            
        } else if (this.currentLayout === '3-sections') {
            const section1Data = this.sections.get('section-1');
            const section2Data = this.sections.get('section-2');
            const section3Data = this.sections.get('section-3');

            if (!section1Data || !section2Data || !section3Data) return;

            // Используем стандартные размеры и позиции из конфигурации
            const section1LeftEdge = section1Data.config.position.left;
            this.adjustBackgroundLayers(
                section1LeftEdge,
                section1Data.currentWidth,
                section2Data.currentWidth,
                section3Data.currentWidth,
                section3Data.config.position.left
            );

            console.log('Фоновые слои инициализированы для 3-секций');
            
        } else if (this.currentLayout === '4-sections') {
            const section1Data = this.sections.get('section-1');
            const section2Data = this.sections.get('section-2');
            const section3Data = this.sections.get('section-3');
            const section4Data = this.sections.get('section-4');

            if (!section1Data || !section2Data || !section3Data || !section4Data) return;

            // Используем стандартные размеры и позиции из конфигурации
            const section1LeftEdge = section1Data.config.position.left;
            this.adjustFourSectionsBackgrounds(
                section1LeftEdge,
                section1Data.currentWidth,
                section2Data.currentWidth,
                section3Data.currentWidth,
                section4Data.currentWidth,
                section3Data.config.position.left,
                section4Data.config.position.left
            );

            console.log('Фоновые слои инициализированы для 4-секций');
        } else {
            console.log('Фоновые слои для', this.currentLayout, 'будут использовать базовое позиционирование');
        }
    }

    initColorSelector() {
        // Инициализируем обработчики событий для кнопок цвета
        const colorButtons = document.querySelectorAll('.color-button');
        colorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newColor = e.target.dataset.color;
                this.changeColor(newColor);
            });
        });

        // Устанавливаем активную кнопку по умолчанию
        document.querySelectorAll('.color-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.color-button[data-color="${this.currentColor}"]`).classList.add('active');

        console.log('Селектор цвета инициализирован');
    }

    pixelsToMillimeters(pixels, sectionId = null) {
        // Определяем какую секцию использовать для расчета
        const targetSection = sectionId || this.activeSection;
        
        // Для 1-секционного варианта: 536px = 1000мм
        if (this.currentLayout === '1-section') {
            const ratio = 1000 / 536; // 1.866
            return Math.round(pixels * ratio);
        }
        
        // Для 2-секционного варианта: 528px = 1000мм
        if (this.currentLayout === '2-sections') {
            const ratio = 1000 / 528; // 1.894
            return Math.round(pixels * ratio);
        }
        
        // Для 3-секционного варианта
        if (this.currentLayout === '3-sections') {
            // Центральная секция (section-2): 520px = 1000мм
            if (targetSection === 'section-2') {
                const ratio = 1000 / 520; // 1.923
                return Math.round(pixels * ratio);
            }
            // Боковые секции (section-1, section-3): 528px = 1000мм
            const ratio = 1000 / 528; // 1.894
            return Math.round(pixels * ratio);
        }
        
        // Для 4-секционного варианта
        if (this.currentLayout === '4-sections') {
            // Секции с размером 520px (section-2, section-4): 520px = 1000мм
            if (targetSection === 'section-2' || targetSection === 'section-4') {
                const ratio = 1000 / 520; // 1.923
                return Math.round(pixels * ratio);
            }
            // Секции с размером 528px (section-1, section-3): 528px = 1000мм
            const ratio = 1000 / 528; // 1.894
            return Math.round(pixels * ratio);
        }
        
        // Стандартный коэффициент для всех остальных случаев
        const ratio = this.layouts?.settings?.pixelsToMillimeters || 1.893939;
        return Math.round(pixels * ratio);
    }

    millimetersToPixels(millimeters, sectionId = null) {
        // Определяем какую секцию использовать для расчета
        const targetSection = sectionId || this.activeSection;
        
        // Для 1-секционного варианта: 1000мм = 536px
        if (this.currentLayout === '1-section') {
            const ratio = 536 / 1000; // 0.536
            return Math.round(millimeters * ratio);
        }
        
        // Для 2-секционного варианта: 1000мм = 528px
        if (this.currentLayout === '2-sections') {
            const ratio = 528 / 1000; // 0.528
            return Math.round(millimeters * ratio);
        }
        
        // Для 3-секционного варианта
        if (this.currentLayout === '3-sections') {
            // Центральная секция (section-2): 1000мм = 520px
            if (targetSection === 'section-2') {
                const ratio = 520 / 1000; // 0.52
                return Math.round(millimeters * ratio);
            }
            // Боковые секции (section-1, section-3): 1000мм = 528px
            const ratio = 528 / 1000; // 0.528
            return Math.round(millimeters * ratio);
        }
        
        // Для 4-секционного варианта
        if (this.currentLayout === '4-sections') {
            // Секции с размером 520px (section-2, section-4): 1000мм = 520px
            if (targetSection === 'section-2' || targetSection === 'section-4') {
                const ratio = 520 / 1000; // 0.52
                return Math.round(millimeters * ratio);
            }
            // Секции с размером 528px (section-1, section-3): 528px = 1000мм
            const ratio = 528 / 1000; // 0.528
            return Math.round(millimeters * ratio);
        }
        
        // Стандартный коэффициент для всех остальных случаев
        const ratio = this.layouts?.settings?.millimetersToPixels || 0.528;
        return Math.round(millimeters * ratio);
    }

    // Система фоновых слоев для 1-й секции
    adjustOneSectionBackgrounds(sectionLeft, sectionWidth) {
        const backgroundLeft = document.getElementById('background-left');
        const backgroundCenter = document.getElementById('background-center');
        const backgroundRight = document.getElementById('background-right');

        if (!backgroundLeft || !backgroundCenter || !backgroundRight) return;

        // Вычисляем реальные края секции
        const sectionRight = sectionLeft + sectionWidth;

        // 1. ЛЕВЫЙ ФОН: от левого края (0) до левого края секции
        const leftBgLeftEdge = 0;
        const leftBgRightEdge = sectionLeft;
        const leftBgWidth = leftBgRightEdge - leftBgLeftEdge;
        const leftBgLeftPercent = (leftBgLeftEdge / 3200) * 100;
        const leftBgWidthPercent = (leftBgWidth / 3200) * 100;
        
        backgroundLeft.style.left = `${leftBgLeftPercent}%`;
        backgroundLeft.style.width = `${leftBgWidthPercent}%`;

        // 2. ЦЕНТРАЛЬНЫЙ ФОН: точно под секцией
        const centerBgLeftEdge = sectionLeft;
        const centerBgRightEdge = sectionRight;
        const centerBgWidth = centerBgRightEdge - centerBgLeftEdge;
        const centerBgLeftPercent = (centerBgLeftEdge / 3200) * 100;
        const centerBgWidthPercent = (centerBgWidth / 3200) * 100;

        backgroundCenter.style.left = `${centerBgLeftPercent}%`;
        backgroundCenter.style.width = `${centerBgWidthPercent}%`;
        backgroundCenter.style.transform = 'none';

        // 3. ПРАВЫЙ ФОН: от правого края секции до правого края экрана (3200px)
        const rightBgLeftEdge = sectionRight;
        const rightBgWidth = 3200 - rightBgLeftEdge;
        const rightBgLeftPercent = (rightBgLeftEdge / 3200) * 100;
        const rightBgWidthPercent = (rightBgWidth / 3200) * 100;
        
        backgroundRight.style.left = `${rightBgLeftPercent}%`;
        backgroundRight.style.width = `${rightBgWidthPercent}%`;

        // Убираем переходы для мгновенного обновления
        [backgroundLeft, backgroundCenter, backgroundRight].forEach(bg => {
            bg.style.transition = 'none';
        });

        console.log('Фоны 1-секции обновлены:', {
            'Секция 1': `${sectionLeft.toFixed(0)}px - ${sectionRight.toFixed(0)}px (ширина: ${sectionWidth}px)`,
            'Левый фон': `${leftBgLeftPercent.toFixed(2)}% ширина: ${leftBgWidthPercent.toFixed(2)}%`,
            'Центр фон': `${centerBgLeftPercent.toFixed(2)}% ширина: ${centerBgWidthPercent.toFixed(2)}%`,
            'Правый фон': `${rightBgLeftPercent.toFixed(2)}% ширина: ${rightBgWidthPercent.toFixed(2)}%`
        });
    }

    // Переключение дверей
    toggleDoors(enabled) {
        this.doorsEnabled = enabled;
        const doorsContainer = document.getElementById('doors-container');
        const doorsPanel = document.getElementById('doors-panel');
        
        if (enabled) {
            // Включаем двери
            if (doorsContainer) {
                doorsContainer.style.display = 'block';
            }
            if (doorsPanel) {
                doorsPanel.style.display = 'block';
            }
            // Создаем двери, если их еще нет
            if (this.doors.size === 0) {
                this.createDoors();
            }
            // Принудительно синхронизируем все двери с текущими размерами секций
            this.updateAllDoors();
        } else {
            // Выключаем двери
            if (doorsContainer) {
                doorsContainer.style.display = 'none';
            }
            if (doorsPanel) {
                doorsPanel.style.display = 'none';
            }
        }
        
        // Обновляем отображение размера (глубина увеличивается на 18мм при включении дверей)
        this.updateDimensionsDisplay();
        
        // Обновляем цену
        this.updateTotalPrice();
        
        // Синхронизируем мобильную панель
        const mobileDoorsPanel = document.getElementById('mobile-doors-panel');
        if (mobileDoorsPanel) {
            mobileDoorsPanel.style.display = enabled ? 'block' : 'none';
        }
        
        console.log(`Двери ${enabled ? 'включены' : 'выключены'}`);
    }

    // Создание дверей (дублирует логику секций)
    createDoors() {
        const doorsContainer = document.getElementById('doors-container');
        if (!doorsContainer) return;
        
        // Очищаем контейнер
        doorsContainer.innerHTML = '';
        this.doors.clear();
        
        // Получаем конфигурацию секций текущего макета
        const layoutConfig = this.layouts.layouts[this.currentLayout];
        if (!layoutConfig || !layoutConfig.sections) return;
        
        layoutConfig.sections.forEach(sectionConfig => {
            // Создаем DOM элемент двери (копируем структуру секции)
            const doorElement = document.createElement('div');
            doorElement.className = `door ${sectionConfig.id}-door`;
            doorElement.id = `${sectionConfig.id}-door`;
            
            // Добавляем стили для позиционирования (как у секций)
            doorElement.style.position = 'absolute';
            doorElement.style.backgroundRepeat = 'no-repeat';
            doorElement.style.backgroundPosition = 'center';
            
            doorsContainer.appendChild(doorElement);
            
            // Получаем данные соответствующей секции
            const sectionData = this.sections.get(sectionConfig.id);
            
            // Сохраняем данные двери
            const doorData = {
                element: doorElement,
                config: sectionConfig,
                currentWidth: sectionData ? sectionData.currentWidth : sectionConfig.defaultSize.width
            };
            this.doors.set(sectionConfig.id, doorData);
            
            // Сразу синхронизируем с реальными размерами секции
            this.updateDoor(sectionConfig.id);
        });
        
        console.log('Двери созданы:', this.doors.size);
    }

    clearDoors() {
        const doorsContainer = document.getElementById('doors-container');
        if (doorsContainer) {
            doorsContainer.innerHTML = '';
        }
        this.doors.clear();
    }

    // Обновление конкретной двери
    updateDoor(sectionId) {
        const doorData = this.doors.get(sectionId);
        const sectionData = this.sections.get(sectionId);
        
        if (!doorData || !sectionData) return;
        
        // Получаем вычисленные стили секции
        const sectionElement = sectionData.element;
        const sectionComputedStyle = window.getComputedStyle(sectionElement);
        
        // Копируем ВСЕ стили позиционирования и размеров
        doorData.element.style.position = sectionElement.style.position || sectionComputedStyle.position;
        doorData.element.style.left = sectionElement.style.left || sectionComputedStyle.left;
        doorData.element.style.top = sectionElement.style.top || sectionComputedStyle.top;
        doorData.element.style.width = sectionElement.style.width || sectionComputedStyle.width;
        doorData.element.style.height = sectionElement.style.height || sectionComputedStyle.height;
        
        // Копируем transform и transform-origin
        doorData.element.style.transform = sectionElement.style.transform || sectionComputedStyle.transform;
        doorData.element.style.transformOrigin = sectionElement.style.transformOrigin || sectionComputedStyle.transformOrigin;
        
        // Копируем дополнительные стили которые могут влиять на размеры
        doorData.element.style.margin = sectionElement.style.margin || sectionComputedStyle.margin;
        doorData.element.style.padding = sectionElement.style.padding || sectionComputedStyle.padding;
        doorData.element.style.border = sectionElement.style.border || sectionComputedStyle.border;
        doorData.element.style.boxSizing = sectionElement.style.boxSizing || sectionComputedStyle.boxSizing;
        
        // Копируем right и bottom если они установлены
        if (sectionElement.style.right || sectionComputedStyle.right !== 'auto') {
            doorData.element.style.right = sectionElement.style.right || sectionComputedStyle.right;
        }
        if (sectionElement.style.bottom || sectionComputedStyle.bottom !== 'auto') {
            doorData.element.style.bottom = sectionElement.style.bottom || sectionComputedStyle.bottom;
        }
        
        // Обновляем данные ширины
        doorData.currentWidth = sectionData.currentWidth;
        
        // Убираем временные стили если они были
        doorData.element.style.backgroundColor = '';
        doorData.element.style.borderColor = '';
        
        // Обновляем изображение двери
        this.updateDoorImage(doorData);
        
        console.log(`Дверь ${sectionId} полностью синхронизирована с секцией`);
    }

    // Обновление изображения двери
    updateDoorImage(doorData) {
        if (!doorData || !doorData.config) return;

        // Определяем размер двери в миллиметрах  
        const sectionId = Array.from(this.doors.entries()).find(([id, data]) => data === doorData)?.[0];
        const doorWidthMm = this.pixelsToMillimeters(doorData.currentWidth, sectionId);
        
        // Получаем оптимальный размер изображения
        const optimalSize = ConfigUtils.getOptimalImageSize(doorWidthMm);
        
        // Формируем название изображения двери по схеме: [sections]_s[number]_d_[color]_r1_[size].jpg
        const sectionsCount = this.currentLayout.split('-')[0]; // "1", "2", "3", "4"
        const sectionNumber = doorData.config.id.split('-')[1]; // "1", "2", "3", "4"
        const doorColor = this.doorsSettings.color; // "c1", "c2", "c3", "c4", "c5"
        
        const doorImageName = `${sectionsCount}_s${sectionNumber}_d_${doorColor}_r1_${optimalSize}.jpg`;
        const doorImagePath = `${doorData.config.imagePath}doors/${doorImageName}`;
        
        // Применяем изображение двери
        doorData.element.style.backgroundImage = `url('${doorImagePath}')`;
        
        // Для дверей всегда растягиваем картинку точно по размеру блока
        // чтобы фасад полностью заполнял площадь секции
        doorData.element.style.backgroundSize = '100% 100%';
        
        ConfigUtils.log('debug', `Дверь ${doorData.config.id}: размер ${doorWidthMm}мм, цвет ${doorColor}, изображение ${doorImageName}`);
    }

    // Обновление всех дверей
    updateAllDoors() {
        this.doors.forEach((doorData, sectionId) => {
            this.updateDoor(sectionId);
        });
    }

    // Тестовая функция для проверки синхронизации размеров
    testDoorSynchronization() {
        if (!this.doorsEnabled) {
            console.log('❌ Двери не включены');
            return;
        }

        console.log('🔍 Проверяем синхронизацию размеров дверей с секциями:');
        console.log('='.repeat(60));
        
        let allSynced = true;
        
        this.sections.forEach((sectionData, sectionId) => {
            const doorData = this.doors.get(sectionId);
            
            if (!doorData) {
                console.log(`❌ ${sectionId}: Дверь не найдена`);
                allSynced = false;
                return;
            }
            
            // Получаем вычисленные размеры элементов
            const sectionRect = sectionData.element.getBoundingClientRect();
            const doorRect = doorData.element.getBoundingClientRect();
            
            const sectionComputedStyle = window.getComputedStyle(sectionData.element);
            const doorComputedStyle = window.getComputedStyle(doorData.element);
            
            // Сравниваем реальные размеры с допуском в 1px
            const tolerance = 1;
            
            const isLeftSynced = Math.abs(sectionRect.left - doorRect.left) <= tolerance;
            const isTopSynced = Math.abs(sectionRect.top - doorRect.top) <= tolerance;
            const isWidthSynced = Math.abs(sectionRect.width - doorRect.width) <= tolerance;
            const isHeightSynced = Math.abs(sectionRect.height - doorRect.height) <= tolerance;
            
            // Проверяем стили
            const sectionStyles = {
                left: sectionData.element.style.left,
                top: sectionData.element.style.top,
                width: sectionData.element.style.width,
                height: sectionData.element.style.height,
                transform: sectionData.element.style.transform,
                transformOrigin: sectionData.element.style.transformOrigin
            };
            
            const doorStyles = {
                left: doorData.element.style.left,
                top: doorData.element.style.top,
                width: doorData.element.style.width,
                height: doorData.element.style.height,
                transform: doorData.element.style.transform,
                transformOrigin: doorData.element.style.transformOrigin
            };
            
            const isTransformSynced = sectionStyles.transform === doorStyles.transform;
            const isTransformOriginSynced = sectionStyles.transformOrigin === doorStyles.transformOrigin;
            
            const isSynced = isLeftSynced && isTopSynced && isWidthSynced && isHeightSynced && isTransformSynced && isTransformOriginSynced;
            
            console.log(`${isSynced ? '✅' : '❌'} ${sectionId}:`);
            console.log(`  Позиция X: ${isLeftSynced ? '✅' : '❌'} (Секция: ${sectionRect.left.toFixed(1)}px, Дверь: ${doorRect.left.toFixed(1)}px, разница: ${Math.abs(sectionRect.left - doorRect.left).toFixed(1)}px)`);
            console.log(`  Позиция Y: ${isTopSynced ? '✅' : '❌'} (Секция: ${sectionRect.top.toFixed(1)}px, Дверь: ${doorRect.top.toFixed(1)}px, разница: ${Math.abs(sectionRect.top - doorRect.top).toFixed(1)}px)`);
            console.log(`  Ширина: ${isWidthSynced ? '✅' : '❌'} (Секция: ${sectionRect.width.toFixed(1)}px, Дверь: ${doorRect.width.toFixed(1)}px, разница: ${Math.abs(sectionRect.width - doorRect.width).toFixed(1)}px)`);
            console.log(`  Высота: ${isHeightSynced ? '✅' : '❌'} (Секция: ${sectionRect.height.toFixed(1)}px, Дверь: ${doorRect.height.toFixed(1)}px, разница: ${Math.abs(sectionRect.height - doorRect.height).toFixed(1)}px)`);
            console.log(`  Transform: ${isTransformSynced ? '✅' : '❌'} (Секция: "${sectionStyles.transform}", Дверь: "${doorStyles.transform}")`);
            console.log(`  TransformOrigin: ${isTransformOriginSynced ? '✅' : '❌'} (Секция: ${sectionStyles.transformOrigin}, Дверь: ${doorStyles.transformOrigin})`);
            console.log('');
            
            if (!isSynced) {
                allSynced = false;
            }
        });
        
        console.log('='.repeat(60));
        if (allSynced) {
            console.log('🎉 Все двери идеально синхронизированы с секциями!');
        } else {
            console.log('⚠️ Обнаружены проблемы синхронизации. Попробуйте вызвать forceDoorUpdate()');
        }
        
        return allSynced;
    }

    // Функция для принудительного обновления всех дверей (для отладки)
    forceDoorUpdate() {
        if (!this.doorsEnabled) {
            console.log('❌ Двери не включены');
            return;
        }
        
        console.log('🔧 Принудительно обновляем все двери...');
        this.updateAllDoors();
        console.log('✅ Все двери обновлены');
        
        // Сразу проверяем синхронизацию
        setTimeout(() => {
            this.testDoorSynchronization();
        }, 100);
    }

    // === СИСТЕМА ПОДСКАЗОК ===
    
    initTooltipSystem() {
        // Встроенные тексты подсказок (работают без HTTP сервера)
        this.tooltipTexts = new Map([
            ['layout-info.txt', 'Выберите от одной до четырех секций шкафа. Если ваша гардеробная углоавая или п образная, то вы можете создать шкаф отдельно по каждой стене. Так же вы можете связатся с нами или заполнить форму внизу страницы и мы поможем с проектированием или реализуем нестрандартный вариант.'],
            ['variant-info.txt', 'Выберите один из шести вариантов компоновки секции. В конструкторе представлены наиболее популярные комплектации, но вы можете создать и собсвенный вариант.'],
            ['color-info.txt', 'Выберите один из пяти вариантов комбинации цвета. В конструкторе представлены удачные сочетания, но вы можете создать и собсвенный вариант. Все образцы представлены на странице ниже.'],
            ['depth-info.txt', 'При включении параметра вы можете сделать любую глубину шкафа в доступном диапазоне. Но это добавить 20% к стоимости изделия и + одну неделю к изготовлению.'],
            ['doors-info.txt', 'В палитре конструктора пять вариантов цвета дверей. Все образцы представлены на странице ниже. Мы используем Итальянские петли Salice. Если необходимо нессиметричное расположение дверей или нестандартный вариант, вы можете заполнить форму ниже или связаться с нами и мы поможем в проектировании.'],
            ['lighting-info.txt', 'Температура подсветки 3000K, 24v'],
            ['door-sensor-info.txt', 'Датчики устанавливаются при наличии подсветки и дверей. ИК датчик для включения света внутри шкафа при открывании двери.'],
            ['assembly-info.txt', 'Профессиональная сборка и установка нашими специалистами. Включает доставку, распаковку, сборку и установку. Уборка после монтажа. Гарантия на услуги 1 год.']
        ]);
        
        // Инициализируем обработчики событий для значков подсказок
        this.attachTooltipListeners();
        
        console.log('Система подсказок инициализирована');
    }

    // === РАСЧЕТ СТОИМОСТИ И РАЗМЕРА ===

    calculateCabinetDimensions() {
        // Рассчитываем общую ширину секций
        let totalSectionsWidth = 0;
        this.sections.forEach((sectionData, sectionId) => {
            const widthMm = this.pixelsToMillimeters(sectionData.currentWidth, sectionId);
            totalSectionsWidth += widthMm;
        });

        // Добавляем фиксированный размер корпуса в зависимости от количества секций
        const sectionsCount = this.sections.size;
        let corpusWidth = 0;
        switch (sectionsCount) {
            case 1: corpusWidth = 64; break;
            case 2: corpusWidth = 96; break;
            case 3: corpusWidth = 128; break;
            case 4: corpusWidth = 160; break;
            default: corpusWidth = 64; break;
        }

        // Общая ширина шкафа
        const totalWidth = Math.round(totalSectionsWidth + corpusWidth);

        // Высота и глубина берем из текущих настроек
        const height = this.globalSettings.sectionHeight;
        let depth = this.globalSettings.sectionDepth;

        // Если двери включены, добавляем 18 мм к глубине
        if (this.doorsEnabled) {
            depth += 18;
        }

        return {
            width: totalWidth,
            height: height,
            depth: depth
        };
    }

    updateDimensionsDisplay() {
        const dimensions = this.calculateCabinetDimensions();
        const dimensionsElement = document.getElementById('cabinet-dimensions');
        
        if (dimensionsElement) {
            dimensionsElement.textContent = `${dimensions.width}×${dimensions.height}×${dimensions.depth} мм`;
        }
    }

    getTooltipText(filename) {
        return this.tooltipTexts.get(filename) || 'Информация недоступна';
    }

    attachTooltipListeners() {
        // Используем делегирование событий для динамически создаваемых элементов
        document.addEventListener('mouseenter', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('help-icon')) {
                this.showTooltipHelp(e.target);
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('help-icon')) {
                this.hideTooltipHelp(e.target);
            }
        }, true);
        
        // Очищаем все подсказки при клике в любом месте (кроме значков подсказок)
        document.addEventListener('click', (e) => {
            if (!e.target || !e.target.classList || !e.target.classList.contains('help-icon')) {
                this.clearAllTooltips();
            }
        });
    }

    showTooltipHelp(iconElement) {
        if (!iconElement || !iconElement.dataset) return;
        
        const filename = iconElement.dataset.tooltipFile;
        if (!filename) return;

        // Удаляем существующую подсказку если есть
        this.hideTooltipHelp(iconElement);

        // Получаем текст подсказки
        const tooltipText = this.getTooltipText(filename);

        // Создаем элемент подсказки
        const tooltip = document.createElement('div');
        tooltip.className = 'help-tooltip';
        tooltip.textContent = tooltipText;
        tooltip.dataset.tooltip = 'true';
        tooltip.dataset.tooltipFor = filename;

        // Временно добавляем к body для измерения размеров
        tooltip.style.visibility = 'hidden';
        tooltip.style.position = 'absolute';
        document.body.appendChild(tooltip);

        // Получаем размеры tooltip'а
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;

        // Получаем позицию значка и размеры окна
        const iconRect = iconElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Вычисляем желаемую позицию (центрированную над значком)
        let left = iconRect.left + scrollLeft + iconRect.width/2 - tooltipWidth/2;
        let top = iconRect.top + scrollTop - tooltipHeight - 10; // Над значком с отступом

        // Корректируем позицию если выходит за границы экрана
        
        // Проверяем правую границу
        if (left + tooltipWidth > windowWidth + scrollLeft - 10) {
            left = windowWidth + scrollLeft - tooltipWidth - 10;
        }
        
        // Проверяем левую границу
        if (left < scrollLeft + 10) {
            left = scrollLeft + 10;
        }
        
        // Проверяем верхнюю границу
        if (top < scrollTop + 10) {
            // Если не помещается сверху, показываем снизу
            top = iconRect.bottom + scrollTop + 10;
        }
        
        // Проверяем нижнюю границу (если показываем снизу)
        if (top + tooltipHeight > windowHeight + scrollTop - 10) {
            // Если не помещается снизу, показываем сверху (даже если выходит за верхнюю границу)
            top = iconRect.top + scrollTop - tooltipHeight - 10;
        }

        // Применяем окончательную позицию
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.transform = 'none'; // Убираем transform, так как уже рассчитали точную позицию
        tooltip.style.zIndex = '9999';
        tooltip.style.visibility = 'visible';

        // Показываем подсказку с небольшой задержкой
        setTimeout(() => {
            if (tooltip && tooltip.classList) {
                tooltip.classList.add('show');
            }
        }, 100);
    }

    hideTooltipHelp(iconElement) {
        if (!iconElement || !iconElement.dataset) return;
        
        const filename = iconElement.dataset.tooltipFile;
        if (!filename) return;
        
        // Ищем подсказку в body по filename
        const existingTooltip = document.body.querySelector(`[data-tooltip="true"][data-tooltip-for="${filename}"]`);
        
        if (existingTooltip && existingTooltip.classList) {
            existingTooltip.classList.remove('show');
            setTimeout(() => {
                if (existingTooltip && existingTooltip.parentNode) {
                    existingTooltip.remove();
                }
            }, 300);
        }
    }
    
    // Принудительная очистка всех зависших подсказок
    clearAllTooltips() {
        const allTooltips = document.querySelectorAll('[data-tooltip="true"]');
        allTooltips.forEach(tooltip => {
            if (tooltip && tooltip.parentNode) {
                tooltip.remove();
            }
        });
        console.log('Все подсказки очищены');
    }
    
    // Инициализация дополнительных параметров
    initAdditionalParams() {
        // Инициализируем сворачивание раздела
        const header = document.getElementById('additional-params-header');
        const toggle = document.getElementById('additional-params-toggle');
        const content = document.getElementById('additional-params-content');
        
        if (header && toggle && content) {
            header.addEventListener('click', () => {
                const isExpanded = content.classList.contains('expanded');
                
                if (isExpanded) {
                    content.classList.remove('expanded');
                    toggle.classList.remove('expanded');
                } else {
                    content.classList.add('expanded');
                    toggle.classList.add('expanded');
                }
            });
        }
        
        // Инициализируем обработчики для нестандартной глубины
        const customDepthCheckbox = document.getElementById('custom-depth-checkbox');
        const depthSlider = document.getElementById('depth-slider');
        const depthDisplay = document.getElementById('depth-display');
        const depthSliderContainer = document.getElementById('depth-slider-container');
        
        if (customDepthCheckbox) {
            customDepthCheckbox.addEventListener('change', (e) => {
                this.toggleCustomDepth(e.target.checked);
                if (depthSliderContainer) {
                    depthSliderContainer.style.display = e.target.checked ? 'flex' : 'none';
                }
            });
        }
        
        if (depthSlider) {
            depthSlider.addEventListener('mousedown', () => {
                this.activateSlider(depthSlider);
            });
            
            depthSlider.addEventListener('input', (e) => {
                this.activateSlider(depthSlider);
                this.changeDepth(parseInt(e.target.value));
            });
        }
        
        if (depthDisplay) {
            this.initInputField(depthDisplay, (value) => {
                this.changeDepth(value);
                if (depthSlider) {
                    depthSlider.value = value;
                    this.activateSlider(depthSlider);
                }
            });
        }
        
        // Инициализируем обработчики для новых параметров
        const lightingCheckbox = document.getElementById('lighting-enabled');
        const doorSensorCheckbox = document.getElementById('door-sensor-enabled');
        const assemblyCheckbox = document.getElementById('assembly-enabled');
        
        if (lightingCheckbox) {
            lightingCheckbox.addEventListener('change', (e) => {
                this.additionalParams.lighting = e.target.checked;
                this.updateTotalPrice();
                console.log('Подсветка:', e.target.checked ? 'включена' : 'выключена');
            });
        }
        
        if (doorSensorCheckbox) {
            doorSensorCheckbox.addEventListener('change', (e) => {
                this.additionalParams.sensor = e.target.checked;
                this.updateTotalPrice();
                console.log('Датчик открывания двери:', e.target.checked ? 'включен' : 'выключен');
            });
        }
        
        if (assemblyCheckbox) {
            assemblyCheckbox.addEventListener('change', (e) => {
                this.additionalParams.assembly = e.target.checked;
                this.updateTotalPrice();
                console.log('Сборка:', e.target.checked ? 'включена' : 'выключена');
            });
        }
    }

    // === КНОПКИ ДЕЙСТВИЙ ===
    
    initActionButtons() {
        // Кнопка заказа
        const orderButton = document.getElementById('order-button');
        if (orderButton) {
            orderButton.addEventListener('click', () => {
                this.handleOrder();
            });
        }
        
        // Кнопка сохранения
        const saveButton = document.getElementById('save-button');
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                this.handleSaveImage();
            });
        }
        
        console.log('Кнопки действий инициализированы');
    }
    
    handleOrder() {
        try {
            // Если мы внутри iframe, отправляем сообщение родительскому окну (Tilda)
            if (window.parent && window.parent !== window) {
                // Собираем данные конфигурации для передачи в форму
                const configData = this.collectConfigurationData();
                
                // Отправляем сообщение родительскому окну для открытия popup
                window.parent.postMessage({
                    type: 'openTildaPopup',
                    popup: 'zakaz',
                    configData: configData
                }, '*');
                
                console.log('Отправлено сообщение для открытия popup Tilda');
            } else {
                // Если не в iframe, открываем в новой вкладке (fallback)
                const orderUrl = 'https://example.com/order';
                window.open(orderUrl, '_blank');
                console.log('Открыт в новой вкладке (fallback)');
            }
        } catch (error) {
            console.error('Ошибка при открытии формы заказа:', error);
            // Fallback в случае ошибки
            alert('Для оформления заказа свяжитесь с нами по телефону');
        }
    }
    
    async handleSaveImage() {
        console.log('Начинаем сохранение...');
        
        // Показываем индикатор загрузки
        const saveButton = document.getElementById('save-button');
        if (saveButton) {
            saveButton.style.opacity = '0.5';
            saveButton.style.pointerEvents = 'none';
        }
        
        try {
            // Собираем данные о текущей конфигурации
            const configData = this.collectConfigurationData();
            
            // Создаем составное изображение с шкафом и описанием
            await this.createAndDownloadImage(configData);
            
        } catch (error) {
            console.error('Критическая ошибка при сохранении:', error);
            // Только в случае критической ошибки показываем alert
            alert('Произошла критическая ошибка при сборе данных');
        } finally {
            // Убираем индикатор загрузки
            const saveButton = document.getElementById('save-button');
            if (saveButton) {
                saveButton.style.opacity = '1';
                saveButton.style.pointerEvents = 'auto';
            }
        }
    }
    
    collectConfigurationData() {
        // Собираем все данные о текущей конфигурации
        const dimensions = this.calculateCabinetDimensions();
        
        // Данные о секциях
        const sectionsData = [];
        this.sections.forEach((sectionData, sectionId) => {
            sectionsData.push({
                id: sectionId,
                name: sectionData.config.name,
                variant: sectionData.currentVariant ? sectionData.currentVariant.name : 'Не выбран',
                width: this.pixelsToMillimeters(sectionData.currentWidth, sectionId)
            });
        });
        
        // Дополнительные параметры
        const additionalParams = {
            customDepth: this.globalSettings.hasCustomDepth,
            depth: this.globalSettings.sectionDepth,
            lighting: document.getElementById('lighting-enabled')?.checked || false,
            doorSensor: document.getElementById('door-sensor-enabled')?.checked || false,
            assembly: document.getElementById('assembly-enabled')?.checked || false
        };
        
        // Данные о дверях
        const doorsData = {
            enabled: this.doorsEnabled,
            color: this.doorsEnabled ? this.doorsSettings.color : null
        };
        
        return {
            layout: this.currentLayout,
            layoutName: this.layouts?.layouts[this.currentLayout]?.name || this.currentLayout,
            dimensions: dimensions,
            sections: sectionsData,
            color: this.currentColor,
            height: this.globalSettings.sectionHeight,
            doors: doorsData,
            additionalParams: additionalParams,
            timestamp: new Date().toLocaleString('ru-RU')
        };
    }
    
    generateConfigurationReport(data) {
        let report = '';
        report += '=== КОНФИГУРАЦИЯ ШКАФА ===\n\n';
        report += `Дата создания: ${data.timestamp}\n\n`;
        
        // Основная информация
        report += '--- ОСНОВНЫЕ ПАРАМЕТРЫ ---\n';
        report += `Тип шкафа: ${data.layoutName}\n`;
        report += `Размеры: ${data.dimensions.width}×${data.dimensions.height}×${data.dimensions.depth} мм\n`;
        report += `Цвет корпуса: ${data.color}\n`;
        report += `Высота: ${data.height} мм\n\n`;
        
        // Секции
        report += '--- СЕКЦИИ ---\n';
        data.sections.forEach((section, index) => {
            report += `${index + 1}. ${section.name}:\n`;
            report += `   Вариант: ${section.variant}\n`;
            report += `   Ширина: ${section.width} мм\n\n`;
        });
        
        // Двери
        report += '--- ДВЕРИ ---\n';
        if (data.doors.enabled) {
            report += `Двери: Да\n`;
            report += `Цвет дверей: ${data.doors.color}\n\n`;
        } else {
            report += `Двери: Нет\n\n`;
        }
        
        // Дополнительные параметры
        report += '--- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---\n';
        if (data.additionalParams.customDepth) {
            report += `Нестандартная глубина: ${data.additionalParams.depth} мм (+20%)\n`;
        }
        if (data.additionalParams.lighting) {
            report += `Подсветка: Да (3000K, 24v)\n`;
        }
        if (data.additionalParams.doorSensor) {
            report += `Датчик открывания двери: Да\n`;
        }
        if (data.additionalParams.assembly) {
            report += `Сборка: Да\n`;
        }
        
        if (!data.additionalParams.customDepth && !data.additionalParams.lighting && 
            !data.additionalParams.doorSensor && !data.additionalParams.assembly) {
            report += `Дополнительные параметры не выбраны\n`;
        }
        
        report += '\n';
        report += '--- СТОИМОСТЬ ---\n';
        report += `Примерная стоимость: 235 000 ₽\n`;
        report += `(Точная стоимость рассчитывается индивидуально)\n\n`;
        
        report += '=== КОНЕЦ ОТЧЕТА ===';
        
        return report;
    }
    
    async createAndDownloadImage(configData) {
        try {
            // Пытаемся создать изображение с html2canvas
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '-9999px';
            container.style.left = '-9999px';
            container.style.width = '1800px';
            container.style.height = 'auto';
            container.style.background = 'white';
            container.style.padding = '20px';
            container.style.fontFamily = 'Arial, sans-serif';
            
            // Клонируем только область шкафа (без меню) - увеличено на 80% от оригинала
            const cabinetArea = document.createElement('div');
            cabinetArea.style.position = 'relative';
            cabinetArea.style.width = '1728px';  // 960 * 1.5 * 1.2 = 1728
            cabinetArea.style.height = '1037px';  // 576 * 1.5 * 1.2 = 1037
            cabinetArea.style.marginBottom = '20px';
            cabinetArea.style.overflow = 'hidden';
            
            // Клонируем фоновые слои
            const backgroundLayers = document.querySelector('.background-layers');
            if (backgroundLayers) {
                const backgroundClone = backgroundLayers.cloneNode(true);
                backgroundClone.style.width = '100%';
                backgroundClone.style.height = '100%';
                cabinetArea.appendChild(backgroundClone);
            }
            
            // Клонируем секции
            const sectionsContainer = document.getElementById('sections-container');
            if (sectionsContainer) {
                const sectionsClone = sectionsContainer.cloneNode(true);
                sectionsClone.style.width = '100%';
                sectionsClone.style.height = '100%';
                cabinetArea.appendChild(sectionsClone);
            }
            
            // Клонируем двери (если есть)
            const doorsContainer = document.getElementById('doors-container');
            if (doorsContainer && doorsContainer.style.display !== 'none') {
                const doorsClone = doorsContainer.cloneNode(true);
                doorsClone.style.width = '100%';
                doorsClone.style.height = '100%';
                cabinetArea.appendChild(doorsClone);
            }
            
            // Создаем упрощенную информационную панель (только секции)
            const infoPanel = document.createElement('div');
            infoPanel.style.width = '1728px';
            infoPanel.style.fontSize = '22px';
            infoPanel.style.lineHeight = '1.4';
            infoPanel.style.color = '#333';
            infoPanel.innerHTML = this.generateCompactInfoHTML(configData);
            
            // Собираем все вместе
            container.appendChild(cabinetArea);
            container.appendChild(infoPanel);
            document.body.appendChild(container);
            
            try {
                // Создаем изображение с помощью html2canvas
                const canvas = await html2canvas(container, {
                    width: 1800,
                    height: container.offsetHeight,
                    scale: 2, // Увеличиваем разрешение в 2 раза
                    dpi: 300, // Высокое качество печати
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    removeContainer: true,
                    ignoreElements: (element) => {
                        // Игнорируем любые элементы с классом control-panel
                        return element.classList && element.classList.contains('control-panel');
                    }
                });
                
                // Конвертируем в blob и скачиваем
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `cabinet-${Date.now()}.png`;
                        link.style.display = 'none';
                        
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        URL.revokeObjectURL(url);
                        console.log('Изображение успешно сохранено');
                    } else {
                        throw new Error('Не удалось создать blob');
                    }
                }, 'image/png');
                
            } catch (canvasError) {
                console.warn('Ошибка создания изображения:', canvasError);
                // Fallback к текстовому отчету
                this.createFallbackReport(configData);
            } finally {
                // Удаляем временный контейнер
                if (document.body.contains(container)) {
                    document.body.removeChild(container);
                }
            }
            
        } catch (error) {
            console.error('Общая ошибка при создании изображения:', error);
            // Fallback к текстовому отчету
            this.createFallbackReport(configData);
        }
    }
    
    createFallbackReport(configData) {
        // Создаем упрощенный текстовый отчет как fallback
        console.log('Создаем упрощенный текстовый отчет вместо изображения...');
        
        const report = this.generateSectionsReport(configData);
        this.downloadTextFile(report, `cabinet-info-${Date.now()}.txt`);
        
        // Показываем уведомление пользователю
        alert('Из-за ограничений безопасности браузера сохранено изображение не удалось.\n\n' +
              'Вместо этого сохранена информация о шкафе.\n\n' +
              'Для сохранения изображений откройте страницу через веб-сервер\n' +
              '(например, используйте Live Server в VS Code).');
    }
    
    generateSectionsReport(data) {
        // Получаем актуальную цену из калькулятора
        const priceData = this.calculateTotalPrice();
        
        let report = '';
        report += '=== ИНФОРМАЦИЯ О ШКАФЕ ===\n\n';
        report += `Дата создания: ${data.timestamp}\n\n`;
        
        // Основная информация
        report += '--- ОСНОВНАЯ ИНФОРМАЦИЯ ---\n';
        report += `Тип шкафа: ${data.layoutName}\n`;
        report += `Размер: ${data.dimensions.width}×${data.dimensions.height}×${data.dimensions.depth} мм\n`;
        report += `Цвет корпуса: ${data.color}\n`;
        if (data.doors.enabled) {
            report += `Двери: Да (цвет: ${data.doors.color})\n`;
        } else {
            report += `Двери: Нет\n`;
        }
        report += '\n';
        
        // Секции
        report += '--- СЕКЦИИ ---\n';
        data.sections.forEach((section, index) => {
            report += `${index + 1}. ${section.name}\n`;
            report += `   Вариант: ${section.variant}\n`;
            report += `   Ширина: ${section.width} мм\n\n`;
        });
        
        // Дополнительные параметры
        const hasAdditional = data.additionalParams.customDepth || data.additionalParams.lighting || 
                             data.additionalParams.doorSensor || data.additionalParams.assembly;
        
        if (hasAdditional) {
            report += '--- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---\n';
            if (data.additionalParams.customDepth) {
                report += `• Нестандартная глубина: ${data.additionalParams.depth} мм\n`;
            }
            if (data.additionalParams.lighting) {
                report += '• Подсветка LED (3000K, 24v)\n';
            }
            if (data.additionalParams.doorSensor) {
                report += '• Датчик открывания двери\n';
            }
            if (data.additionalParams.assembly) {
                report += '• Сборка\n';
            }
            report += '\n';
        }
        
        // Расчет стоимости
        report += '--- РАСЧЕТ СТОИМОСТИ ---\n';
        report += `Секции: ${priceData.sections.toLocaleString('ru-RU')} ₽\n`;
        if (priceData.doors > 0) {
            report += `Двери: ${priceData.doors.toLocaleString('ru-RU')} ₽\n`;
        }
        if (priceData.options > 0) {
            report += `Опции: ${priceData.options.toLocaleString('ru-RU')} ₽\n`;
        }
        if (priceData.assembly > 0) {
            report += `Сборка: ${priceData.assembly.toLocaleString('ru-RU')} ₽\n`;
        }
        if (priceData.depthSurcharge > 0) {
            report += `Нестандартная глубина (+20%): ${priceData.depthSurcharge.toLocaleString('ru-RU')} ₽\n`;
        }
        report += `\nИТОГО: ${priceData.total.toLocaleString('ru-RU')} ₽\n\n`;
        
        report += '=== КОНЕЦ ОТЧЕТА ===';
        
        return report;
    }
    
    generateCompactInfoHTML(data) {
        // Получаем актуальную цену из калькулятора
        const priceData = this.calculateTotalPrice();
        
        let html = '';
        
        // Блок с ценой и расчетом в одной строке
        html += '<div style="display: flex; gap: 20px; margin-bottom: 20px;">';
        
        // Левая часть - стоимость крупно
        html += '<div style="flex: 1; text-align: center; padding: 25px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; border: 2px solid #dee2e6;">';
        html += '<div style="font-size: 32px; font-weight: bold; color: #333; margin-bottom: 10px;">';
        html += `${priceData.total.toLocaleString('ru-RU')} ₽`;
        html += '</div>';
        html += '<div style="font-size: 16px; color: #6c757d;">';
        html += `Размер: ${data.dimensions.width}×${data.dimensions.height}×${data.dimensions.depth} мм`;
        html += '</div>';
        html += '</div>';
        
        // Правая часть - детализация стоимости
        html += '<div style="flex: 1; background: #fff; padding: 20px; border-radius: 12px; border: 2px solid #ddd;">';
        html += '<div style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; text-align: center;">Состав стоимости:</div>';
        
        html += '<div style="display: grid; grid-template-columns: 1fr auto; gap: 10px; font-size: 16px;">';
        html += `<div>Секции:</div><div style="font-weight: bold;">${priceData.sections.toLocaleString('ru-RU')} ₽</div>`;
        
        if (priceData.doors > 0) {
            html += `<div>Двери:</div><div style="font-weight: bold;">${priceData.doors.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        if (priceData.options > 0) {
            html += `<div>Опции:</div><div style="font-weight: bold;">${priceData.options.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        if (priceData.assembly > 0) {
            html += `<div>Сборка:</div><div style="font-weight: bold;">${priceData.assembly.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        if (priceData.depthSurcharge > 0) {
            html += `<div>Нестандартная глубина (+20%):</div><div style="font-weight: bold;">${priceData.depthSurcharge.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        html += '</div>';
        html += '</div>';
        
        html += '</div>';
        
        // Секции компактно
        html += '<div style="background: #fff; padding: 20px; border-radius: 12px; border: 2px solid #ddd;">';
        html += '<div style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; text-align: center;">Секции шкафа:</div>';
        
        // Секции в сетку для лучшего отображения
        html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">';
        data.sections.forEach((section, index) => {
            html += '<div style="padding: 12px; border: 1px solid #e9ecef; border-radius: 8px; background: #f8f9fa;">';
            html += `<div style="font-weight: bold; color: #495057; margin-bottom: 5px;">${index + 1}. ${section.name}</div>`;
            html += `<div style="font-size: 14px; color: #6c757d;">${section.variant}</div>`;
            html += `<div style="font-size: 14px; color: #6c757d;">Ширина: ${section.width} мм</div>`;
            html += '</div>';
        });
        html += '</div>';
        
        // Дополнительные параметры если есть
        const hasAdditional = data.additionalParams.customDepth || data.additionalParams.lighting || 
                             data.additionalParams.doorSensor || data.additionalParams.assembly;
        
        if (hasAdditional) {
            html += '<div style="margin-top: 15px; padding: 15px; background: #e7f3ff; border-radius: 8px;">';
            html += '<div style="font-weight: bold; color: #0d6efd; margin-bottom: 8px;">Дополнительные параметры:</div>';
            html += '<div style="font-size: 14px; color: #495057;">';
            
            if (data.additionalParams.customDepth) {
                html += `• Глубина: ${data.additionalParams.depth} мм<br>`;
            }
            if (data.additionalParams.lighting) {
                html += '• Подсветка LED (3000K, 24v)<br>';
            }
            if (data.additionalParams.doorSensor) {
                html += '• Датчик открывания двери<br>';
            }
            if (data.additionalParams.assembly) {
                html += '• Сборка<br>';
            }
            
            html += '</div>';
            html += '</div>';
        }
        
        html += '</div>';
        
        return html;
    }
    
    generateSectionsHTML(data) {
        let html = '';
        
        // Заголовок
        html += '<div style="text-align: center; margin-bottom: 20px;">';
        html += '<h3 style="margin: 0; color: #333; font-size: 20px;">Секции шкафа</h3>';
        html += '</div>';
        
        // Секции в одну строку
        html += '<div style="display: flex; justify-content: space-between; gap: 20px;">';
        
        data.sections.forEach((section, index) => {
            html += '<div style="flex: 1; text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">';
            html += `<div style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 8px;">${index + 1}</div>`;
            html += `<div style="font-size: 16px; color: #666; margin-bottom: 4px;">${section.name}</div>`;
            html += `<div style="font-size: 14px; color: #888; margin-bottom: 4px;">${section.variant}</div>`;
            html += `<div style="font-size: 14px; color: #888;">Ширина: ${section.width} мм</div>`;
            html += '</div>';
        });
        
        html += '</div>';
        
        return html;
    }

    generateConfigurationHTML(data) {
        let html = '';
        html += '<div style="display: flex; gap: 40px;">';
        
        // Левая колонка - основная информация
        html += '<div style="flex: 1;">';
        html += '<h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Конфигурация шкафа</h3>';
        html += `<p><strong>Тип:</strong> ${data.layoutName}</p>`;
        html += `<p><strong>Размеры:</strong> ${data.dimensions.width}×${data.dimensions.height}×${data.dimensions.depth} мм</p>`;
        html += `<p><strong>Цвет корпуса:</strong> ${data.color}</p>`;
        html += `<p><strong>Высота:</strong> ${data.height} мм</p>`;
        
        // Двери
        if (data.doors.enabled) {
            html += `<p><strong>Двери:</strong> Да (цвет: ${data.doors.color})</p>`;
        } else {
            html += `<p><strong>Двери:</strong> Нет</p>`;
        }
        html += '</div>';
        
        // Правая колонка - секции и дополнительные параметры
        html += '<div style="flex: 1;">';
        html += '<h4 style="margin: 0 0 10px 0; color: #333;">Секции:</h4>';
        data.sections.forEach((section, index) => {
            html += `<p style="margin: 5px 0;"><strong>${index + 1}. ${section.name}:</strong><br>`;
            html += `&nbsp;&nbsp;${section.variant}<br>`;
            html += `&nbsp;&nbsp;Ширина: ${section.width} мм</p>`;
        });
        
        // Дополнительные параметры
        const hasAdditional = data.additionalParams.customDepth || data.additionalParams.lighting || 
                             data.additionalParams.doorSensor || data.additionalParams.assembly;
        
        if (hasAdditional) {
            html += '<h4 style="margin: 15px 0 10px 0; color: #333;">Дополнительно:</h4>';
            if (data.additionalParams.customDepth) {
                html += `<p style="margin: 5px 0;">• Глубина: ${data.additionalParams.depth} мм (+20%)</p>`;
            }
            if (data.additionalParams.lighting) {
                html += '<p style="margin: 5px 0;">• Подсветка (3000K, 24v)</p>';
            }
            if (data.additionalParams.doorSensor) {
                html += '<p style="margin: 5px 0;">• Датчик открывания двери</p>';
            }
            if (data.additionalParams.assembly) {
                html += '<p style="margin: 5px 0;">• Сборка</p>';
            }
        }
        html += '</div>';
        
        html += '</div>';
        
        // Цена и дата внизу
        html += '<div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">';
        
        // Получаем актуальную цену
        const priceData = this.calculateTotalPrice();
        
        // Детализация стоимости
        html += '<div style="margin-bottom: 15px;">';
        html += '<h4 style="margin: 0 0 10px 0; color: #333;">Расчет стоимости:</h4>';
        html += '<div style="display: grid; grid-template-columns: 1fr auto; gap: 8px; font-size: 14px; margin-bottom: 10px;">';
        html += `<div>Секции:</div><div style="text-align: right;">${priceData.sections.toLocaleString('ru-RU')} ₽</div>`;
        
        if (priceData.doors > 0) {
            html += `<div>Двери:</div><div style="text-align: right;">${priceData.doors.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        if (priceData.options > 0) {
            html += `<div>Опции:</div><div style="text-align: right;">${priceData.options.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        if (priceData.assembly > 0) {
            html += `<div>Сборка:</div><div style="text-align: right;">${priceData.assembly.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        if (priceData.depthSurcharge > 0) {
            html += `<div>Нестандартная глубина (+20%):</div><div style="text-align: right;">${priceData.depthSurcharge.toLocaleString('ru-RU')} ₽</div>`;
        }
        
        html += '</div>';
        html += '<div style="border-top: 1px solid #ccc; padding-top: 8px; display: flex; justify-content: space-between; align-items: center;">';
        html += `<div style="font-size: 18px; font-weight: bold; color: #333;">Итого: ${priceData.total.toLocaleString('ru-RU')} ₽</div>`;
        html += `<div style="color: #666; font-size: 12px;">Создано: ${data.timestamp}</div>`;
        html += '</div>';
        html += '</div>';
        
        html += '</div>';
        
        return html;
    }
    
    downloadTextFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }

    // Отладочная функция для проверки размеров
    debugSizeCalculations() {
        console.log('=== ОТЛАДКА РАЗМЕРОВ ===');
        console.log('Текущий макет:', this.currentLayout);
        console.log('Активная секция:', this.activeSection);
        
        const sectionData = this.sections.get(this.activeSection);
        if (sectionData) {
            const realWidth = sectionData.element.offsetWidth;
            const configWidth = sectionData.currentWidth;
            const calculatedMm = this.pixelsToMillimeters(configWidth, this.activeSection);
            const realMm = this.pixelsToMillimeters(realWidth, this.activeSection);
            const ratio = this.getConversionRatio(this.currentLayout, this.activeSection);
            
            console.log('Конфигурация секции:', sectionData.config);
            console.log('Текущая ширина (currentWidth):', configWidth);
            console.log('Реальная ширина DOM:', realWidth);
            console.log('Расчет мм (от currentWidth):', calculatedMm);
            console.log('Расчет мм (от реальной ширины):', realMm);
            console.log('Коэффициент для секции:', ratio);
            console.log('Ожидаемый коэффициент:', `1000 / ${configWidth} = ${(1000 / configWidth).toFixed(3)}`);
        }
        
        // Проверяем все секции
        console.log('\n=== ВСЕ СЕКЦИИ ===');
        this.sections.forEach((sectionData, sectionId) => {
            const realWidth = sectionData.element.offsetWidth;
            const configWidth = sectionData.currentWidth;
            const calculatedMm = this.pixelsToMillimeters(configWidth, sectionId);
            const ratio = this.getConversionRatio(this.currentLayout, sectionId);
            
            console.log(`${sectionId}:`, {
                'конфиг': `${configWidth}px`,
                'реальный': `${realWidth}px`,
                'расчет мм': calculatedMm,
                'коэффициент': ratio.toFixed(3)
            });
        });
    }
    
    // Функция для получения коэффициента конвертации
    getConversionRatio(layout, sectionId) {
        // Для 1-секционного варианта: 536px = 1000мм
        if (layout === '1-section') {
            return 1000 / 536;
        }
        
        // Для 2-секционного варианта: 528px = 1000мм
        if (layout === '2-sections') {
            return 1000 / 528;
        }
        
        // Для 3-секционного варианта
        if (layout === '3-sections') {
            // Центральная секция (section-2): 520px = 1000мм
            if (sectionId === 'section-2') {
                return 1000 / 520;
            }
            // Боковые секции (section-1, section-3): 528px = 1000мм
            return 1000 / 528;
        }
        
        // Для 4-секционного варианта
        if (layout === '4-sections') {
            // Секции с размером 520px (section-2, section-4): 520px = 1000мм
            if (sectionId === 'section-2' || sectionId === 'section-4') {
                return 1000 / 520;
            }
            // Секции с размером 528px (section-1, section-3): 528px = 1000мм
            return 1000 / 528;
        }
        
        // Стандартный коэффициент
        return 1.893939;
    }

    // Система расчета стоимости
    initPriceCalculator() {
        // Базовые цены вариантов секций при 1000мм
        this.sectionPrices = {
            'variant-1': 97060,  // k1 - Два ящика и штанга
            'variant-2': 84800,  // k2 - Только полки
            'variant-3': 121300, // k3 - Четыре ящика и штанга
            'variant-4': 73070,  // k4 - Полка и штанга
            'variant-5': 83600,  // k5 - Две штанги
            'variant-6': 108790  // k6 - Два ящика и полки
        };

        // Цены опций по количеству секций
        this.optionPrices = {
            lighting: {
                1: 26600,
                2: 39900,
                3: 53200,
                4: 66500
            },
            sensor: {
                1: 6800,
                2: 13600,
                3: 20400,
                4: 27200
            }
        };

        // Цены сборки по количеству секций
        this.assemblyPrices = {
            1: 17000,
            2: 20000,
            3: 25000,
            4: 28000
        };

        // Обновляем цену при любых изменениях
        this.updateTotalPrice();
    }

    // Расчет стоимости одной секции с учетом размера
    calculateSectionPrice(sectionData) {
        const variantId = sectionData.currentVariant.id;
        const basePrice = this.sectionPrices[variantId] || 0;
        const sectionWidthMm = this.pixelsToMillimeters(sectionData.currentWidth, sectionData.config.id);
        
        // Расчет пропорционально размеру
        // При 400мм: -30% (коэффициент 0.7)
        // При 1000мм: базовая цена (коэффициент 1.0)
        const minWidthMm = 400;
        const maxWidthMm = 1000;
        const minPriceCoeff = 0.7; // -30%
        const maxPriceCoeff = 1.0;
        
        // Линейная интерполяция между минимальным и максимальным коэффициентом
        const priceCoeff = minPriceCoeff + (maxPriceCoeff - minPriceCoeff) * 
                          (sectionWidthMm - minWidthMm) / (maxWidthMm - minWidthMm);
        
        // Ограничиваем коэффициент в пределах 0.7-1.0
        const clampedCoeff = Math.max(minPriceCoeff, Math.min(maxPriceCoeff, priceCoeff));
        
        return Math.round(basePrice * clampedCoeff);
    }

    // Расчет стоимости всех секций
    calculateSectionsPrice() {
        let totalSectionsPrice = 0;
        
        this.sections.forEach((sectionData) => {
            if (sectionData.currentVariant) {
                totalSectionsPrice += this.calculateSectionPrice(sectionData);
            }
        });
        
        return totalSectionsPrice;
    }

    // Расчет стоимости дверей
    calculateDoorsPrice() {
        if (!this.doorsEnabled) return 0;
        
        let totalDoorsPrice = 0;
        
        this.sections.forEach((sectionData) => {
            const sectionWidthMm = this.pixelsToMillimeters(sectionData.currentWidth, sectionData.config.id);
            const doorPrice = this.calculateDoorPrice(sectionWidthMm);
            totalDoorsPrice += doorPrice;
        });
        
        return totalDoorsPrice;
    }

    // Расчет стоимости одной двери по размеру
    calculateDoorPrice(widthMm) {
        // Опорные точки для расчета цены дверей
        const pricePoints = [
            { width: 400, price: 16700 },
            { width: 700, price: 19000 },
            { width: 701, price: 33400 },
            { width: 1000, price: 38000 }
        ];
        
        // Находим подходящий интервал для интерполяции
        for (let i = 0; i < pricePoints.length - 1; i++) {
            const point1 = pricePoints[i];
            const point2 = pricePoints[i + 1];
            
            if (widthMm >= point1.width && widthMm <= point2.width) {
                // Линейная интерполяция
                const ratio = (widthMm - point1.width) / (point2.width - point1.width);
                const price = point1.price + (point2.price - point1.price) * ratio;
                return Math.round(price);
            }
        }
        
        // Если выходит за пределы, используем крайние значения
        if (widthMm < 400) return 16700;
        if (widthMm > 1000) return 38000;
        
        return 0;
    }

    // Расчет стоимости опций
    calculateOptionsPrice() {
        const sectionsCount = this.sections.size;
        let optionsPrice = 0;
        
        // Подсветка
        if (this.additionalParams.lighting) {
            optionsPrice += this.optionPrices.lighting[sectionsCount] || 0;
        }
        
        // Датчик (только если есть подсветка и двери)
        if (this.additionalParams.sensor && this.additionalParams.lighting && this.doorsEnabled) {
            optionsPrice += this.optionPrices.sensor[sectionsCount] || 0;
        }
        
        return optionsPrice;
    }

    // Расчет стоимости сборки
    calculateAssemblyPrice() {
        if (!this.additionalParams.assembly) return 0;
        
        const sectionsCount = this.sections.size;
        return this.assemblyPrices[sectionsCount] || 0;
    }

    // Расчет общей стоимости
    calculateTotalPrice() {
        const sectionsPrice = this.calculateSectionsPrice();
        const doorsPrice = this.calculateDoorsPrice();
        const optionsPrice = this.calculateOptionsPrice();
        const assemblyPrice = this.calculateAssemblyPrice();
        
        let totalPrice = sectionsPrice + doorsPrice + optionsPrice + assemblyPrice;
        
        // Надбавка за нестандартную глубину (+20% к стоимости секций)
        if (this.globalSettings.customDepthEnabled) {
            const depthSurcharge = Math.round(sectionsPrice * 0.2);
            totalPrice += depthSurcharge;
        }
        
        return {
            sections: sectionsPrice,
            doors: doorsPrice,
            options: optionsPrice,
            assembly: assemblyPrice,
            depthSurcharge: this.globalSettings.customDepthEnabled ? Math.round(sectionsPrice * 0.2) : 0,
            total: totalPrice
        };
    }

    // Обновление отображения цены
    updateTotalPrice() {
        const priceData = this.calculateTotalPrice();
        const priceElement = document.getElementById('total-price');
        
        if (priceElement) {
            priceElement.textContent = `${priceData.total.toLocaleString('ru-RU')} ₽`;
            
            // Добавляем обработчик клика для показа/скрытия детализации
            priceElement.style.cursor = 'pointer';
            priceElement.onclick = () => {
                const priceDetailElement = document.getElementById('price-detail');
                if (priceDetailElement) {
                    const isVisible = priceDetailElement.style.display !== 'none';
                    priceDetailElement.style.display = isVisible ? 'none' : 'block';
                }
            };
        }
        
        // Обновляем детализацию цены если элемент существует
        const priceDetailElement = document.getElementById('price-detail');
        if (priceDetailElement) {
            priceDetailElement.innerHTML = `
                <div>Секции: ${priceData.sections.toLocaleString('ru-RU')} ₽</div>
                ${priceData.doors > 0 ? `<div>Двери: ${priceData.doors.toLocaleString('ru-RU')} ₽</div>` : ''}
                ${priceData.options > 0 ? `<div>Опции: ${priceData.options.toLocaleString('ru-RU')} ₽</div>` : ''}
                ${priceData.assembly > 0 ? `<div>Сборка: ${priceData.assembly.toLocaleString('ru-RU')} ₽</div>` : ''}
                ${priceData.depthSurcharge > 0 ? `<div>Нестандартная глубина: ${priceData.depthSurcharge.toLocaleString('ru-RU')} ₽</div>` : ''}
                <div><strong>Итого: ${priceData.total.toLocaleString('ru-RU')} ₽</strong></div>
            `;
        }
        
        // Синхронизируем мобильную панель
        this.updateMobileElements();
        
        console.log('Расчет цены:', priceData);
    }

}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.cabinetConstructor = new CabinetConstructor();
    
    // Глобальная функция для экстренной очистки подсказок (можно вызвать из консоли)
    window.clearTooltips = () => {
        if (window.cabinetConstructor) {
            window.cabinetConstructor.clearAllTooltips();
        }
    };
}); 

// Глобальная функция для отладки размеров
window.debugSizes = function() {
    if (window.constructor) {
        window.constructor.debugSizeCalculations();
    } else {
        console.log('Конструктор не найден');
    }
};

// Глобальная функция для тестирования цены
window.testPrice = function() {
    if (window.constructor) {
        const priceData = window.constructor.calculateTotalPrice();
        console.log('=== ТЕСТ КАЛЬКУЛЯТОРА ===');
        console.log('Секции:', priceData.sections.toLocaleString('ru-RU'), '₽');
        console.log('Двери:', priceData.doors.toLocaleString('ru-RU'), '₽');
        console.log('Опции:', priceData.options.toLocaleString('ru-RU'), '₽');
        console.log('Сборка:', priceData.assembly.toLocaleString('ru-RU'), '₽');
        console.log('Нестандартная глубина:', priceData.depthSurcharge.toLocaleString('ru-RU'), '₽');
        console.log('ИТОГО:', priceData.total.toLocaleString('ru-RU'), '₽');
        console.log('=========================');
    } else {
        console.log('Конструктор не найден');
    }
};

// Глобальная функция для очистки тултипов
window.clearTooltips = function() {
    if (window.constructor) {
        window.constructor.clearAllTooltips();
    }
};