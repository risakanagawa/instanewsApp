$(function () {
    let url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
        'api-key': "c525f45dacf9413ca3c4cb50cdeff81f"
    });
    const apiKey = "c525f45dacf9413ca3c4cb50cdeff81f";

    $.ajax({
        type: "GET",
        dataType: "json",
        url: url
    })
        .done(function (data) {
            console.log(data);
            const results = data.results;
            //Header opisions
            const list = results.reduce((i, val) => (i.indexOf(val.section) !== -1) ? i : [...i, val.section], []);
            // console.log(list);
            $.each(list, function (j, key) {
                $(".header__category").append('<option value=' + list[j].replace(" ", "") + '>' + list[j] + '</option>');
                // console.log($.type(list[j]));
            });

            //change event
            $('[name="category"]').on("change", function () {
                let val = $(this).val();
                console.log(val);
                $(".box").empty();
                $.each(results, function (i, key) {
                    let noSpace = key.section.replace(" ", "");
                    if (val === noSpace) {
                        if (key.multimedia.length !== 0) {

                            //GET-ARTICLES
                            var imageUrl = this.multimedia[4].url;
                            console.log(imageUrl);
                            $('<div class="article_box">')
                                .css('background-image', 'url(' + imageUrl + ')')
                                .append('<p class="article__text">' + key.abstract + '</p>')
                                .appendTo(".box");

                            // HEADER-HIDE-CSS
                            var width = window.innerWidth;
                            var smartphoneTabletWidth = 600;
                            if (smartphoneTabletWidth <= width) {
                                $(".header")
                                    .css("height", "30vh")
                                    .css("transition", "1s");
                                $(".header__logo").css("width", "15vh");
                            } 
                        }
                    }
                });
            });
        })
        .fail(function () {
            $(".header").append("Sorry there was an error.");
        });

});