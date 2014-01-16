pagination
==========

simple twitter bootstrap jquery pagination plugin

Usage
---

Html
```
 <div id="display_list">TODO write content</div>
 <div id="pagination"></div>
```

Call JQuery plugin
```
$('#pagination').pagination({
    ajaxSource: 'ajax.php',
    callback: function(data) {
        var html = '';
        $.each(data, function(i, item) {
            if (i % 3 == 0) {
                if (i > 0) {
                    html += '</div>';
                }
                html += '<div class="row">';
            }
            html += '<div class="col-md-4">';
            html += '<h4>' + item.id + '. ' + item.name;
            html += '<blockquote>';
            html += '<p>' + item.desc + '</p>';
            html += '<small>' + item.url + '</small>';
            html += '</blockquote>';
            html += '</div>';
        });
        html += '</div>';
        $('#display_list').html(html);
    }
});
```

live demo
---

<a href="http://sandbox.ibnuyahya.com/pagination/example.html" target="_blank">http://sandbox.ibnuyahya.com/pagination/example.html</a>
