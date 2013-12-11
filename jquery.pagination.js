/**
 File:        jquery.pagination.js
 Version:     1.0.1
 Author:      Muhamad Hanafiah Yahya @ ibnuyahya ( hanafiahyahya.blogspot.com )
 source:      https://github.com/hanafiah/pagination


 Copyright (c) 2013 ibnuyahya
 http://opensource.org/licenses/MIT

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
(function($) {
    $.fn.pagination = function(options) {
        var base = this;
        var cache = {
            json: {},
            iLower: 0,
            iUpper: 0
        };
        var data = {};
        var postData = '';
        var defaults = {
            ajaxSource: '',
            iCurrentPage: 1,
            pageLength: 5,
            itemsOnPage: 10,
            callback: function() {
            }
        };
        var settings = $.extend({}, defaults, options);
        cache.offset = (settings.iCurrentPage - 1) * settings.itemsOnPage;
        cache.limit = settings.itemsOnPage * (settings.pageLength * 3);


        var fnGetData = function() {
            postData = {
                offset: cache.offset,
                limit: cache.limit
            };
//            $.ajaxSetup({
//                async: false
//            });

            $.ajax({
                type: "POST",
                url: settings.ajaxSource,
                data: postData,
                success: function(d) {
                    cache.json = jQuery.extend(true, {}, d);
                    cache.iLower = cache.json.start;
                    cache.iUpper = cache.json.start + cache.json.limit;
                },
                dataType: 'json',
                async: false
            });
//            $.getJSON(settings.ajaxSource, postData, function(d) {
//                cache.json = jQuery.extend(true, {}, d);
//                cache.iLower = cache.json.start;
//                cache.iUpper = cache.json.start + cache.json.limit;
//            });
        };

        var fnDraw = function(iPage) {
            settings.iCurrentPage = parseInt(iPage);
            fnRenderPaging();
            fnSentData();
        };

        var fnSentData = function() {
            iOffset = (settings.iCurrentPage - 1) * settings.itemsOnPage;
            iLimit = settings.itemsOnPage;

            //check if require pull data
            if (cache.iLower < 0 || iOffset < cache.iLower || (iOffset + iLimit) > cache.iUpper)
            {
                cache.offset = iOffset - Math.floor(settings.pageLength * settings.itemsOnPage);
                if (cache.offset < 0) {
                    cache.offset = 0;
                }
                fnGetData();
            }
            if (typeof cache.json.data != "undefined") {
                if (Object.keys(cache.json.data).length > 0) {
                    data = cache.json.data.slice(iOffset - cache.iLower, iLimit + iOffset - cache.iLower);
                }
            }
            if (typeof settings.callback == 'function') { // make sure the callback is a function
                settings.callback(data); // brings the scope to the callback
            }
        };

        var fnRenderPaging = function() {
            if (typeof cache.json.total != 'undefined') {
                settings.iTotalPages = Math.ceil(cache.json.total / settings.itemsOnPage);
                var iHalf = Math.floor(settings.pageLength / 2);
                if (settings.iTotalPages < settings.pageLength) {
                    iStart = 1;
                    iEnd = settings.iTotalPages;
                } else if (settings.iCurrentPage <= iHalf) {
                    iStart = 1;
                    iEnd = settings.pageLength;
                } else if (settings.iCurrentPage >= (settings.iTotalPages - iHalf)) {
                    iStart = settings.iTotalPages - settings.pageLength + 1;
                    iEnd = settings.iTotalPages;
                } else {
                    iStart = settings.iCurrentPage - iHalf;
                    iEnd = iStart + settings.pageLength - 1;
                }

                $('li:gt(0)', base).filter(':not(.next,.last)').remove();
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == settings.iCurrentPage) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#' + j + '">' + j + '</a></li>')
                            .insertBefore($('.next,.last', base)[0])
                            .bind('click', function(e) {
                                e.preventDefault();
                                fnDraw($('a', this).attr('href').slice(1));
                            });
                }

                if (settings.iCurrentPage === 1) {
                    $('.first', base).addClass('disabled');
                } else {
                    $('.first', base).removeClass('disabled');
                }

                if (settings.iCurrentPage === settings.iTotalPages || settings.iTotalPages === 0) {
                    $('.last', base).addClass('disabled');
                } else {
                    $('.last', base).removeClass('disabled');
                }
            } else {
                $('<li ><a href="#">Ajax Failed</a></li>').insertBefore($('.next,.last', base)[0]);
            }

        };

        return this.each(function() {

            if (Object.keys(cache.json).length === 0) {
                fnGetData();
            }

            $(base).addClass('pagination  pagination-right').append(
                    '<ul class="pagination">' +
                    '<li class="first"><a href="#">&laquo;</a></li>' +
                    '<li class="last"><a href="#">&raquo;</a></li>' +
                    '</ul>'
                    );
            var els = $('a', this);
            $(els[0]).bind('click', function(e) {
                e.preventDefault();
                fnDraw(1);
            });
            $(els[1]).bind('click', function(e) {
                e.preventDefault();
                fnDraw(settings.iTotalPages);
            });
            fnRenderPaging();
            fnSentData();
        });
    };
})(jQuery);