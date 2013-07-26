;
$(function(){
    'use strict';


/**
 * Создание объекта нашего приложения (namespace).
 */
window.app = {
    el: $("#app"),
    view: {},
    router: {},
    currentView: null,
    socket: null,

    init: function() {
        //this.socket = io.connect('http://localhost');
        app.view.statistics.init();
        this.router.main.init();
    },

    goto: function(view, model) {
        if ((this.currentView != null) && (this.currentView.empty != "undefined")) {
            app.view[this.currentView].empty();
            app.view.error.empty();
        }

        this.currentView = view;
        app.view[view].init(model);
    }
};


/**
 * Router нашего приложения.
 */
app.router.main = {
    init: function() {
        this.nickname();
    },
    nickname: function(model) {
        app.goto("nickname", model);
    },
    games: function(model) {
        app.goto("games", model);
    },
    details: function(model) {
        app.goto("details", model);
    },
    game: function(model) {
        app.goto("game", model);
    },
    end: function(model) {
        app.goto("end", model);
    }
};


/**
 * View для отрисовки экрана статистики.
 */
app.view.statistics = {
    el: $("#statistics"),
    templates: {
        "main": $("#tpl-statistics").html(),
        "list": $("#tpl-statistics-data").html()
    },
    model: [],

    init: function(model) {
        this.model = model || this.model;
        this.render();

        if (model != undefined) {
            this.updateModel(model);
        } else {
            //app.socket.emit('запрос на статистику', "empty string");
        }

//        app.socket.on('свежая статистика', function (model) {
//            this.updateModel(model);
//        });
    },

    events: function() {
        // Тумблер для статистики
        $('#statistics-toggle').click(function() {
            var clicks = $(this).data('clicks');
            if (clicks) {
                $('#statistics-data').css("height", "0");
            } else {
                $('#statistics-data').css("height", "auto");
                $('#statistics-data').css("overflow-y", "visible");
            }
            $(this).data("clicks", !clicks);
        });

        // Статистика по клавише Esc
        $(document).keyup(function(e) {
            if(e.keyCode == 27) {
                $('#statistics-toggle').click();
            }
        });
    },

    render: function() {
        $(this.el).html(Mustache.render(this.templates["main"], {}));
        this.renderList();
        this.events();
    },

    renderList: function() {
        var context;

        if (this.model.length) {
            context = {
                "data": {
                    loop: this.model
                }
            };
        } else {
            context = {
                "data": this.model
            };
        }

        $('#statistics-data').html(Mustache.render(this.templates["list"], context));
    },

    updateModel: function(model) {
        this.model = model || this.model;
        this.renderList();
    },

    empty: function() {
        $(this.el).empty();
    }
};


/**
 * View для отрисовки сообщения об ошибке.
 */
app.view.error = {
    el: $("#error"),
    template: $("#tpl-error").html(),
    model: [],

    init: function(model) {
        this.model = model || this.model;
        this.render();
        // а можно было слушать отдельный канал для error
    },

    render: function() {
        if (!this.model.length) {
            return;
        }
        $(this.el).html(Mustache.render(this.template, this.model));
    },

    empty: function() {
        $(this.el).empty();
    }
};


/**
 * View для отрисовки экрана ввода имени.
 */
app.view.nickname = {
    el: $("#nickname"),
    template: $("#tpl-nickname").html(),

    init: function() {
        this.render();

//        app.socket.on('результат попытки регистрации', function (data) {
//            // code: рисую error или перехожу на след. этап
//        });
    },

    events: function() {
        var self = this;

        $("#nickname-username").keyup(function(e) {
            if(e.keyCode == 13) {
                // app.socket.emit('попытка регистрации', { name: 'Igor' });
                console.log(self.serialize());
            }
        });
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, {}));
        this.events();
    },

    serialize: function() {
        var username = $('#nickname-username').val();
        return {
            "username": username
        };
    },

    empty: function() {
        $(this.el).empty();
    }
};


/**
 * View для отрисовки экрана списка игр.
 */
app.view.games = {
    el: $("#games"),
    templates: {
        "main": $("#tpl-games").html(),
        "list": $("#tpl-games-choose-container").html()
    },
    model: [],

    init: function(model) {
        this.model = model || this.model;
        this.render();

        if (model != undefined) {
            this.updateModel(model);
        } else {
            //app.socket.emit('запрос на ожидающие игрока игры', "empty string");
        }

//        app.socket.on('свежий список игр ожидающих игрока', function (model) {
//            this.updateModel(model);
//        });

//        app.socket.on('результат попытки подключения к игре', function (data) {
//            // code: рисую error или перехожу на след. этап
//        });
    },

    events: function() {
        var self = this;

        $('#games-connect').click(function() {
            // app.socket.emit('попытка подключится к игре', { gameID: '43', userID: "27 aka Igor" });
            console.log(self.serialize());
        });
    },

    render: function() {
        $(this.el).html(Mustache.render(this.templates["main"], {}));
        this.renderList();
        this.events();
    },

    renderList: function() {
        var context;

        if (this.model.length) {
            context = {
                "data": {
                    loop: this.model
                }
            };
        } else {
            context = {
                "data": this.model
            };
        }

        $('#games-choose-container').html(Mustache.render(this.templates["list"], context));
    },

    serialize: function() {
        var gameID = $('#games-choose').val();
        return {
            "id": gameID
        };
    },

    updateModel: function(model) {
        this.model = model || this.model;
        this.renderList();
    },

    empty: function() {
        $(this.el).empty();
    }
};


/**
 * View для отрисовки экрана деталей игры.
 */
app.view.details = {
    el: $("#details"),
    template: $("#tpl-details").html(),

    init: function() {
        this.render();

//        app.socket.on('результат попытки создать новую игру', function (data) {
//            // code: рисую error или перехожу на след. этап
//        });
    },

    events: function() {
        var self = this;

        $('#details-create').click(function() {
            // app.socket.emit('попытка создать новую игру', { userID: '27 aka Igor' });
            console.log(self.serialize());
        });
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, {}));
        this.events();
    },

    serialize: function() {
        var type = $('#details-type').val();
        var lineup = $('#details-lineup').val();
        var dimensions = $('#details-dimensions').val();
        return {
            "dimensions": dimensions,
            "lineup": lineup,
            "type": type
        };
    },

    empty: function() {
        $(this.el).empty();
    }
};


/**
 * View для отрисовки экрана игры.
 */
app.view.game = {
    el: $("#game"),
    template: $("#tpl-game").html(),
    model: [
        {"x":"2", "y":"2", "type":"white"},
        {"x":"1", "y":"1", "type":"black"},
        {"x":"4", "y":"1", "type":"white"}
    ],

    init: function() {
        this.render();



        /* =========== Этот кусок (закомментированного) кода здесь просто-так. ====================================================== */
        /* =========== В отличие от всего остального, его еще предстоит распихать по своим местам. ============ */

//// Запросить данные об игре.
//        app.socket.emit('запрос на данные об игре', { hz: 'hz' });
//
//// Подписка на будущие изменения в статусе игры.
//        app.socket.on('данные об игре', function (data) {
//            // code: на основании этих данных я рисую поле и прочую хуйню
//        });
//
//// Запрос на проверку корректности хода.
//        app.socket.emit('попытка походить', { name: 'Igor' });
//
//// Подписка на успешную\неуспешную попытку хода.
//        app.socket.on('результат попытки походить', function (data) {
//            // code: рисую error или делаю ход (отрисовую ход)
//        });
//
//// Подписка на интересные факты (вход второго игрока, конец, чей ход) об игре. Статус игры.
//        app.socket.on('статус игры', function (data) {
//            // code: рисую сообщение (как error)
//        });

    },

    events: function() {
        var self = this;

        var resizeTimerID;
        $(window).resize(function() {
            console.log("resize");
            clearTimeout(resizeTimerID);
            resizeTimerID = setTimeout(self.setCellSize, 100);
        });

        $('[data-coordinates]:not([class])').click(function() {
            var coordinates = $(this).attr("data-coordinates").split(":");
            console.log(coordinates);
        });
    },

    render: function() {
        var quantity = 5; // Размер поля. Будет приходить извне.

        // Создание вспомогательного массива координат
        var cells = [];
        for(var y=1; y<=quantity; y++) {
            for(var x=1; x<=quantity; x++) {
                cells.push(x+":"+y);
            }
        }

        $(this.el).html(Mustache.render(this.template, cells));

        // Отрисовка каждой ячейки
        for(var i=0; i<this.model.length; i++) {
            var item = this.model[i];
            this.renderCell(item);
        }

        this.setCellSize();
        this.events();
    },

    setCellSize: function() {
        var quantity = 5; // Размер поля. Будет приходить извне.
        var width = $("#game-field").width();
        var size = Math.floor(width/quantity);
        $('[data-coordinates]').css({
            "width": size,
            "height": size
        });
    },

    // @data: {"x":"2", "y":"2", "type":"white"}
    renderCell: function(data) {
        $('[data-coordinates="'+ data.x + ":" + data.y +'"]').addClass(data.type);
    },

    empty: function() {
        $(this.el).empty();
    }
};


/**
 * View для отрисовки экрана окончания игры.
 */
app.view.end = {
    el: $("#end"),
    template: $("#tpl-end").html(),
    model: {},

    init: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model));
    },

    empty: function() {
        $(this.el).empty();
    }
};


/**
 * Инициализация нашего приложения.
 */
app.init();


});