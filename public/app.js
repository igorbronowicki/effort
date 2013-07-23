$(function(){


/**
 * Создание объекта нашего приложения (namespace).
 */
window.app = {
    el: $("#app"),
    view: {},
    init: function() {
//        app.view.statistics.init();
//        app.view.statistics.render();
//        app.view.nickname.render();
        app.view.game.render();
    }
};


/**
 * View для отрисовки экрана статистики.
 */
app.view.statistics = {
    el: $("#statistics"),
    template: $("#tpl-statistics").html(),
    model: {
        "data": {
            loop: [
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" }
            ]
        }
    },
    model2: {
        "data": []
    },
    model3: {
        "data": {
            loop: [
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" },
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" },
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" },
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" },
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" },
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" },
                { "name": "Lucie", quantity: "5", wins: "4", losses: "1", ties: "0" },
                { "name": "Stanley", quantity: "5", wins: "1", losses: "4", ties: "0" }
            ]
        }
    },

    init: function() {
        // TODO: Слушать WebSocket и реагировать?
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
        $(this.el).html(Mustache.render(this.template, this.model3));
        this.events();

        return this;
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
    model: {},

    init: function() {
        // TODO: Слушать WebSocket и реагировать?
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model));

        return this;
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
    model: {},

    init: function() {
        // TODO: Слушать WebSocket и реагировать?
    },

    events: function() {
        var self = this;

        $("#nickname-nickname").keyup(function(e) {
            if(e.keyCode == 13) {
                self.send();
            }
        });
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model));
        this.events();

        return this;
    },

    send: function() {
        // TODO:
        alert("send nickname data");
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
    template: $("#tpl-games").html(),
    model: {
        "data": {
            loop: [
                { "id": "0", title: "Lucie, 15x15, 4, black" },
                { "id": "1", title: "Jacob, 4x4, 3, white" },
                { "id": "2", title: "Cody, 6x6, 4, white" },
                { "id": "3", title: "Stanley, 3x3, 3, black" }
            ]
        }
    },
    model2: {
        "data": []
    },
    model3: {
        "data": {
            loop: [
                { "id": "0", title: "Lucie, 15x15, 4, black" },
                { "id": "1", title: "Jacob, 4x4, 3, white" },
                { "id": "2", title: "Cody, 6x6, 4, white" },
                { "id": "3", title: "Stanley, 3x3, 3, black" },
                { "id": "4", title: "Lucie, 15x15, 4, black" },
                { "id": "5", title: "Jacob, 4x4, 3, white" },
                { "id": "6", title: "Cody, 6x6, 4, white" },
                { "id": "7", title: "Stanley, 3x3, 3, black" },
                { "id": "8", title: "Lucie, 15x15, 4, black" },
                { "id": "9", title: "Jacob, 4x4, 3, white" },
                { "id": "10", title: "Cody, 6x6, 4, white" },
                { "id": "11", title: "Stanley, 3x3, 3, black" }
            ]
        }
    },

    init: function() {
        // TODO: Слушать WebSocket и реагировать?
    },

    events: function() {
        $('#games-connect').click(this.send);
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model));
        this.events();

        return this;
    },

    send: function() {
        // TODO:
        alert("send games data");
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
    model: {},

    init: function() {
        // TODO: Слушать WebSocket и реагировать?
    },

    events: function() {
        $('#details-create').click(this.send);
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model));
        this.events();

        return this;
    },

    send: function() {
        // TODO:
        alert("send details data");
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
        // TODO: Слушать WebSocket и реагировать?
    },

    render: function() {
        var quantity = 5; // Размер поля. Будет приходить извне.
        var cells = [];
        for(var i=1; i<=quantity; i++) {
            for(var j=1; j<=quantity; j++) {
                cells.push(i+":"+j);
            }
        }
        $(this.el).html(Mustache.render(this.template, cells));
        for(var i=0; i<this.model.length; i++) {
            var item = this.model[i];
            this.renderCell(item);
        }

        return this;
    },

    // @data: {"x":"2", "y":"2", "type":"white"}
    renderCell: function(data) {
        $('[data-coordinates="'+ data.x + ":" + data.y +'"]').addClass(data.type);
    },

    send: function() {
        // TODO:
        alert("send game data");
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
        // TODO: Слушать WebSocket и реагировать?
    },

    render: function() {
        $(this.el).html(Mustache.render(this.template, this.model));

        return this;
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