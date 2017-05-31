/**
 * Created by amilab on 5/26/17.
 */

var LiteChat = LiteChat || {};
LiteChat.Common = (function () {

    return {

        sendAjax: function (url, data, successCallback, failCallback) {
            var ajaxObj = {
                url: url,
                type: "post",
                timeout: 3000,
                success: function (data, textStatus, jqXHR) {
                    $.isFunction(successCallback) && successCallback(data, textStatus, jqXHR);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.isFunction(failCallback) && failCallback(jqXHR, textStatus, errorThrown);
                }
            };
            if (data) {
                ajaxObj.data = data;
            }
            $.ajax(ajaxObj);
        },

        prompt: function (message, onMessage) {
            var answer = window.prompt(message);
            if ($.isFunction(onMessage)) {
                onMessage.call(this, answer);
            }
        }

    }


})();

LiteChat.Main = (function () {

    return {

        addMessage: function (message) {
            var $message = $("<div>", {
                "class": "message",
                "text" : message
            });
            $(".chat-box .chat-holder").append($message);
        }
    }


})();
