$(function () {
    let url = 'https://api.nytimes.com/svc/topstories/v2/home.json';
    url += '?' + $.param({
        'api-key': 'c525f45dacf9413ca3c4cb50cdeff81f'
    });

    $('.loading__img').show();

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url
    })
        .done(function (data) {
            $('.loading__img').hide();
            const articleInfo = data.results;
            //CREATE--FOR--OPTIONS
            const optionList = articleInfo.reduce((i, val) => (i.indexOf(val.section) !== -1) ? i : [...i, val.section], []);
            $.each(optionList, function (i) {
                $('.header__category').append('<option value=' + optionList[i].replace(' ', '') + '>' + optionList[i] + '</option>');
            });

            //CHANGE--EVENT
            $('[name="category"]').on('change', function () {

                let selectedOption = $(this).val();
                $('.article-section').empty();

                // GET--FIRST--TWELVE--ARTICLES
                let CategoryArticles = articleInfo.filter(function (article) {
                    let thisSection = article.section.replace(' ', '');
                    if (selectedOption === thisSection && article.multimedia.length !== 0) {
                        return article;
                    }
                });
                let twelveArticles = CategoryArticles.slice(0, 12);


                $.each(twelveArticles, function () {
                    let imageUrl = this.multimedia[4].url;
                    let newsAbstract = this.abstract;

                    //CREATE--ARTICLE--BOX
                    $('<div class="article_box">')
                        .css('background-image', 'url(' + imageUrl + ')')
                        .append('<p class="article__text">' + newsAbstract + '</p>')
                        .appendTo('.article-section');

                    // HEADER--MOVE--CSS
                    $('.header')
                        .css('height', '200px')
                        .css('transition', '1s');
                    $('.header__logo')
                        .css('width', '15vh');
                });

            });
        })
        .fail(function () {
            $('.article-section').append('Sorry there was an error.')
                                 .css('text-align', 'center');
        });
});

