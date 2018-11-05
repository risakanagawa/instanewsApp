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
            const articleInfo = data.results;
            console.log(articleInfo)
            //CREATE--FOR--OPTIONS
            const optionList = articleInfo.reduce((i, val) => (i.indexOf(val.section) !== -1) ? i : [...i, val.section], []);
            $.each(optionList, function (j) {
                $(".header__category").append('<option value=' + optionList[j].replace(" ", "") + '>' + optionList[j] + '</option>');
            });

            //CHANGE--EVENT
            $('[name="category"]').on("change", function () {

                let selectedOption = $(this).val();
                $(".box").empty();

                // GET--FIRST--TWELVE--ARTICLES
                let thisCategoryArticles = articleInfo.filter(function (article) {
                    var thisSection = article.section.replace(" ", "");
                    if (selectedOption == thisSection && article.multimedia.length !== 0) {
                        return article;
                    }
                });
                let twelveArticles = thisCategoryArticles.slice(0, 13);


                $.each(twelveArticles, function (key) {


                    var imageUrl = this.multimedia[4].url;
                    var newsAbstract = this.abstract;

                    //CREATE--ARTICLE--BOX
                    $('<div class="article_box">')
                        .css('background-image', 'url(' + imageUrl + ')')
                        .append('<p class="article__text">' + newsAbstract + '</p>')
                        .appendTo(".box");

                    // HEADER--MOVE--CSS
                    $(".header")
                        .css("height", "20vh")
                        .css("transition", "1s");
                    $(".header__logo").css("width", "15vh");


                });

            });
        })
        .fail(function () {
            $(".box").append("Sorry there was an error.");
        });
});