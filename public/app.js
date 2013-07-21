$(function(){


/**
 * Создание объекта нашего приложения (namespace).
 */
window.app = {
    el: $("#app"),
    view: {},
    init: function() {
        app.view.statistics.render();
        app.view.nickname.render();
    }
};


/**
 * View для отрисовки экрана статистики.
 */
app.view.statistics = {
    el: $("#statistics"),
    template: $("#tpl-statistics").html(),
    model: {},

    init: function() {
        // TODO: Навесить события? "click .destroy" : empty
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
        // TODO: Навесить события? "click .destroy" : empty
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
 * View для отрисовки экрана списка игр.
 */
app.view.games = {
    el: $("#games"),
    template: $("#tpl-games").html(),
    model: {},

    init: function() {
        // TODO: Навесить события? "click .destroy" : empty
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
 * View для отрисовки экрана деталей игры.
 */
app.view.details = {
    el: $("#details"),
    template: $("#tpl-details").html(),
    model: {},

    init: function() {
        // TODO: Навесить события? "click .destroy" : empty
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
 * View для отрисовки экрана игры.
 */
app.view.game = {
    el: $("#game"),
    template: $("#tpl-game").html(),
    model: {},

    init: function() {
        // TODO: Навесить события? "click .destroy" : empty
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