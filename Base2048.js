(function ($) // début du pluggin
{
    $.fn.game2048 = function () //function game2048 du pluggin
    {
        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generate_map() {
            var table = $('<table></table>');
            for (var y = 0; y < 4; y++) {
                var ligne = $('<tr></tr>');
                for (var x = 0; x < 4; x++) {
                    var cases = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    ligne.append(cases);
                }
                table.append(ligne);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generate_case(cases) {
            for (var i = 0; i < cases; i++) {
                var x = Math.floor((Math.random() * 4));
                var y = Math.floor((Math.random() * 4));
                var value = 2 * (Math.floor((Math.random() * 2) + 1));
                var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                if (value === 4 && Math.random() > 0.5)
                    value = 2;
                if (!elem[0])
                    generate_case(1);
                else {
                    elem.attr('nbr', value);
                    elem.text(value);
                }
            }
        }

        function moveTiles(elemA, elemB, valueB) {
            elemA.attr("nbr", valueB);
            elemA.text(valueB);
            console.log(elemA);
            console.log(elemB);
            if (elemA.attr("x") != elemB.attr("x") || elemA.attr("y") != elemB.attr("y")) {
                elemB.attr("nbr", 0);
                elemB.text("0");
            }
        }
        function mergeTiles(elemA, elemB, valuA) {
            var sum = valuA * 2;
            elemA.attr("nbr", sum);
            elemA.text(sum);
            elemB.attr("nbr", 0);
            elemB.text("0");
        }

        function my_move_left() {
            var moved = false;
            for (var i = 0; i < 4; i++) {
                var lastCase = -1;

                for (var j = 0; j < 4; j++) {
                    var lastCaseElement = $('[x=' + lastCase + '][y=' + i + ']');
                    var lastCaseValue = parseInt(lastCaseElement.attr("nbr"));

                    var currentElement = $('[x=' + j + '][y=' + i + ']');
                    var currentValue = parseInt(currentElement.attr("nbr"));

                    var nextElement = $('[x=' + (lastCase + 1) + '][y=' + i + ']');

                    if (currentValue != 0) {
                        if (currentValue == lastCaseValue) {
                            moved = true;
                            mergeTiles(lastCaseElement, currentElement, lastCaseValue);
                        } else {
                            if (nextElement.attr("x") != currentElement.attr("x") || nextElement.attr("y") != currentElement.attr("y"))
                                moved = true;
                            moveTiles(nextElement, currentElement, currentValue);
                            lastCase++;
                        }
                    }
                }
            }
            if (moved)
                generate_case(1);
        }

        function my_move_right() {
            var moved = false;
            for (var i = 0; i < 4; i++) {
                var lastCase = 4;

                for (var j = 3; j >= 0; j--) {
                    var lastCaseElement = $('[x=' + lastCase + '][y=' + i + ']');
                    var lastCaseValue = parseInt(lastCaseElement.attr("nbr"));

                    var currentElement = $('[x=' + j + '][y=' + i + ']');
                    var currentValue = parseInt(currentElement.attr("nbr"));

                    var nextElement = $('[x=' + (lastCase - 1) + '][y=' + i + ']');

                    if (currentValue != 0) {
                        if (currentValue == lastCaseValue) {
                            moved = true;
                            mergeTiles(lastCaseElement, currentElement, lastCaseValue);
                        } else {
                            if (nextElement.attr("x") != currentElement.attr("x") || nextElement.attr("y") != currentElement.attr("y"))
                                moved = true;
                            moveTiles(nextElement, currentElement, currentValue);
                            lastCase--;
                        }
                    }
                }
            }
            if (moved)
                generate_case(1);
        }

        function my_move_down() {
            var moved = false;
            for (var j = 0; j < 4; j++) {
                var lastCase = 4;

                for (var i = 3; i >= 0; i--) {
                    var lastCaseElement = $('[x=' + j + '][y=' + lastCase + ']');
                    var lastCaseValue = parseInt(lastCaseElement.attr("nbr"));

                    var currentElement = $('[x=' + j + '][y=' + i + ']');
                    var currentValue = parseInt(currentElement.attr("nbr"));

                    var nextElement = $('[x=' + j + '][y=' + (lastCase - 1) + ']');

                    if (currentValue != 0) {
                        if (currentValue == lastCaseValue) {
                            moved = true;
                            mergeTiles(lastCaseElement, currentElement, lastCaseValue);
                        } else {
                            if (nextElement.attr("x") != currentElement.attr("x") || nextElement.attr("y") != currentElement.attr("y"))
                                moved = true;
                            moveTiles(nextElement, currentElement, currentValue);
                            lastCase--;
                        }
                    }
                }
            }
            if (moved)
                generate_case(1);
        }

        function my_move_up() {
            var moved = false;
            for (var j = 0; j < 4; j++) {
                var lastCase = -1;

                for (var i = 0; i < 4; i++) {
                    var lastCaseElement = $('[x=' + j + '][y=' + lastCase + ']');
                    var lastCaseValue = parseInt(lastCaseElement.attr("nbr"));

                    var currentElement = $('[x=' + j + '][y=' + i + ']');
                    var currentValue = parseInt(currentElement.attr("nbr"));

                    var nextElement = $('[x=' + j + '][y=' + (lastCase + 1) + ']');

                    if (currentValue != 0) {
                        if (currentValue == lastCaseValue) {
                            moved = true;
                            mergeTiles(lastCaseElement, currentElement, lastCaseValue);
                        } else {
                            if (nextElement.attr("x") != currentElement.attr("x") || nextElement.attr("y") != currentElement.attr("y"))
                                moved = true;
                            moveTiles(nextElement, currentElement, currentValue);
                            lastCase++;
                        }
                    }
                }
            }
            if (moved)
                generate_case(1);
        }



        // fonction de gestion des évenements (appuie de touches) //check if its possible to move(possible move,perform nextmove and add random tile)
        $('html').keydown(function (event) {
            event.preventDefault();
            switch (event['key']) {
                case 'ArrowLeft':
                    // insérer algo move left
                    my_move_left();
                    console.log("Left");
                    break;
                case 'ArrowUp':
                    // insérer algo move up
                    my_move_up();
                    console.log("Up");
                    break;
                case 'ArrowRight':
                    // insérer algo move right
                    my_move_right();
                    console.log("Right");
                    break;
                case 'ArrowDown':
                    // insérer algo move down
                    my_move_down();
                    console.log("Down");
                    break;
            }
        });

        // début du code lancé
        $(this).append(generate_map()); // génération du tableau vide
        generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)

    }

})(jQuery); // fin du pluggin