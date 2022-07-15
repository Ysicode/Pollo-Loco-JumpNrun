let level1;

function initLevel() {
    level1 = new Level(
        [
            new Audio('audio/music.mp3'),
            new Audio('audio/endboss.mp3'),
            new Audio('audio/end.mp3'),
            new Audio('audio/chciken.mp3'),
            new Audio('audio/select.mp3')
        ],
        [
            new Chicken(800 + Math.random() * 500), //enemies
            new Chicken(800 + Math.random() * 500),
            new Chicken(800 + Math.random() * 500),
            new Chicken(1500 + Math.random() * 500),
            new Chicken(1500 + Math.random() * 500),
            new Chicken(1500 + Math.random() * 500),
            new Chicken(2500 + Math.random() * 500),
            new Chicken(2500 + Math.random() * 500),
            new Chicken(2500 + Math.random() * 500),
            new Chicken(3500 + Math.random() * 500),
            new Chicken(3500 + Math.random() * 500),
            new Chicken(5000 + Math.random() * 500),
            new Chicken(5000 + Math.random() * 500),
            new Chicken(5000 + Math.random() * 500),
            new Chicken(5000 + Math.random() * 500),
            new Chicken(6000 + Math.random() * 500),
            new Chicken(6000 + Math.random() * 500),
            new Chicken(7000 + Math.random() * 500),
            new Chicken(7000 + Math.random() * 500),
            new Chicken(7000 + Math.random() * 500),
            new Chicken(7000 + Math.random() * 500),
            new Chicken(7000 + Math.random() * 500),
            new Chicken(7000 + Math.random() * 500),
            new Chick(3500 + Math.random() * 700), //enemies
            new Chick(3500 + Math.random() * 800),
            new Chick(6500 + Math.random() * 900),
            new Chick(6500 + Math.random() * 700), //enemies
            new Chick(7500 + Math.random() * 800),
            new Chick(7500 + Math.random() * 900),
            new Chick(10500 + Math.random() * 700), //enemies
            new Chick(10500 + Math.random() * 800),
            new Chick(11500 + Math.random() * 900),
            new Chick(11500 + Math.random() * 700), //enemies
            new Chick(11500 + Math.random() * 800),
            new Chick(14500 + Math.random() * 900),
            new Chick(14500 + Math.random() * 700), //enemies
            new Chick(17500 + Math.random() * 800),
            new Chick(17500 + Math.random() * 900),
            new Chick(18000 + Math.random() * 700), //enemies
            new Chick(18000 + Math.random() * 800),
            new Chick(20000 + Math.random() * 900),
            new Chick(20500 + Math.random() * 700), //enemies
            new Chick(25500 + Math.random() * 800),
            new Chick(25500 + Math.random() * 900),
            new Chick(25500 + Math.random() * 700), //enemies
            new Chick(25500 + Math.random() * 800),
            new Chick(30500 + Math.random() * 900),
            new Chick(30500 + Math.random() * 700), //enemies
            new Chick(35500 + Math.random() * 800),
            new Chick(35500 + Math.random() * 900),
        ],
            new Endboss(719 * 10),
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', Math.random() * 500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 800),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1400),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 4000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 5000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 5500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 6500) //clouds
        ],
        [//backgrounds
            new Background('img/5_background/layers/air.png', 0, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 0, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 0, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 0, 0),
    
            new Background('img/5_background/layers/air.png', 719, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 719, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 719, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 719, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 2, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 3, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 4, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 4, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 4, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 4, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 5, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 719 * 5, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 719 * 5, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 719 * 5, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 6, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 6, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 6, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 6, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 7, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 719 * 7, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 719 * 7, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 719 * 7, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 8, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 8, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 8, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 8, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 9, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 719 * 9, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 719 * 9, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 719 * 9, 0),
    
            new Background('img/5_background/layers/air.png', 719 * 10, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 719 * 10, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 719 * 10, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 719 * 10, 0)
        ],
        [
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 1000, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 1100, 100),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 1200, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 1300, 100),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 1400, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 2000, 100),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 2200, 100),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 3000, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 3100, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 3200, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 4000, 350),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 4050, 350),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 4100, 350),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 4000, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 4050, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 4100, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 5200, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 5400, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 5600, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6100, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6200, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6300, 100),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6400, 100),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6500, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6600, 200),
    
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7100, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7100, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7100, 250),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7100, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7050, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7050, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7050, 250),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7050, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7000, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7000, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7000, 250),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 7000, 300),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6950, 150),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6950, 200),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6950, 250),
            new Bottles('img/7_statusbars/3_icons/icon_salsa_bottle.png', 6950, 300)
        ],
        [
            new Coin(300, 300),
            new Coin(400, 300),
            new Coin(500, 300),
            new Coin(600, 300),
            new Coin(2080, 100),
            new Coin(2080, 150),
            new Coin(2080, 200),
            new Coin(2080, 250),
            new Coin(3025, 200),
            new Coin(3125, 200),
            new Coin(3900, 225),
            new Coin(4025, 225),
            new Coin(4125, 225),
            new Coin(5300, 200),
            new Coin(5500, 300),
            new Coin(6200, 300),
            new Coin(6300, 300),
            new Coin(6400, 300)
        ]
    );
}


