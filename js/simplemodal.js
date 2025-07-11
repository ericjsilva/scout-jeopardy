/*
 * SimpleModal 1.3.3 - jQuery Plugin
 * http://www.ericmmartin.com/projects/simplemodal/
 * Copyright (c) 2009 Eric Martin (http://twitter.com/EricMMartin)
 * Dual licensed under the MIT and GPL licenses
 * Revision: $Id: jquery.simplemodal.js 228 2009-10-30 13:34:27Z emartin24 $
 */
;
(function($) {
    var ie6 = $.browser.msie && parseInt($.browser.version) == 6 && typeof window['XMLHttpRequest'] != "object",
        ieQuirks = null,
        w = [];
    $.modal = function(data, options) {
        return $.modal.impl.init(data, options);
    };
    $.modal.close = function() {
        $.modal.impl.close();
    };
    $.fn.modal = function(options) {
        return $.modal.impl.init(this, options);
    };
    $.modal.defaults = {
        appendTo: 'body',
        focus: true,
        opacity: 50,
        overlayId: 'simplemodal-overlay',
        overlayCss: {},
        containerId: 'simplemodal-container',
        containerCss: {},
        dataId: 'simplemodal-data',
        dataCss: {},
        minHeight: 200,
        minWidth: 300,
        maxHeight: null,
        maxWidth: null,
        autoResize: false,
        autoPosition: true,
        zIndex: 1000,
        close: true,
        closeHTML: '<a class="modalCloseImg" title="Close"></a>',
        closeClass: 'simplemodal-close',
        escClose: true,
        overlayClose: false,
        position: null,
        persist: false,
        onOpen: null,
        onShow: null,
        onClose: null
    };
    $.modal.impl = {
        o: null,
        d: {},
        init: function(data, options) {
            var s = this;
            if (s.d.data) {
                return false;
            }
            ieQuirks = $.browser.msie && !$.boxModel;
            s.o = $.extend({}, $.modal.defaults, options);
            s.zIndex = s.o.zIndex;
            s.occb = false;
            if (typeof data == 'object') {
                data = data instanceof jQuery ? data : $(data);
                if (data.parent().parent().size() > 0) {
                    s.d.parentNode = data.parent();
                    if (!s.o.persist) {
                        s.d.orig = data.clone(true);
                    }
                }
            } else if (typeof data == 'string' || typeof data == 'number') {
                data = $('<div></div>').html(data);
            } else {
                alert('SimpleModal Error: Unsupported data type: ' + typeof data);
                return s;
            }
            s.create(data);
            data = null;
            s.open();
            if ($.isFunction(s.o.onShow)) {
                s.o.onShow.apply(s, [s.d]);
            }
            return s;
        },
        create: function(data) {
            var s = this;
            w = s.getDimensions();
            if (ie6) {
                s.d.iframe = $('<iframe src="javascript:false;"></iframe>').css($.extend(s.o.iframeCss, {
                    display: 'none',
                    opacity: 0,
                    position: 'fixed',
                    height: w[0],
                    width: w[1],
                    zIndex: s.o.zIndex,
                    top: 0,
                    left: 0
                })).appendTo(s.o.appendTo);
            }
            s.d.overlay = $('<div></div>').attr('id', s.o.overlayId).addClass('simplemodal-overlay').css($.extend(s.o.overlayCss, {
                display: 'none',
                opacity: s.o.opacity / 100,
                height: w[0],
                width: w[1],
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: s.o.zIndex + 1
            })).appendTo(s.o.appendTo);
            s.d.container = $('<div></div>').attr('id', s.o.containerId).addClass('simplemodal-container').css($.extend(s.o.containerCss, {
                display: 'none',
                position: 'fixed',
                zIndex: s.o.zIndex + 2
            })).append(s.o.close && s.o.closeHTML ? $(s.o.closeHTML).addClass(s.o.closeClass) : '').appendTo(s.o.appendTo);
            s.d.wrap = $('<div></div>').attr('tabIndex', -1).addClass('simplemodal-wrap').css({
                height: '100%',
                outline: 0,
                width: '100%'
            }).appendTo(s.d.container);
            s.d.data = data.attr('id', data.attr('id') || s.o.dataId).addClass('simplemodal-data').css($.extend(s.o.dataCss, {
                display: 'none'
            })).appendTo('body');
            data = null;
            s.setContainerDimensions();
            s.d.data.appendTo(s.d.wrap);
            if (ie6 || ieQuirks) {
                s.fixIE();
            }
        },
        bindEvents: function() {
            var s = this;
            $('.' + s.o.closeClass).bind('click.simplemodal', function(e) {
                e.preventDefault();
                s.close();
            });
            if (s.o.close && s.o.overlayClose) {
                s.d.overlay.bind('click.simplemodal', function(e) {
                    e.preventDefault();
                    s.close();
                });
            }
            $(document).bind('keydown.simplemodal', function(e) {
                if (s.o.focus && e.keyCode == 9) {
                    s.watchTab(e);
                } else if ((s.o.close && s.o.escClose) && e.keyCode == 27) {
                    e.preventDefault();
                    s.close();
                }
            });
            $(window).bind('resize.simplemodal', function() {
                w = s.getDimensions();
                s.setContainerDimensions(true);
                if (ie6 || ieQuirks) {
                    s.fixIE();
                } else {
                    s.d.iframe && s.d.iframe.css({
                        height: w[0],
                        width: w[1]
                    });
                    s.d.overlay.css({
                        height: w[0],
                        width: w[1]
                    });
                }
            });
        },
        unbindEvents: function() {
            $('.' + this.o.closeClass).unbind('click.simplemodal');
            $(document).unbind('keydown.simplemodal');
            $(window).unbind('resize.simplemodal');
            this.d.overlay.unbind('click.simplemodal');
        },
        fixIE: function() {
            var s = this,
                p = s.o.position;
            $.each([s.d.iframe || null, s.d.overlay, s.d.container], function(i, el) {
                if (el) {
                    var bch = 'document.body.clientHeight',
                        bcw = 'document.body.clientWidth',
                        bsh = 'document.body.scrollHeight',
                        bsl = 'document.body.scrollLeft',
                        bst = 'document.body.scrollTop',
                        bsw = 'document.body.scrollWidth',
                        ch = 'document.documentElement.clientHeight',
                        cw = 'document.documentElement.clientWidth',
                        sl = 'document.documentElement.scrollLeft',
                        st = 'document.documentElement.scrollTop',
                        s = el[0].style;
                    s.position = 'absolute';
                    if (i < 2) {
                        s.removeExpression('height');
                        s.removeExpression('width');
                        s.setExpression('height', '' + bsh + ' > ' + bch + ' ? ' + bsh + ' : ' + bch + ' + "px"');
                        s.setExpression('width', '' + bsw + ' > ' + bcw + ' ? ' + bsw + ' : ' + bcw + ' + "px"');
                    } else {
                        var te, le;
                        if (p && p.constructor == Array) {
                            var top = p[0] ? typeof p[0] == 'number' ? p[0].toString() : p[0].replace(/px/, '') : el.css('top').replace(/px/, '');
                            te = top.indexOf('%') == -1 ? top + ' + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"' : parseInt(top.replace(/%/, '')) + ' * ((' + ch + ' || ' + bch + ') / 100) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
                            if (p[1]) {
                                var left = typeof p[1] == 'number' ? p[1].toString() : p[1].replace(/px/, '');
                                le = left.indexOf('%') == -1 ? left + ' + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"' : parseInt(left.replace(/%/, '')) + ' * ((' + cw + ' || ' + bcw + ') / 100) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
                            }
                        } else {
                            te = '(' + ch + ' || ' + bch + ') / 2 - (this.offsetHeight / 2) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
                            le = '(' + cw + ' || ' + bcw + ') / 2 - (this.offsetWidth / 2) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
                        }
                        s.removeExpression('top');
                        s.removeExpression('left');
                        s.setExpression('top', te);
                        s.setExpression('left', le);
                    }
                }
            });
        },
        focus: function(pos) {
            var s = this,
                p = pos || 'first';
            var input = $(':input:enabled:visible:' + p, s.d.wrap);
            input.length > 0 ? input.focus() : s.d.wrap.focus();
        },
        getDimensions: function() {
            var el = $(window);
            var h = $.browser.opera && $.browser.version > '9.5' && $.fn.jquery <= '1.2.6' ? document.documentElement['clientHeight'] : $.browser.opera && $.browser.version < '9.5' && $.fn.jquery > '1.2.6' ? window.innerHeight : el.height();
            return [h, el.width()];
        },
        getVal: function(v) {
            return v == 'auto' ? 0 : v.indexOf('%') > 0 ? v : parseInt(v.replace(/px/, ''));
        },
        setContainerDimensions: function(resize) {
            var s = this;
            if (!resize || (resize && s.o.autoResize)) {
                var ch = s.getVal(s.d.container.css('height')),
                    cw = s.getVal(s.d.container.css('width')),
                    dh = s.d.data.outerHeight(true),
                    dw = s.d.data.outerWidth(true);
                var mh = s.o.maxHeight && s.o.maxHeight < w[0] ? s.o.maxHeight : w[0],
                    mw = s.o.maxWidth && s.o.maxWidth < w[1] ? s.o.maxWidth : w[1];
                if (!ch) {
                    if (!dh) {
                        ch = s.o.minHeight;
                    } else {
                        if (dh > mh) {
                            ch = mh;
                        } else if (dh < s.o.minHeight) {
                            ch = s.o.minHeight;
                        } else {
                            ch = dh;
                        }
                    }
                } else {
                    ch = ch > mh ? mh : ch;
                }
                if (!cw) {
                    if (!dw) {
                        cw = s.o.minWidth;
                    } else {
                        if (dw > mw) {
                            cw = mw;
                        } else if (dw < s.o.minWidth) {
                            cw = s.o.minWidth;
                        } else {
                            cw = dw;
                        }
                    }
                } else {
                    cw = cw > mw ? mw : cw;
                }
                s.d.container.css({
                    height: ch,
                    width: cw
                });
                if (dh > ch || dw > cw) {
                    s.d.wrap.css({
                        overflow: 'auto'
                    });
                }
            }
            if (s.o.autoPosition) {
                s.setPosition();
            }
        },
        setPosition: function() {
            var s = this,
                top, left, hc = (w[0] / 2) - (s.d.container.outerHeight(true) / 2),
                vc = (w[1] / 2) - (s.d.container.outerWidth(true) / 2);
            if (s.o.position && Object.prototype.toString.call(s.o.position) === "[object Array]") {
                top = s.o.position[0] || hc;
                left = s.o.position[1] || vc;
            } else {
                top = hc;
                left = vc;
            }
            s.d.container.css({
                left: left,
                top: top
            });
        },
        watchTab: function(e) {
            var s = this;
            if ($(e.target).parents('.simplemodal-container').length > 0) {
                s.inputs = $(':input:enabled:visible:first, :input:enabled:visible:last', s.d.data[0]);
                if ((!e.shiftKey && e.target == s.inputs[s.inputs.length - 1]) || (e.shiftKey && e.target == s.inputs[0]) || s.inputs.length == 0) {
                    e.preventDefault();
                    var pos = e.shiftKey ? 'last' : 'first';
                    setTimeout(function() {
                        s.focus(pos);
                    }, 10);
                }
            } else {
                e.preventDefault();
                setTimeout(function() {
                    s.focus();
                }, 10);
            }
        },
        open: function() {
            var s = this;
            s.d.iframe && s.d.iframe.show();
            if ($.isFunction(s.o.onOpen)) {
                s.o.onOpen.apply(s, [s.d]);
            } else {
                s.d.overlay.show();
                s.d.container.show();
                s.d.data.show();
            }
            s.focus();
            s.bindEvents();
        },
        close: function() {
            var s = this;
            if (!s.d.data) {
                return false;
            }
            s.unbindEvents();
            if ($.isFunction(s.o.onClose) && !s.occb) {
                s.occb = true;
                s.o.onClose.apply(s, [s.d]);
            } else {
                if (s.d.parentNode) {
                    if (s.o.persist) {
                        s.d.data.hide().appendTo(s.d.parentNode);
                    } else {
                        s.d.data.hide().remove();
                        s.d.orig.appendTo(s.d.parentNode);
                    }
                } else {
                    s.d.data.hide().remove();
                }
                s.d.container.hide().remove();
                s.d.overlay.hide().remove();
                s.d.iframe && s.d.iframe.hide().remove();
                s.d = {};
            }
        }
    };
})(jQuery);
